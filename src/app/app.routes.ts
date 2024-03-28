import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {DataAssignmentsModule} from './modules/data-assignments/data-assignments.module';
import {NgModule} from '@angular/core';
import {HomeComponent} from './shared/components/home/home.component';
import {DataAssignmentsRoutingModule} from './modules/data-assignments/data-assignments-routing.module';
import {MetaDataAssignComponent} from './modules/data-assignments/pages/meta-data-assign/meta-data-assign.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'data',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'data',
    loadChildren: () => import('./modules/data-assignments/data-assignments.module').then(m => m.DataAssignmentsModule)
  }
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
