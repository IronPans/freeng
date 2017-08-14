import {MainDatatableComponent} from './main-datatable.component';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', component: MainDatatableComponent}
    ])
  ],
  exports: [RouterModule]
})

export class MainDatatableRoutingModule {}
