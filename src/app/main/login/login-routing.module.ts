
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: LoginComponent}
  ])],
  exports: [RouterModule]
})

export class LoginRoutingModule {}
