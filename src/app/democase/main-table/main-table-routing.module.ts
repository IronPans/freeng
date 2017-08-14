/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainTableComponent} from './main-table.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainTableComponent}
  ])],
  exports: [RouterModule]
})

export class MainTableRoutingModule {}
