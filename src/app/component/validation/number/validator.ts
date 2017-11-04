import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';
import {isValueExited} from '../util/api';
export const number: ValidatorFn = (control: AbstractControl): {[key: string]: boolean} => {
  if (isValueExited(Validators.required(control))) {
    return null;
  }
  const reg = /^\d+$/;
  return reg.test(control.value) ? null : {number: true};
}
