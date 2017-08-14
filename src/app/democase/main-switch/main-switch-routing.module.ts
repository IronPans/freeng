/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainSwitchComponent} from './main-switch.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainSwitchComponent}
  ])],
  exports: [RouterModule]
})

export class MainSwitchRoutingModule {}
