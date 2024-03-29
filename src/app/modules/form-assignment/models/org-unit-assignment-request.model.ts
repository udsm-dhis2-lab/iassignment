// Copyright 2024 UDSM DHIS2 Lab. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import { CollectionFormType } from "./collection-form-type.model";

export interface AssignmentRequestObject {
  api: string;
  payload: {
    additions: Record<string, string>[];
    deletions: Record<string, string>;
  };
}

export class OrgUnitAssignmentRequest {
  orgUnit: string;
  form: string;
  type: CollectionFormType;
  action: "ASSIGN" | "UN_ASSIGN";
  constructor(request: Partial<OrgUnitAssignmentRequest>) {
    this.orgUnit = request.orgUnit;
    this.form = request.form;
    this.type = request.type;
    this.action = request.action;
  }

  static toAPI(): AssignmentRequestObject[] {
    return;
  }
}
