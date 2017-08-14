
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainErrorComponent} from './main-error.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainErrorComponent}
  ])],
  exports: [RouterModule]
})

export class MainErrorRoutingModule {}
