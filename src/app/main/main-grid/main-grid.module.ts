/**
 * Created by ux168 on 17-7-1.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridModule} from '../../component/grid/grid.directive';
import {TableModule} from '../../component/table/table.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CodeModule} from '../../component/code/code.component';
import {MainGridRoutingModule} from './main-grid-routing.module';
import {MainGridComponent} from './main-grid.component';

@NgModule({
  imports: [
    CommonModule,
    MainGridRoutingModule,
    GridModule,
    TableModule,
    TabGroupModule,
    CodeModule
  ],
  declarations: [MainGridComponent]
})

export default class MainGridModule {}
