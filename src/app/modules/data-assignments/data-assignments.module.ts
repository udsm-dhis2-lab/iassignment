import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataAssignmentsRoutingModule} from './data-assignments-routing.module';
import {MetaDataAssignComponent} from './pages/meta-data-assign/meta-data-assign.component';

@NgModule({
  imports: [
    CommonModule,
    DataAssignmentsRoutingModule
  ],
  declarations: [MetaDataAssignComponent]
})
export class DataAssignmentsModule { }
