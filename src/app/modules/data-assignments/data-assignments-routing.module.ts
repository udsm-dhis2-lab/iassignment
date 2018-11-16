import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MetaDataAssignComponent} from './pages/meta-data-assign/meta-data-assign.component';

const DATA_ASSIGNMENT_ROUTES = [
  {
    path: '',
    redirectTo: 'metadata',
    pathMatch: 'full'
  },
  {
    path: 'metadata',
    component: MetaDataAssignComponent
  }
];

const routes: Routes = [...DATA_ASSIGNMENT_ROUTES];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DataAssignmentsRoutingModule {}

