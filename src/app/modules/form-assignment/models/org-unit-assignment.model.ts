// Copyright 2024 UDSM DHIS2 Lab. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
export class OrgUnitAssignment {
  id!: string;
  name!: string;
  level!: number;
  assignedForms!: string[];

  constructor(orgUnitDetails: Partial<OrgUnitAssignment>) {
    this.id = orgUnitDetails?.id;
    this.name = orgUnitDetails?.name;
    this.level = orgUnitDetails?.level;
    this.assignedForms = this.#getAssignedForms(
      orgUnitDetails as Record<string, Record<string, unknown>[]>
    );
  }

  isAssigned(form: string) {
    return this.assignedForms.includes(form);
  }

  #getAssignedForms(
    orgUnitDetails: Record<string, Record<string, unknown>[]>
  ): string[] {
    return (
      (orgUnitDetails["assignedForms"] as unknown as string[]) ||
      ([
        ...(orgUnitDetails["programs"] || []),
        ...(orgUnitDetails["dataSets"] || []),
      ].map((form) => form.id) as string[])
    );
  }
}
