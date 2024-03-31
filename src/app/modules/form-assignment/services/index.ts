// Copyright 2024 UDSM DHIS2 Lab. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import { CollectionFormService } from "./collection-form.service";
import { FormAssignmentService } from "./form-assignment.service";

export const formAssignmentServices: any[] = [
  FormAssignmentService,
  CollectionFormService,
];

export { FormAssignmentService, CollectionFormService };
