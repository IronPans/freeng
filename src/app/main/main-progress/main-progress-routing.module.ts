/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainProgressComponent} from './main-progress.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainProgressComponent}
  ])],
  exports: [RouterModule]
})

export class MainProgressRoutingModule {}
