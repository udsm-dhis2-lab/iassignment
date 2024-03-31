// Copyright 2024 UDSM DHIS2 Lab. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

import * as React from "react";
import {
  Box,
  CircularLoader,
  DataTable,
  DataTableCell,
  DataTableColumnHeader,
  DataTableRow,
  Input as FormInput,
  TableHead,
} from "@dhis2/ui";
import { CollectionForm } from "../models";
import { CollectionFormItem } from "./collection-form-item.component";

export const CollectionFormRow = (props: {
  loading: boolean;
  formHeaderSpan: number;
  forms: CollectionForm[];
}) => {
  const { loading, formHeaderSpan, forms } = props;
  return (
    <DataTableRow>
      {loading ? (
        <DataTableCell
          fixed
          top="0"
          bordered
          colSpan={formHeaderSpan.toString()}
        >
          <CircularLoader small />
        </DataTableCell>
      ) : (
        <></>
      )}

      {!loading && forms ? (
        forms.map((form) => <CollectionFormItem key={form.id} form={form} />)
      ) : (
        <></>
      )}
    </DataTableRow>
  );
};
