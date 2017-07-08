/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainSelectComponent} from './main-select.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainSelectComponent}
  ])],
  exports: [RouterModule]
})

export class MainSelectRoutingModule {}
