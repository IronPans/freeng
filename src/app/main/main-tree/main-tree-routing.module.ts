
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainTreeComponent} from './main-tree.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainTreeComponent}
  ])],
  exports: [RouterModule]
})

export class MainTreeRoutingModule {}
