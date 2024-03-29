import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ClickOutsideDirective } from "./directives/click-outside.directive";
import { MultiselectComponent } from "./multiselect/multiselect.component";
import { OrgUnitFilterComponent } from "./org-unit-filter.component";
import { OrgUnitService } from "./org-unit.service";
import { FilterLevelPipe } from "./pipes/filter-level.pipe";

@NgModule({
  imports: [CommonModule],
  declarations: [
    OrgUnitFilterComponent,
    MultiselectComponent,
    ClickOutsideDirective,
    FilterLevelPipe,
  ],
  exports: [OrgUnitFilterComponent],
  providers: [OrgUnitService],
})
export class OrgUnitFilterModule {}
