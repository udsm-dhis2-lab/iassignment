import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import {
  Box,
  CircularLoader,
  DataTable,
  DataTableCell,
  DataTableColumnHeader,
  DataTableRow,
  Input as FormInput,
  TableHead,
} from "@dhis2/ui";
import * as React from "react";
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from "rxjs";
import { CollectionForm } from "../../models";
import { CollectionFormService, FormAssignmentService } from "../../services";
import { CollectionFormItem } from "./collection-form-item.component";
import { FormAssignmentBody } from "./form-assignment-body.component";
import { CollectionFormHeader } from "./collection-form-header.component";
import { OrgUnitHeader } from "./org-unit-header.component";
import { useDebounce } from "../../../../shared";

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

      const searchTerm$ = new Subject();
      let searchRequest$: any;

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
        searchRequest$ = searchTerm$
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

      return (
        <Box width="calc(100vw - 240px)">
          <DataTable
            scrollHeight="calc(100vh - 150px)"
            scrollWidth="calc(100vw - 240px)"
          >
            <TableHead>
              <DataTableRow>
                <OrgUnitHeader
                  onOpenOrgUnitSelection={() => {
                    this.#showOrgUnit.set(true);
                  }}
                  onSearchOrgUnit={(event) => {
                    setOrgUnitSearchQuery(event.value);
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
              <DataTableRow>
                {loadingForms ? (
                  <DataTableCell
                    fixed
                    top="0"
                    bordered
                    colSpan={formHeaderSpan.toString()}
                  >
                    <CircularLoader small />
                  </DataTableCell>
                ) : (
                  <></>
                )}

                {!loadingForms && forms ? (
                  forms.map((form) => (
                    <CollectionFormItem key={form.id} form={form} />
                  ))
                ) : (
                  <></>
                )}
              </DataTableRow>
            </TableHead>

            {!loadingForms && forms ? (
              <FormAssignmentBody
                forms={forms}
                formHeaderSpan={formHeaderSpan}
                formAssignmentService={this.formAssignmentService}
                orgUnitSearchQuery={orgUnitSearchQuery}
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
    console.log(selectedOrgUnits);
    this.#showOrgUnit.set(false);
  }
}
