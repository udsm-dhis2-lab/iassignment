// Copyright 2024 UDSM DHIS2 Lab. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import { OrgUnitAssignment } from "./org-unit-assignment.model";
import { Pager } from "../../../shared";

export class OrgUnitAssignmentResponse {
  pager?: Pager;
  orgUnitAssignments: OrgUnitAssignment[];

  constructor(response: Record<string, unknown>) {
    this.orgUnitAssignments = (
      (response["organisationUnits"] as Partial<OrgUnitAssignment>[]) || []
    ).map((orgUnit) => new OrgUnitAssignment(orgUnit));
    this.pager = response["pager"] ? new Pager(response["pager"]) : undefined;
  }
}
