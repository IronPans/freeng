import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';
import {isEmail, isValueExited} from '../util/api';
export const email: ValidatorFn = (control: AbstractControl): {[key: string]: boolean} => {
  if (isValueExited(Validators.required(control))) {
    return null;
  }
  return isEmail(control.value) ? null : {email: true};
}
