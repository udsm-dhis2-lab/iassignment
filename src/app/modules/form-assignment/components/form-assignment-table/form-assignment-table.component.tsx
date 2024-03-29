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
import { FormAssignmentService } from "../../services";
import { CollectionFormItem } from "./collection-form-item.component";
import { FormAssignmentBody } from "./form-assignment-body.component";
import { CollectionFormHeader } from "./collection-form-header.component";

@Component({
  selector: "app-form-assignment-table",
  templateUrl: "./form-assignment-table.component.html",
  styleUrls: ["./form-assignment-table.component.scss"],
})
export class FormAssignmentTableComponent implements OnInit {
  formAssignmentService = inject(FormAssignmentService);

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
      const [searchTerm, setSearchTerm] = React.useState<string>(undefined);
      const searchTerm$ = new Subject();
      let searchRequest$: any;

      React.useEffect(() => {
        if (initiateLoading) {
          setInitiateLoading(false);
          this.formAssignmentService.getForms().subscribe({
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
              this.formAssignmentService.searchForms(query)
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
      }, [searchTerm]);

      return (
        <Box width="calc(100vw - 240px)">
          <DataTable
            scrollHeight="calc(100vh - 150px)"
            scrollWidth="calc(100vw - 240px)"
          >
            <TableHead>
              <DataTableRow>
                <DataTableColumnHeader
                  fixed
                  showFilter={false}
                  top="0"
                  left="0"
                  width="250px"
                  filter={<></>}
                  onFilterIconClick={() => {
                    this.#showOrgUnit.set(true);
                  }}
                >
                  Organisation unit
                </DataTableColumnHeader>
                <CollectionFormHeader
                  formHeaderSpan={formHeaderSpan}
                  onSearchForm={(event) => {
                    setSearchTerm(event.value);
                    searchTerm$.next(event.value);
                  }}
                />
              </DataTableRow>
              <DataTableRow>
                <DataTableCell
                  fixed
                  top="0"
                  left="0"
                  bordered
                  className="search-header-cell"
                >
                  <FormInput placeholder="Filter organisation unit in list" />
                </DataTableCell>

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
