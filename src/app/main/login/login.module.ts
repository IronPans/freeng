import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ButtonModule } from '../../component/button/button.directive';
import {LoginRoutingModule} from './login-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {ParticleModule} from '../../component/particle/particle.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    ButtonModule,
    ParticleModule
  ],
  declarations: [
    LoginComponent
  ]
})
export default class LoginModule {}
