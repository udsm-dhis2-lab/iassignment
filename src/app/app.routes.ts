import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {DataAssignmentsModule} from './modules/data-assignments/data-assignments.module';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: AppComponent
  },
  // {
  //   path: 'data-assignments',
  //   loadChildren: './modules/data-assignments/data-assignments.module#DataAssignmentsModule'
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class RoutingModule {}
