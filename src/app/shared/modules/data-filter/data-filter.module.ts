import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DragulaModule } from "ng2-dragula";
import { ClickOutsideDirective } from "./click-outside.directive";
import { DataFilterComponent } from "./data-filter.component";
import { AddUnderscorePipe } from "./pipes/add-underscore.pipe";
import { FilterByNamePipe } from "./pipes/filter-by-name.pipe";
import { OrderPipe } from "./pipes/order-by.pipe";
import { DataFilterService } from "./services/data-filter.service";

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, DragulaModule],
  declarations: [
    DataFilterComponent,
    ClickOutsideDirective,
    FilterByNamePipe,
    OrderPipe,
    AddUnderscorePipe,
  ],
  exports: [DataFilterComponent],
  providers: [DataFilterService],
})
export class DataFilterModule {}
