import {
  Component,
  Input,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from "@angular/core";
import {
  Table,
  DataTable,
  TableHead,
  TableCellHead,
  DataTableRow,
  TableRowHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
  DataTableColumnHeader,
  DataTableCell,
  CssVariables,
  colors,
  spacers,
  IconDimensionDataSet16,
  IconDimensionEventDataItem16,
  Input as FormInput,
  Box,
  CircularLoader,
  IconCheckmarkCircle16,
  IconSubtractCircle16,
} from "@dhis2/ui";
import * as React from "react";
import { Observable, firstValueFrom } from "rxjs";
import { toObservable } from "@angular/core/rxjs-interop";
import { CollectionForm, OrgUnitAssignmentResponse } from "../../models";
import { FormAssignmentService } from "../../services";
import { FormAssigmentCell } from "./form-assignment-cell.component";

@Component({
  selector: "app-form-assignment-table",
  templateUrl: "./form-assignment-table.component.html",
  styleUrls: ["./form-assignment-table.component.css"],
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
      const [data, setData] = React.useState<OrgUnitAssignmentResponse>(null);
      const [loadingAssignments, setLoadingAssignments] = React.useState(false);

      React.useEffect(() => {
        if (loadingForms) {
          this.formAssignmentService.getForms().subscribe({
            next: (forms) => {
              setForms(forms);
              setLoadingForms(false);
              setFormHeaderSpan(forms.length || 1);
            },
            error: () => {},
          });
        }
      }, [loadingForms]);

      React.useEffect(() => {
        if (forms) {
          setLoadingAssignments(true);
          this.formAssignmentService.getAssignments().subscribe({
            next: (data) => {
              setData(data);
              setLoadingAssignments(false);
            },
            error: () => {},
          });
        }
      }, [forms]);

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
                <DataTableColumnHeader
                  fixed
                  showFilter={false}
                  top="0"
                  left="0"
                  colSpan={formHeaderSpan.toString()}
                  filter={<></>}
                  onFilterIconClick={() => {}}
                >
                  Collection forms
                </DataTableColumnHeader>
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
                    <DataTableCell
                      key={form.id}
                      fixed
                      top="0"
                      bordered
                      className="form-header-cell"
                    >
                      <div className="form-label-container">
                        <div className="form-label-icon">
                          {form.type === "PROGRAM" ? (
                            <IconDimensionEventDataItem16 />
                          ) : (
                            <IconDimensionDataSet16 />
                          )}
                        </div>
                        <span className="form-label">{form.name}</span>
                      </div>
                    </DataTableCell>
                  ))
                ) : (
                  <></>
                )}
              </DataTableRow>
            </TableHead>
            <TableBody>
              {loadingAssignments ? (
                <DataTableRow>
                  <TableCell colSpan={(formHeaderSpan + 1).toString()}>
                    <CircularLoader small />
                  </TableCell>
                </DataTableRow>
              ) : (
                <></>
              )}

              {!loadingAssignments && data?.orgUnitAssignments ? (
                data.orgUnitAssignments.map((orgUnitAssignment) => {
                  return (
                    <DataTableRow key={orgUnitAssignment.id}>
                      <DataTableCell fixed left="0">
                        {orgUnitAssignment.name}
                      </DataTableCell>

                      {forms.map((form) => (
                        <FormAssigmentCell
                          key={`${orgUnitAssignment.id}.${form.id}`}
                          orgUnitAssignment={orgUnitAssignment}
                          form={form}
                          formAssignmentService={this.formAssignmentService}
                        />
                      ))}
                    </DataTableRow>
                  );
                })
              ) : (
                <></>
              )}
            </TableBody>
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
