/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainBadgeComponent} from './main-badge.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainBadgeComponent}
  ])],
  exports: [RouterModule]
})

export class MainBadgeRoutingModule {}
