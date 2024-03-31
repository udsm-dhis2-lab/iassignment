// Copyright 2024 UDSM DHIS2 Lab. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
import {
  DataTableColumnHeader,
  Input,
  Button,
  IconDimensionData16,
  IconDimensionOrgUnit16,
  NoticeBox,
  IconCross16,
} from "@dhis2/ui";
import * as React from "react";
import { groupBy } from "lodash";
export function OrgUnitHeader(props: {
  onOpenOrgUnitSelection: Function;
  onSearchOrgUnit: Function;
  onClearSelections: Function;
  selectedOrgUnits?: any[];
}) {
  const {
    onOpenOrgUnitSelection,
    onSearchOrgUnit,
    onClearSelections,
    selectedOrgUnits,
  } = props;
  const [showFilter, setShowFilter] = React.useState(false);

  const selectionSummary = React.useMemo(() => {
    if (!selectedOrgUnits || selectedOrgUnits.length === 0) {
      return undefined;
    }

    const groupedSelections = groupBy(selectedOrgUnits, "type");

    const selectedItems = Object.keys(groupedSelections)
      .map((selectionType) => {
        const selected = groupedSelections[selectionType];
        const selectedCount = selected?.length;

        if (!selectedCount) {
          return null;
        }

        switch (selectionType) {
          case "ORGUNIT":
            return `${selectedCount} org unit${selectedCount > 1 ? "s" : ""}`;
          case "ORGUNIT_LEVEL":
            return `${selectedCount} level${selectedCount > 1 ? "s" : ""}`;
          case "ORGUNIT_GROUP":
            return `${selectedCount} group${selectedCount > 1 ? "s" : ""}`;

          default:
            return null;
        }
      })
      .filter((summary) => summary);

    return selectedItems.length > 0
      ? `Selected: ${selectedItems.join(", ")}`
      : undefined;
  }, [selectedOrgUnits]);

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
        <div>
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
          {selectionSummary ? (
            <div className="selection-notice">
              <div className="selection-notice-label">{selectionSummary}</div>
              <div
                className="selection-notice-button"
                title="Clear selections"
                onClick={() => {
                  onClearSelections();
                }}
              >
                <IconCross16 />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      }
      onFilterIconClick={(event) => {
        setShowFilter(event.show);
      }}
    >
      Organisation unit
      <span
        className={selectionSummary ? "selected-icon" : ""}
        title="Selections have been applied"
      ></span>
    </DataTableColumnHeader>
  );
}
