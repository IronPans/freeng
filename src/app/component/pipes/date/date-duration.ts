import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateDuration'
})

export class DateDurationPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return moment.duration(value, args[0]).humanize();
  }
}
