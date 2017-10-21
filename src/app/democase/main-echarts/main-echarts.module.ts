import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {GridModule} from '../../component/grid/grid.directive';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {LanguageModule} from '../common/language';
import {MainEchartsRoutingModule} from './main-echarts-routing.module';
import {MainEchartsComponent} from './main-echarts.component';
import {EchartModule} from '../../component/echart/echart.component';
@NgModule({
  imports: [
    CommonModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    EchartModule,
    MainEchartsRoutingModule,
    LanguageModule
  ],
  declarations: [MainEchartsComponent]
})
export class MainEchartsModule {}
