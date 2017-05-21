"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var button_directive_1 = require("../../component/button/button.directive");
var LoginComponent = (function () {
    function LoginComponent(fb, router) {
        this.fb = fb;
        this.router = router;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.fb.group({
            account: ['admin', [forms_1.Validators.required]],
            password: ['123456', [forms_1.Validators.required]]
        });
    };
    LoginComponent.prototype.onLogin = function () {
        var _a = this.loginForm.controls, account = _a.account, password = _a.password;
        this.account = account;
        this.password = password;
        if (account.value === 'admin' &&
            password.value === '123456') {
            this.router.navigate(['main']);
        }
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'free-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
var LoginModule = (function () {
    function LoginModule() {
    }
    return LoginModule;
}());
LoginModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            button_directive_1.ButtonModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule
        ],
        declarations: [
            LoginComponent
        ]
    })
], LoginModule);
exports.LoginModule = LoginModule;
//# sourceMappingURL=login.component.js.map