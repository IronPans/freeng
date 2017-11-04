import {Directive, forwardRef} from '@angular/core';
import {email} from './validator';
import {NG_VALIDATORS, Validator, AbstractControl} from '@angular/forms';

const EMAIL_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EmailValidator),
  multi: true
};
@Directive({
  selector: '[email][formControlName],[email][formControl],[email][ngModel]',
  providers: [EMAIL_VALIDATOR]
})
export class EmailValidator implements Validator {
  validate(control: AbstractControl): { [key: string]: any } {
    return email(control);
  }
}
