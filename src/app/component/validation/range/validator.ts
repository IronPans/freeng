import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';
import {isValueExited} from '../util/api';

export function range(range: Array<number>): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    if (!isValueExited(range) || isValueExited(Validators.required(control))) {
      return null;
    }
    const v: number = +control.value;
    return v >= range[0] && v <= range[1] ? null : {actualValue: v, requiredValue: range, range: true};
  };
};
