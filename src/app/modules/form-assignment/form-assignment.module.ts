import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormAssignmentRoutingModule } from "./form-assignment-routing.module";
import {
  ReactWrapperModule,
  OrganisationUnitSelectorModule,
} from "@iapps/ng-dhis2-ui";
import { FormAssignmentComponent } from "./form-assignment.component";
import { formAssignmentServices } from "./services";
import { formAssignmentComponents } from "./components";

@NgModule({
  declarations: [FormAssignmentComponent, ...formAssignmentComponents],
  imports: [
    CommonModule,
    ReactWrapperModule,
    FormAssignmentRoutingModule,
    OrganisationUnitSelectorModule,
  ],
  providers: [formAssignmentServices],
})
export class FormAssignmentModule {}
