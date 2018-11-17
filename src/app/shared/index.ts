import { SharedModule } from './shared.module';
import {DataFilterModule} from './modules/data-filter/data-filter.module';
import {NgxPaginationModule} from 'ngx-pagination';


export const sharedModules: any[] = [SharedModule, DataFilterModule, NgxPaginationModule];
export * from './shared.module';


