
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainGridComponent} from './main-grid.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainGridComponent}
  ])],
  exports: [RouterModule]
})

export class MainGridRoutingModule {}
