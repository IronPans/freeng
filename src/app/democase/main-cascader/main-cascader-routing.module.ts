import {RouterModule} from '@angular/router';
import {MainCascaderComponent} from './main-cascader.component';
import {NgModule} from '@angular/core';
@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '', component: MainCascaderComponent
    }])
  ],
  exports: [RouterModule]
})

export class MainCascaderRoutingModule {}
