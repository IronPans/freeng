import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {GridModule} from '../../component/grid/grid.directive';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {MainColumnComponent} from './main-column.component';
import {MainColumnRoutingModule} from './main-column-routing.module';
import {ColumnModule} from '../../component/column/column.component';

@NgModule({
  imports: [
    CommonModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    ColumnModule,
    MainColumnRoutingModule
  ],
  declarations: [MainColumnComponent]
})

export class MainColumnModule {}
