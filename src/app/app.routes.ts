import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./shared/components/home/home.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "form",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "form",
    loadChildren: () =>
      import("./modules/form-assignment/form-assignment.module").then(
        (m) => m.FormAssignmentModule
      ),
  },
  {
    path: "user",
    loadChildren: () =>
      import("./modules/user-assignment/user-assignment.module").then(
        (m) => m.UserAssignmentModule
      ),
  },
  {
    path: "data",
    loadChildren: () =>
      import("./modules/data-assignments/data-assignments.module").then(
        (m) => m.DataAssignmentsModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class RoutingModule {}
