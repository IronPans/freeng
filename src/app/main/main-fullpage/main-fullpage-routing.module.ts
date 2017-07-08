import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainFullpageComponent} from './main-fullpage.component';
@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainFullpageComponent}
  ])],
  exports: [RouterModule]
})

export class MainFullpageRoutingModule {}
