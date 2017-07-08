/**
 * Created by ux168 on 17-7-1.
 */
import {MainAccordionComponent} from './main-accordion.component';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', component: MainAccordionComponent}
    ])
  ],
  exports: [RouterModule]
})

export class MainAccordionRoutingModule {}
