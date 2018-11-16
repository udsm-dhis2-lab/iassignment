import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {sharedLoaders} from './loaders';
import {sharedComponents} from './components';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule
  ],
  declarations: [...sharedComponents, ...sharedLoaders],
  exports: [...sharedComponents, ...sharedLoaders],
  providers: []
})
export class SharedModule {}
