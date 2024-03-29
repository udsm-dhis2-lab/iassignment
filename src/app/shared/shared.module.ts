import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DragulaService } from "ng2-dragula";
import { NgPipesModule } from "ngx-pipes";
import { sharedComponents } from "./components";
import { sharedLoaders } from "./loaders";
import { services } from "./services";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgPipesModule,
    HttpClientModule,
  ],
  declarations: [...sharedComponents, ...sharedLoaders],
  exports: [...sharedComponents, ...sharedLoaders],
  providers: [DragulaService, ...services],
})
export class SharedModule {}
