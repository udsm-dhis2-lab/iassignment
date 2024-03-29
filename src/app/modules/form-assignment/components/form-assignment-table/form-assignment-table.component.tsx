import {
  Component,
  Input,
  OnInit,
  WritableSignal,
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
} from "@dhis2/ui";
import * as React from "react";
import { Observable } from "rxjs";
import { toObservable } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-form-assignment-table",
  templateUrl: "./form-assignment-table.component.html",
  styleUrls: ["./form-assignment-table.component.css"],
})
export class FormAssignmentTableComponent implements OnInit {
  @Input() forms: any;

  #showOrgUnit: WritableSignal<boolean> = signal(false);
  // TODO: A hack to force change detection
  showOrgUnit$: Observable<boolean> = toObservable(this.#showOrgUnit);
  FormAssignmentTable: any;

  ngOnInit(): void {
    console.log(this.forms);
    this.FormAssignmentTable = () => {
      const [data, setData] = React.useState(null);
      React.useEffect(() => {
        // this.formAssignmentService.getList().subscribe({
        //   next: (data) => {
        //     setData(data);
        //   },
        //   error: () => {},
        // });
      }, []);
      return (
        <>
          {this.forms ? (
            <Box width="calc(100vw - 240px)">
              <DataTable scrollHeight="400px" scrollWidth="calc(100vw - 240px)">
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
                      colSpan={this.forms.length}
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

                    {this.forms.map((form) => (
                      <DataTableCell
                        key={form.id}
                        fixed
                        top="0"
                        bordered
                        className="form-header-cell"
                      >
                        <div className="form-label-container">
                          <div className="form-label-icon">
                            <IconDimensionDataSet16 />
                          </div>
                          <span className="form-label">{form.name}</span>
                        </div>
                      </DataTableCell>
                    ))}
                  </DataTableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Onyekachukwu</TableCell>
                    <TableCell>Kariuki</TableCell>
                    <TableCell>02/06/2007</TableCell>
                    <TableCell>05/25/1972</TableCell>
                    <TableCell>66</TableCell>
                    <TableCell>Jawi</TableCell>
                    <TableCell>Sofie Hubert</TableCell>
                    <TableCell>Incomplete</TableCell>
                  </TableRow>
                </TableBody>
              </DataTable>
            </Box>
          ) : (
            <></>
          )}
        </>
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
