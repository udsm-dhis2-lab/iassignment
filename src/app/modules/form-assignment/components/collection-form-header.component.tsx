// Copyright 2024 UDSM DHIS2 Lab. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
import { DataTableColumnHeader, Input } from "@dhis2/ui";
import * as React from "react";

export function CollectionFormHeader(props: {
  formHeaderSpan: number;
  onSearchForm;
}) {
  const { formHeaderSpan, onSearchForm } = props;
  const [showFilter, setShowFilter] = React.useState(false);
  return (
    <DataTableColumnHeader
      fixed
      showFilter={showFilter}
      top="0"
      colSpan={formHeaderSpan.toString()}
      filter={
        <div className="header-filter collection-form-header-filter">
          <Input
            placeholder="Search forms by name"
            dense
            onChange={(event) => {
              onSearchForm({ value: event.value });
            }}
          />
          {/* <Button small>
            <IconDimensionData16 />
          </Button> */}
        </div>
      }
      onFilterIconClick={(event) => {
        setShowFilter(event.show);
      }}
    >
      Collection forms
    </DataTableColumnHeader>
  );
}
