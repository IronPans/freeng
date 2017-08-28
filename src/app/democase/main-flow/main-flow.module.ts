import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridModule} from '../../component/grid/grid.directive';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {MainFlowRoutingModule} from './main-flow-routing.module';
import {MainFlowComponent} from './main-flow.component';
import {FlowModule} from '../../component/flow/flow.component';
import {LanguageModule} from '../common/language';

@NgModule({
  imports: [
    CommonModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    FlowModule,
    MainFlowRoutingModule,
    LanguageModule
  ],
  declarations: [MainFlowComponent]
})
export class MainFlowModule {}
