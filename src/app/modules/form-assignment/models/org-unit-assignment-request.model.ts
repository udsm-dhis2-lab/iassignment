// Copyright 2024 UDSM DHIS2 Lab. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import { CollectionFormType } from "./collection-form-type.model";
import { groupBy } from "lodash";

export interface AssignmentRequestObject {
  url: string;
  payload: {
    additions: Record<string, string>[];
    deletions: Record<string, string>[];
  };
}

export type AssignmentAction = "ASSIGN" | "UN_ASSIGN";

export class OrgUnitAssignmentRequest {
  orgUnit: string;
  form: string;
  type: CollectionFormType;
  action: AssignmentAction;
  constructor(request: Partial<OrgUnitAssignmentRequest>) {
    this.orgUnit = request.orgUnit;
    this.form = request.form;
    this.type = request.type;
    this.action = request.action;
  }

  static toAPI(
    assignmentRequests: OrgUnitAssignmentRequest[]
  ): AssignmentRequestObject[] {
    const requestByForm = groupBy(assignmentRequests, "form");

    return Object.keys(requestByForm)
      .map((form) => {
        const formRequestByAction = groupBy(requestByForm[form], "action");

        const formType = assignmentRequests.find(
          (assignmentRequest) => assignmentRequest.form === form
        )?.type;

        if (!formType) {
          return null;
        }

        return {
          url: OrgUnitAssignmentRequest.getUrl(formType, form),
          payload: OrgUnitAssignmentRequest.getPayload(formRequestByAction),
        };
      })
      .filter((request) => request);
  }

  static getPayload(assignmentRequestByAction: {
    [action: string]: OrgUnitAssignmentRequest[];
  }) {
    return {
      additions: (assignmentRequestByAction["ASSIGN"] || []).map((request) => {
        return { id: request.orgUnit };
      }),
      deletions: (assignmentRequestByAction["UN_ASSIGN"] || []).map(
        (request) => {
          return { id: request.orgUnit };
        }
      ),
    };
  }

  static getUrl(type: CollectionFormType, form: string) {
    switch (type) {
      case "DATASET":
        return `dataSets/${form}/organisationUnits`;
      case "PROGRAM":
        return `programs/${form}/organisationUnits`;
      default:
        return "";
    }
  }
}
