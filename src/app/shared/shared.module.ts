import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {sharedLoaders} from './loaders';
import {sharedComponents} from './components';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [...sharedComponents, ...sharedLoaders],
  exports: [...sharedComponents, ...sharedLoaders],
  providers: []
})
export class SharedModule {}
