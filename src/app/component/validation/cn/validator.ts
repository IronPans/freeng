import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';
import {isValueExited} from '../util/api';
export const cn: ValidatorFn = (control: AbstractControl): {[key: string]: boolean} => {
  if (isValueExited(Validators.required(control))) {
    return null;
  }
  const reg = /^[\u4e00-\u9fa5]+$/;
  return reg.test(control.value) ? null : {cn: true};
}
