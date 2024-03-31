import { Component, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Menu, MenuItem } from "@dhis2/ui";
import * as React from "react";

@Component({
  selector: "app-root-content",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponentContent {
  activeRoute = inject(ActivatedRoute);
  router = inject(Router);

  SideMenu = () => {
    const [activeMenu, setActiveMenu] = React.useState(
      this.activeRoute.snapshot?.firstChild?.routeConfig?.path
    );
    return (
      <Menu>
        <MenuItem
          active={activeMenu === "form"}
          className="side-bar-item"
          label="Form Assignment"
          value="form-assignment"
          onClick={(event) => {
            setActiveMenu(event.value);
            this.router.navigate([`/${event.value}`]);
          }}
        />
        {/* <MenuItem
          active={activeMenu === "user"}
          className="side-bar-item"
          label="User Assignment"
          value="user-assignment"
          onClick={(event) => {
            setActiveMenu(event.value);
            this.router.navigate([`/${event.value}`]);
          }}
        /> */}
      </Menu>
    );
  };
}
