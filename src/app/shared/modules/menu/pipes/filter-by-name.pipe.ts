import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {
  transform(list: any[], name: any): any {
    const splitedName = name ? name.split(/[\.\-_]/) : [];
    return splitedName.length > 0
      ? list.filter((item: any) =>
        splitedName.some(
          (nameString: string) =>
            item.displayName.toLowerCase().indexOf(nameString.toLowerCase()) !== -1
        )
      )
      : list;
  }
}
