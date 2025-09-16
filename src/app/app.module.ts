import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppShellModule } from "@iapps/ng-dhis2-shell";
import { ReactWrapperModule } from "@iapps/ng-dhis2-ui";
import { environment } from "../environments/environment";
import { AppWrapper } from "./app-wrapper";
import { AppComponentContent } from "./app.component";
import { RoutingModule } from "./app.routes";

@NgModule({
  declarations: [AppWrapper, AppComponentContent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactWrapperModule,
    FormsModule,
    RoutingModule,
    AppShellModule.forRoot({
      pwaEnabled: false,
      isDevMode: !environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppWrapper],
})
export class AppModule {}
