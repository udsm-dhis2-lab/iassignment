// Copyright 2024 UDSM DHIS2 Lab. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
import {
  DataTableCell,
  IconCheckmarkCircle16,
  IconSubtractCircle16,
  IconMore16,
  IconError16,
} from "@dhis2/ui";

import * as React from "react";
import {
  CollectionForm,
  OrgUnitAssignment,
  OrgUnitAssignmentRequest,
} from "../models";
import { inject } from "@angular/core";
import { FormAssignmentService } from "../services";

export function FormAssigmentCell(props: {
  orgUnitAssignment: OrgUnitAssignment;
  form: CollectionForm;
  formAssignmentService: FormAssignmentService;
}) {
  const { orgUnitAssignment, form, formAssignmentService } = props;
  const [isAssigned, setIsAssigned] = React.useState(
    orgUnitAssignment.isAssigned(form.id)
  );
  const [saving, setSaving] = React.useState(false);
  const [savingError, setSavingError] = React.useState(null);

  React.useEffect(() => {
    if (saving) {
      let initialized = true;

      setSavingError(null);
      const assignmentRequests = OrgUnitAssignmentRequest.toAPI([
        new OrgUnitAssignmentRequest({
          orgUnit: orgUnitAssignment.id,
          form: form.id,
          type: form.type,
          action: isAssigned ? "UN_ASSIGN" : "ASSIGN",
        }),
      ]);

      const request = formAssignmentService
        .saveAssignments(assignmentRequests)
        .subscribe({
          next: (response) => {
            const assignmentResponse = response[0];
            setIsAssigned(
              assignmentResponse.isSavedSuccessful ? !isAssigned : isAssigned
            );
            setSaving(false);
          },
          error: (error) => {
            setSaving(false);
            setSavingError(error);
          },
        });

      return () => {
        request.unsubscribe();
        initialized = false;
      };
    }
  }, [saving]);

  return (
    <DataTableCell
      backgroundColor={
        savingError
          ? "red"
          : saving
          ? "yellow"
          : isAssigned
          ? "lightgreen"
          : "#eff"
      }
      onClick={() => {
        setSaving(true);
      }}
      bordered
    >
      {savingError ? (
        <IconError16 />
      ) : saving ? (
        <IconMore16 />
      ) : isAssigned ? (
        <IconCheckmarkCircle16 />
      ) : (
        <IconSubtractCircle16 />
      )}
    </DataTableCell>
  );
}
