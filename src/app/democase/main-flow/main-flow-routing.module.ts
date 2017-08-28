import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {MainFlowComponent} from './main-flow.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', component: MainFlowComponent}
    ])
  ],
  exports: [RouterModule]
})
export class MainFlowRoutingModule { }
