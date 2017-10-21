
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainEchartsComponent} from './main-echarts.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainEchartsComponent}
  ])],
  exports: [RouterModule]
})

export class MainEchartsRoutingModule {}
