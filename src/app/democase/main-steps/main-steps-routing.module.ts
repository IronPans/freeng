import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainStepsComponent} from './main-steps.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainStepsComponent}
  ])],
  exports: [RouterModule]
})

export class MainStepsRoutingModule {}
