/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainBreadcrumbComponent} from './main-breadcrumb.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainBreadcrumbComponent}
  ])],
  exports: [RouterModule]
})

export class MainBreadcrumbRoutingModule {}
