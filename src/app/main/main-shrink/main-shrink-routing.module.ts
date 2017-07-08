/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainShrinkComponent} from './main-shrink.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainShrinkComponent}
  ])],
  exports: [RouterModule]
})

export class MainShrinkRoutingModule {}
