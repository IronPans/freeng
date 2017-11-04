import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';
import {isValueExited} from '../util/api';
export const url: ValidatorFn = (control: AbstractControl): {[key: string]: boolean} => {
  if (isValueExited(Validators.required(control))) {
    return null;
  }
  const reg = /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/;
  return reg.test(control.value) ? null : {url: true};
}
