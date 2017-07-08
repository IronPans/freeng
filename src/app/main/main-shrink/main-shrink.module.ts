/**
 * Created by ux168 on 17-7-1.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {ShrinkModule} from '../../component/shrink/shrink.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainShrinkRoutingModule} from './main-shrink-routing.module';
import {MainShrinkComponent} from './main-shrink.component';

@NgModule({
  imports: [
    CommonModule,
    MainShrinkRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    ShrinkModule,
    GridModule
  ],
  declarations: [MainShrinkComponent]
})

export default class MainShrinkModule {}
