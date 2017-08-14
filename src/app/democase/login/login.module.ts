import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ButtonModule } from '../../component/button/button.directive';
import {ParticleModule} from '../../component/particle/particle.directive';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';

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
export class LoginModule {}
