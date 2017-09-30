
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainKnobComponent} from './main-knob.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainKnobComponent}
  ])],
  exports: [RouterModule]
})

export class MainKnobRoutingModule {}
