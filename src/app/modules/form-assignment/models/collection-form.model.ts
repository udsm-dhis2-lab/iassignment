// Copyright 2024 UDSM DHIS2 Lab. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import { CollectionFormType } from "./collection-form-type.model";

export class CollectionForm {
  id: string;
  name: string;
  type: CollectionFormType;
  organisationUnits: string[];

  constructor(formDetails: Partial<CollectionForm>) {
    this.id = formDetails?.id;
    this.name = formDetails?.name;
    this.type = formDetails?.type;
    this.#checkRequiredAttribute();
  }

  #checkRequiredAttribute() {
    if (!this.id) {
      throw new Error("id is not supplied");
    }

    if (!this.name) {
      throw new Error("name is not supplied");
    }

    if (!this.type) {
      throw new Error("type is not supplied");
    }
  }
}
