import {Component, OnInit, ViewChild, Renderer2, AfterViewInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ToastController} from '../../component/toast/toast.controller';

@Component({
  selector: 'free-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup;
  registerForm: FormGroup;
  account: any;
  password: any;
  isOpen: boolean;
  @ViewChild('panel') panel: any;
  _panel: any;
  constructor(private fb: FormBuilder,
              private renderer2: Renderer2,
              private toastCtrl: ToastController,
              private router: Router) { }

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
    this.toastCtrl.create({
      message: msg
    });
  }

  onRegister() {

  }
}

