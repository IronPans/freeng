import {NgModule} from '@angular/core';
import {email, EmailValidator} from './email';
import {date, DateValidator} from './date';
import {url, UrlValidator} from './url';
import {cn, CnValidator} from './cn';
import {range, RangeValidator} from './range';
import {number, NumberValidator} from './number';
import {phone, PhoneValidator} from './phone';

export const CustomFormValidator: any = {
  date,
  email,
  url,
  cn,
  range,
  number,
  phone
};

const CUSTOM_FORM_DIRECTIVES = [
  EmailValidator,
  DateValidator,
  UrlValidator,
  CnValidator,
  RangeValidator,
  NumberValidator,
  PhoneValidator
];

@NgModule({
  exports: [CUSTOM_FORM_DIRECTIVES],
  declarations: [CUSTOM_FORM_DIRECTIVES]
})
export class CustomFormModule {
}
