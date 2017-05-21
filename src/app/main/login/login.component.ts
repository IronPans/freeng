import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGroup, FormControl, FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from '../../component/button/button.directive';

@Component({
  selector: 'free-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  account: any;
  password: any;
  constructor(private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      account: ['admin', [Validators.required]],
      password: ['123456', [Validators.required]]
    });
  }

  onLogin() {
    const {account, password} = this.loginForm.controls;
    this.account = account;
    this.password = password;
    if (account.value === 'admin' &&
          password.value === '123456') {
        this.router.navigate(['main']);
    }
  }
}
@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {}
