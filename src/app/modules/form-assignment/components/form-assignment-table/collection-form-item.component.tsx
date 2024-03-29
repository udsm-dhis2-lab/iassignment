// Copyright 2024 UDSM DHIS2 Lab. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import {
  DataTableCell,
  IconDimensionDataSet16,
  IconDimensionEventDataItem16,
} from "@dhis2/ui";
import * as React from "react";
import { CollectionForm } from "../../models";

export function CollectionFormItem(props: { form: CollectionForm }) {
  const { form } = props;
  return (
    <DataTableCell fixed top="0" bordered className="form-header-cell">
      <div className="form-label-container">
        <div className="form-label-icon">
          {form.type === "PROGRAM" ? (
            <IconDimensionEventDataItem16 />
          ) : (
            <IconDimensionDataSet16 />
          )}
        </div>
        <span className="form-label">{form.name}</span>
      </div>
    </DataTableCell>
  );
}
