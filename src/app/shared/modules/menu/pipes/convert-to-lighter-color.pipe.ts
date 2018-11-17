import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToLighterColor'
})
export class ConvertToLighterColor implements PipeTransform {

  transform(hexColor: string): any {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) + 30;
    const g = parseInt(hex.substring(2, 4), 16) + 30;
    const b = parseInt(hex.substring(4, 6), 16) + 30;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

}
