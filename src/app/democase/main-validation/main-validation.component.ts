import {Component, HostBinding} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomFormValidator} from '../../component/validation/custom-form-validator.module';
import {fadeInUp} from '../common/animations';

@Component({
  selector: 'free-main-validation',
  templateUrl: './main-validation.component.html',
  styleUrls: ['./main-validation.component.scss'],
  animations: [fadeInUp]
})
export class MainValidationComponent {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  testForm: FormGroup;
  constructor(public fb: FormBuilder) {
    this.testForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, CustomFormValidator.phone('CN')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(25)]],
      email: ['', [Validators.required, Validators.email]],
      url: ['', [Validators.required, CustomFormValidator.url]]
    })
  }

  onSubmit() {}
}
