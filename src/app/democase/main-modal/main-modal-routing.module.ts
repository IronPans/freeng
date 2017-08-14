/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainModalComponent} from './main-modal.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainModalComponent}
  ])],
  exports: [RouterModule]
})

export class MainModalRoutingModule {}
