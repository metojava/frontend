import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ssnLastFour'
})
export class SsnLastFourPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }
    const lastFour = value.slice(-4);
    return '***-**-' + lastFour;
  }

}
