/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainListComponent} from './main-list.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainListComponent}
  ])],
  exports: [RouterModule]
})

export class MainListRoutingModule {}
