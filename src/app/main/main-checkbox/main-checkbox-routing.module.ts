/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainCheckboxComponent} from './main-checkbox.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainCheckboxComponent}
  ])],
  exports: [RouterModule]
})

export class MainCheckboxRoutingModule {}
