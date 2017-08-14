/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {MainTabComponent} from './main-tab.component';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainTabComponent}
  ])],
  exports: [RouterModule]
})

export class MainTabRoutingModule {}
