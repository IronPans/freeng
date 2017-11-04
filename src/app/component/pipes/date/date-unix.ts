import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateUnix'
})

export class DateUnixPipe implements PipeTransform {
  transform(value: any): any {
    if (typeof value === 'string') {
      value = +value;
    }
    return moment.unix(value);
  }
}
