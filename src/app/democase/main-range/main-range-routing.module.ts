/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainRangeComponent} from './main-range.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainRangeComponent}
  ])],
  exports: [RouterModule]
})

export class MainRangeRoutingModule {}
