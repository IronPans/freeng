import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateLocale'
})

export class DateLocalePipe implements PipeTransform {
  transform(value: string, locale: string): any {
    return moment(value).locale(locale);
  }
}
