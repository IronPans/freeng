import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'gt'
})

export class GtPipe implements PipeTransform {
  transform(value: any, other: number): any {
    const comArr = [];
    if (Array.isArray(value)) {
      for (const v of value) {
        if (this.compare(v, other)) {
          comArr.push(v);
        }
      }
      return comArr;
    }
    return value;
  }

  compare(a, b) {
    if (!(typeof a === 'string' && typeof b === 'string')) {
      a = +a;
      b = +b;
    }
    return a > b;
  }
}
