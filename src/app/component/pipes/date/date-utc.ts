import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateUtc'
})

export class DateUtcPipe implements PipeTransform {
  transform(value: any): any {
    return moment(value).utc();
  }
}
