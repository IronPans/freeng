/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainTooltipComponent} from './main-tooltip.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainTooltipComponent}
  ])],
  exports: [RouterModule]
})

export class MainTooltipRoutingModule {}
