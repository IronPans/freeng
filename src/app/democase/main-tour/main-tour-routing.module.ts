import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainTourComponent} from './main-tour.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainTourComponent}
  ])],
  exports: [RouterModule]
})

export class MainTourRoutingModule {}
