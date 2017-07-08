
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainPaginationComponent} from './main-pagination.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainPaginationComponent}
  ])],
  exports: [RouterModule]
})

export class MainPaginationRoutingModule {}
