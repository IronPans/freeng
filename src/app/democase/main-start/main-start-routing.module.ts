/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainStartComponent} from './main-start.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainStartComponent}
  ])],
  exports: [RouterModule]
})

export class MainStartRoutingModule {}
