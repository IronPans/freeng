import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';
import {isDate, isValueExited} from '../util/api';
export const date: ValidatorFn = (control: AbstractControl): {[key: string]: boolean} => {
  if (isValueExited(Validators.required(control))) {
    return null;
  }
  const value: string = control.value;
  return isDate(value) ? null : {date: true};
}
