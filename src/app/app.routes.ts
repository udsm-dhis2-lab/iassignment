import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "form-assignment",
    pathMatch: "full",
  },

  {
    path: "form-assignment",
    loadChildren: () =>
      import("./modules/form-assignment/form-assignment.module").then(
        (m) => m.FormAssignmentModule
      ),
  },
  {
    path: "user-assignment",
    loadChildren: () =>
      import("./modules/user-assignment/user-assignment.module").then(
        (m) => m.UserAssignmentModule
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
