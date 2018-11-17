import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {sharedLoaders} from './loaders';
import {sharedComponents} from './components';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {DragulaService} from 'ng2-dragula';
import {services} from './services';
import {NgPipesModule} from 'ngx-pipes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    NgPipesModule
  ],
  declarations: [...sharedComponents, ...sharedLoaders],
  exports: [...sharedComponents, ...sharedLoaders],
  providers: [DragulaService, ...services]
})
export class SharedModule {}
