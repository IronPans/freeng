/**
 * Created by ux168 on 17-7-1.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {GridModule} from '../../component/grid/grid.directive';
import {TreeModule} from '../../component/tree/tree.component';
import {MainTreeRoutingModule} from './main-tree-routing.module';
import {MainTreeComponent} from './main-tree.component';

@NgModule({
  imports: [
    CommonModule,
    MainTreeRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    TreeModule
  ],
  declarations: [MainTreeComponent]
})

export default class MainTreeModule {}
