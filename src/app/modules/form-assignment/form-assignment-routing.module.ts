import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormAssignmentComponent } from "./form-assignment.component";

const routes: Routes = [
  {
    path: "",
    component: FormAssignmentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormAssignmentRoutingModule {}
