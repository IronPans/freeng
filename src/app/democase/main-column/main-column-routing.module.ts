import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MainColumnComponent} from './main-column.component';
@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainColumnComponent}
  ])],
  exports: [RouterModule]
})
export class MainColumnRoutingModule {}
