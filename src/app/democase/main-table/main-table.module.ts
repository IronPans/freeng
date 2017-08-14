import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {TableModule} from '../../component/table/table.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainTableRoutingModule} from './main-table-routing.module';
import {MainTableComponent} from './main-table.component';
import {DatatableModule} from '../../component/datatable/datatable.component';

@NgModule({
  imports: [
    CommonModule,
    MainTableRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    DatatableModule
  ],
  declarations: [MainTableComponent]
})

export class MainTableModule {}
