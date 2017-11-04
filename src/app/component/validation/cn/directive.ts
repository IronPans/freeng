import {Directive, forwardRef} from '@angular/core';
import {NG_VALIDATORS, Validator, AbstractControl} from '@angular/forms';
import {cn} from './validator';

const CN_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => CnValidator),
  multi: true
};
@Directive({
  selector: '[cn][formControlName],[cn][formControl],[cn][ngModel]',
  providers: [CN_VALIDATOR]
})
export class CnValidator implements Validator {
  validate(control: AbstractControl): { [key: string]: any } {
    return cn(control);
  }
}
