import {AbstractControl, Validators, ValidatorFn} from '@angular/forms';
import {isValidNumber} from 'libphonenumber-js';
import {isValueExited} from '../util/api';

export const phone = (country: any): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: boolean } => {
    if (isValueExited(Validators.required(control))) {
      return null;
    }
    return isValidNumber(control.value, country) ? null : {phone: true};
  };
}
