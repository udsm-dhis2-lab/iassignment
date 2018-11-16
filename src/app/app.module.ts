import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import {metaReducers, reducers} from './store/reducers';
import { effects } from './store/effects';
import {FormsModule} from '@angular/forms';
import * as fromSharedComponents from './shared/components';
import * as fromSharedLoaders from './shared/loaders';
import {RoutingModule} from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    fromSharedComponents.sharedComponents,
    fromSharedLoaders.sharedLoaders
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(effects)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
