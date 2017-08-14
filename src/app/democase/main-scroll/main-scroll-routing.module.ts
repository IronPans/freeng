/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainScrollComponent} from './main-scroll.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainScrollComponent}
  ])],
  exports: [RouterModule]
})

export class MainScrollRoutingModule {}
