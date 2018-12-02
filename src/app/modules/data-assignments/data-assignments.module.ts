import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataAssignmentsRoutingModule} from './data-assignments-routing.module';
import {MetaDataAssignComponent} from './pages/meta-data-assign/meta-data-assign.component';
import {sharedModules} from '../../shared';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DataAssignmentsRoutingModule,
    ...sharedModules,
  ],
  declarations: [MetaDataAssignComponent]
})
export class DataAssignmentsModule { }
