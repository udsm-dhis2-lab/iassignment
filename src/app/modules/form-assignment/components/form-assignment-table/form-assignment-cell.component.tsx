// Copyright 2024 UDSM DHIS2 Lab. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
import {
  DataTableCell,
  IconCheckmarkCircle16,
  IconSubtractCircle16,
  IconMore16,
} from "@dhis2/ui";

import * as React from "react";
import { CollectionForm, OrgUnitAssignment } from "../../models";
import { inject } from "@angular/core";
import { FormAssignmentService } from "../../services";

export function FormAssigmentCell(props: {
  orgUnitAssignment: OrgUnitAssignment;
  form: CollectionForm;
  formAssignmentService: FormAssignmentService;
}) {
  const { orgUnitAssignment, form } = props;
  const [isAssigned, setIsAssigned] = React.useState(
    orgUnitAssignment.isAssigned(form.id)
  );
  const [saving, setSaving] = React.useState(false);
  return (
    <DataTableCell
      backgroundColor={saving ? "yellow" : isAssigned ? "lightgreen" : "#eff"}
      onClick={() => {
        setSaving(true);
      }}
      bordered
    >
      {saving ? (
        <IconMore16 />
      ) : isAssigned ? (
        <IconCheckmarkCircle16 />
      ) : (
        <IconSubtractCircle16 />
      )}
    </DataTableCell>
  );
}
