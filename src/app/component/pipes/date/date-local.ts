import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateLocal'
})

export class DateLocalPipe implements PipeTransform {
  transform(value: any): any {
    return moment(value).local();
  }
}
