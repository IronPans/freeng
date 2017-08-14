import {Component, OnInit, ViewChild, Renderer2, AfterViewInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'free-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup;
  registerForm: FormGroup;
  account: any;
  password: any;
  isOpen: boolean;
  _panel: any;
  pageTitle = '登录';
  @ViewChild('panel') panel: any;
  constructor(public fb: FormBuilder,
              public renderer2: Renderer2,
              public router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      account: ['admin', [Validators.required]],
      password: ['123456', [Validators.required]]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password1: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngAfterViewInit() {
    this._panel = this.panel.nativeElement;
  }

  onToggle() {
    if (!this.isOpen) {
      this.renderer2.addClass(this._panel, 'open');
    } else {
      this.renderer2.removeClass(this._panel, 'open');
    }
    this.isOpen = !this.isOpen;
  }

  onLogin() {
    const {account, password} = this.loginForm.controls;
    this.account = account;
    this.password = password;
    if (account.value === 'admin' &&
          password.value === '123456') {
        this.router.navigate(['/main/introduction']);
    } else {
        this.onToast('请输入测试帐号(帐号是admin,密码是123456)');
    }
  }

  onToast(msg: string) {
  }

  onRegister() {

  }
}

