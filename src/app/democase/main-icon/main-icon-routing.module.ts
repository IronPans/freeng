/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainIconComponent} from './main-icon.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainIconComponent}
  ])],
  exports: [RouterModule]
})

export class MainIconRoutingModule {}
