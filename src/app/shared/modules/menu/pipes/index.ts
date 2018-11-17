import { FilterByNamePipe } from './filter-by-name.pipe';
import { AbbreviatePipe } from './abbreviate.pipe';
import { ConvertToLighterColor } from './convert-to-lighter-color.pipe';

export const pipes: any[] = [FilterByNamePipe, AbbreviatePipe, ConvertToLighterColor];

export * from './filter-by-name.pipe';
export * from './abbreviate.pipe';
export * from './convert-to-lighter-color.pipe';
