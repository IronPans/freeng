/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainShadowComponent} from './main-shadow.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainShadowComponent}
  ])],
  exports: [RouterModule]
})

export class MainShadowRoutingModule {}
