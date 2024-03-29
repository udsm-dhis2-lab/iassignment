import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponentContent } from "./app.component";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { metaReducers, reducers } from "./store/reducers";
import { effects } from "./store/effects";
import { FormsModule } from "@angular/forms";
import { RoutingModule } from "./app.routes";
import { sharedModules } from "./shared";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppShellModule } from "@iapps/ng-dhis2-shell";
import { NgxDhis2HttpClientModule } from "@iapps/ngx-dhis2-http-client";
import { AppWrapper } from "./app-wrapper";
import { ReactWrapperModule } from "@iapps/ng-dhis2-ui";

@NgModule({
  declarations: [AppWrapper, AppComponentContent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactWrapperModule,
    NgxDhis2HttpClientModule.forRoot({
      namespace: "iassignment",
      version: 1,
      models: [],
    }),
    FormsModule,
    RoutingModule,
    ...sharedModules,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production
      ? StoreDevtoolsModule.instrument({ connectInZone: true })
      : [],
    EffectsModule.forRoot(effects),
    AppShellModule.forRoot({
      pwaEnabled: false,
      isDevMode: !environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppWrapper],
})
export class AppModule {}
