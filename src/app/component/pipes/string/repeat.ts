import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'repeat'
})

export class RepeatPipe implements PipeTransform {
  transform(value: string, n: number): any {
    let result = '';
    if (!value || n < 1 || n > Number.MAX_SAFE_INTEGER) {
      return result;
    }
    do {
      if (n % 2) {
        result += value;
      }
      n = Math.floor(n / 2);
      if (n) {
        value += value;
      }
    } while (n);

    return result;
  }
}
