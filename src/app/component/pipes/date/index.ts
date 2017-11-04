import {NgModule} from '@angular/core';
import {DateFormatPipe} from './date-format';
import {DateAddPipe} from './date-add';
import {DateDurationPipe} from './date-duration';
import {DateLocalePipe} from './date-locale';
import {DateLocalPipe} from './date-local';
import {DateSubstractPipe} from './date-subtract';
import {DateUtcPipe} from './date-utc';
import {DateUnixPipe} from './date-unix';

export {DateFormatPipe} from './date-format';
export {DateAddPipe} from './date-add';
export {DateDurationPipe} from './date-duration';
export {DateLocalePipe} from './date-locale';
export {DateLocalPipe} from './date-local';
export {DateSubstractPipe} from './date-subtract';

const DATE_PIPES = [
  DateFormatPipe,
  DateAddPipe,
  DateDurationPipe,
  DateLocalePipe,
  DateLocalPipe,
  DateSubstractPipe,
  DateUnixPipe,
  DateUtcPipe
];

@NgModule({
  exports: DATE_PIPES,
  declarations: DATE_PIPES
})
export class DatePipeModule {
}
