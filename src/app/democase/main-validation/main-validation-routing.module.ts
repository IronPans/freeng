
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainValidationComponent} from './main-validation.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainValidationComponent}
  ])],
  exports: [RouterModule]
})


export class MainValidationRoutingModule {}
