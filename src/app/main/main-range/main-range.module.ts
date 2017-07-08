/**
 * Created by ux168 on 17-7-1.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {RangeModule} from '../../component/range/range.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainRangeRoutingModule} from './main-range-routing.module';
import {MainRangeComponent} from './main-range.component';

@NgModule({
  imports: [
    CommonModule,
    MainRangeRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    RangeModule,
    GridModule
  ],
  declarations: [MainRangeComponent]
})

export default class MainRangeModule {}
