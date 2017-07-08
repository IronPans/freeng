/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainCardComponent} from './main-card.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainCardComponent}
  ])],
  exports: [RouterModule]
})

export class MainCardRoutingModule {}
