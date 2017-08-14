import {RouterModule} from '@angular/router';
import {MainChartComponent} from './main-chart.component';
import {NgModule} from '@angular/core';
@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', component: MainChartComponent}
    ])
  ]
})
export class MainChartRoutingModule {}
