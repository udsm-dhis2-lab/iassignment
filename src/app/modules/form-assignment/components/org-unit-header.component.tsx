// Copyright 2024 UDSM DHIS2 Lab. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
import {
  DataTableColumnHeader,
  Input,
  Button,
  IconDimensionData16,
  IconDimensionOrgUnit16,
} from "@dhis2/ui";
import * as React from "react";
export function OrgUnitHeader(props: {
  onOpenOrgUnitSelection: Function;
  onSearchOrgUnit: Function;
}) {
  const { onOpenOrgUnitSelection, onSearchOrgUnit } = props;
  const [showFilter, setShowFilter] = React.useState(false);
  return (
    <DataTableColumnHeader
      fixed
      showFilter={showFilter}
      top="0"
      left="0"
      width="290px"
      rowSpan="2"
      className="search-header-cell"
      filter={
        <div className="header-filter">
          <Input
            placeholder="Search organisation unit"
            dense
            onChange={(event) => {
              onSearchOrgUnit({ value: event.value });
            }}
          />
          <Button
            title="Click to open organisation unit selection"
            small
            onClick={() => {
              onOpenOrgUnitSelection();
            }}
          >
            <IconDimensionOrgUnit16 />
          </Button>
        </div>
      }
      onFilterIconClick={(event) => {
        setShowFilter(event.show);
      }}
    >
      Organisation unit
    </DataTableColumnHeader>
  );
}
