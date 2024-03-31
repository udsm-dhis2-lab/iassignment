import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { Box, DataTable, DataTableRow, TableHead } from "@dhis2/ui";
import * as React from "react";
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  take,
} from "rxjs";
import { CollectionForm } from "../models";
import { CollectionFormService, FormAssignmentService } from "../services";
import { CollectionFormHeader } from "./collection-form-header.component";
import { CollectionFormRow } from "./collection-form-row.component";
import { FormAssignmentBody } from "./form-assignment-body.component";
import { OrgUnitHeader } from "./org-unit-header.component";

@Component({
  selector: "app-form-assignment-table",
  templateUrl: "./form-assignment-table.component.html",
  styleUrls: ["./form-assignment-table.component.scss"],
})
export class FormAssignmentTableComponent implements OnInit {
  formAssignmentService = inject(FormAssignmentService);
  collectionFormService = inject(CollectionFormService);

  #showOrgUnit: WritableSignal<boolean> = signal(false);
  // TODO: A hack to force change detection
  showOrgUnit$: Observable<boolean> = toObservable(this.#showOrgUnit);

  #orgUnitSelections: WritableSignal<any> = signal(null);
  orgUnitSelections$: Observable<any> = toObservable(this.#orgUnitSelections);
  FormAssignmentTable: any;

  async ngOnInit() {
    this.setAssignmentTable();
  }

  async setAssignmentTable() {
    this.FormAssignmentTable = () => {
      const [forms, setForms] = React.useState<CollectionForm[]>(null);
      const [formHeaderSpan, setFormHeaderSpan] = React.useState<number>(1);
      const [loadingForms, setLoadingForms] = React.useState<boolean>(true);
      const [initiateLoading, setInitiateLoading] =
        React.useState<boolean>(true);
      const [formSearchQuery, setFormSearchQuery] =
        React.useState<string>(undefined);
      const [orgUnitSearchQuery, setOrgUnitSearchQuery] =
        React.useState<string>(undefined);
      const [selectedOrgUnits, setSelectedOrgUnits] = React.useState(undefined);

      const searchTerm$ = new Subject();
      const orgUnitSelections$ = this.orgUnitSelections$;

      React.useEffect(() => {
        if (initiateLoading) {
          setInitiateLoading(false);
          this.collectionFormService.getForms().subscribe({
            next: (forms) => {
              setForms(forms);
              setLoadingForms(false);
              setFormHeaderSpan(forms.length || 1);
            },
            error: () => {},
          });
        }
      }, [initiateLoading]);

      React.useEffect(() => {
        setLoadingForms(true);
        searchTerm$
          .pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((query: string) =>
              this.collectionFormService.searchForms(query)
            )
          )
          .subscribe({
            next: (forms) => {
              setForms(forms);
              setLoadingForms(false);
              setFormHeaderSpan(forms.length || 1);
            },
            error: () => {},
          });
      }, [formSearchQuery]);

      React.useEffect(() => {
        orgUnitSelections$
          .pipe(filter((orgUnitSelections) => orgUnitSelections))
          .subscribe((selections) => {
            setSelectedOrgUnits(selections);
          });
      }, []);

      return (
        <Box width="calc(100vw - 240px)">
          <DataTable
            scrollHeight="calc(100vh - 150px)"
            scrollWidth="calc(100vw - 240px)"
          >
            <TableHead>
              <DataTableRow>
                <OrgUnitHeader
                  selectedOrgUnits={selectedOrgUnits}
                  onOpenOrgUnitSelection={() => {
                    this.#showOrgUnit.set(true);
                  }}
                  onSearchOrgUnit={(event) => {
                    setOrgUnitSearchQuery(event.value);
                  }}
                  onClearSelections={() => {
                    setSelectedOrgUnits(null);
                    this.#orgUnitSelections.set(undefined);
                  }}
                />

                <CollectionFormHeader
                  formHeaderSpan={formHeaderSpan}
                  onSearchForm={(event) => {
                    setFormSearchQuery(event.value);
                    searchTerm$.next(event.value);
                  }}
                />
              </DataTableRow>
              <CollectionFormRow
                loading={loadingForms}
                formHeaderSpan={formHeaderSpan}
                forms={forms}
              />
            </TableHead>

            {!loadingForms && forms ? (
              <FormAssignmentBody
                forms={forms}
                formHeaderSpan={formHeaderSpan}
                formAssignmentService={this.formAssignmentService}
                orgUnitSearchQuery={orgUnitSearchQuery}
                selectedOrgUnits={selectedOrgUnits}
              />
            ) : (
              <></>
            )}
          </DataTable>
        </Box>
      );
    };
  }

  onCloseOrgUnit() {
    this.#showOrgUnit.set(false);
  }

  onSelectOrgUnit(selectedOrgUnits) {
    this.#showOrgUnit.set(false);
    this.#orgUnitSelections.set(selectedOrgUnits);
  }
}
