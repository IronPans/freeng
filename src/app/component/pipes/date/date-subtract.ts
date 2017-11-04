import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateSubstract'
})

export class DateSubstractPipe implements PipeTransform {
  transform(value: any, amount: any, unit: any): any {
    if (typeof amount === 'undefined' || (typeof amount === 'number' && typeof unit === 'undefined')) {
      return value;
    }
    return moment(value).subtract(amount, unit);
  }
}
