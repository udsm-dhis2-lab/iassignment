import { SharedModule } from './shared.module';
import {DataFilterModule} from './modules/data-filter/data-filter.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {LayoutModule} from './modules/layout/layout.module';
import {OrgUnitFilterModule} from './modules/org-unit-filter/org-unit-filter.module';


export const sharedModules: any[] = [SharedModule, DataFilterModule, LayoutModule, OrgUnitFilterModule, NgxPaginationModule];
export * from './shared.module';


