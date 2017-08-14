/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainTypographyComponent} from './main-typography.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainTypographyComponent}
  ])],
  exports: [RouterModule]
})

export class MainTypographyRoutingModule {}
