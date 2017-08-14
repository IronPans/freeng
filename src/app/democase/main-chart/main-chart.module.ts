import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MainChartComponent} from './main-chart.component';
import {MainChartRoutingModule} from './main-chart-routing.module';
import {GridModule} from '../../component/grid/grid.directive';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {ChartModule} from '../../component/chart/chart.component';
@NgModule({
  imports: [
    CommonModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    ChartModule,
    MainChartRoutingModule
  ],
  declarations: [MainChartComponent]
})
export class MainChartModule {}
