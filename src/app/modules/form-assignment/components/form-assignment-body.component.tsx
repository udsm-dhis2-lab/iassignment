// Copyright 2024 UDSM DHIS2 Lab. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import {
  CircularLoader,
  DataTableCell,
  DataTableRow,
  TableBody,
  TableCell,
} from "@dhis2/ui";
import { CollectionForm, OrgUnitAssignmentResponse } from "../models";
import * as React from "react";
import { FormAssigmentCell } from "./form-assignment-cell.component";
import { FormAssignmentService } from "../services";
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
} from "rxjs";
import { useDebounce } from "../../../shared";
import { isUndefined } from "lodash";

export function FormAssignmentBody(props: {
  forms: CollectionForm[];
  formHeaderSpan: number;
  formAssignmentService: FormAssignmentService;
  orgUnitSearchQuery?: string;
  selectedOrgUnits?: any[];
}) {
  const {
    forms,
    formHeaderSpan,
    formAssignmentService,
    orgUnitSearchQuery,
    selectedOrgUnits,
  } = props;
  const [data, setData] = React.useState<OrgUnitAssignmentResponse>(null);
  const [loadingAssignments, setLoadingAssignments] = React.useState(true);

  const searchValue = useDebounce(orgUnitSearchQuery);

  React.useEffect(() => {
    setLoadingAssignments(true);
    formAssignmentService.getAssignments(selectedOrgUnits).subscribe({
      next: (data) => {
        setData(data);
        setLoadingAssignments(false);
      },
      error: () => {},
    });
  }, [selectedOrgUnits]);

  React.useEffect(() => {
    if (!isUndefined(searchValue)) {
      setLoadingAssignments(true);
      formAssignmentService.searchAssignment(searchValue).subscribe({
        next: (data) => {
          setData(data);
          setLoadingAssignments(false);
        },
        error: () => {},
      });
    }
  }, [searchValue]);

  return (
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
                  formAssignmentService={formAssignmentService}
                />
              ))}
            </DataTableRow>
          );
        })
      ) : (
        <></>
      )}
    </TableBody>
  );
}
