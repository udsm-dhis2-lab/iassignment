import { DataFilterModule } from "./modules/data-filter/data-filter.module";
import { LayoutModule } from "./modules/layout/layout.module";
import { MenuModule } from "./modules/menu/menu.module";
import { SharedModule } from "./shared.module";

export const sharedModules: any[] = [
  SharedModule,
  DataFilterModule,
  LayoutModule,
  MenuModule,
];
export * from "./shared.module";
