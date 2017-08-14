/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainLoadingComponent} from './main-loading.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainLoadingComponent}
  ])],
  exports: [RouterModule]
})

export class MainLoadingRoutingModule {}
