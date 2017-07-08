/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainColorComponent} from './main-color.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainColorComponent}
  ])],
  exports: [RouterModule]
})

export class MainColorRoutingModule {}
