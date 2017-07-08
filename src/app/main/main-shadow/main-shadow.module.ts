/**
 * Created by ux168 on 17-7-1.
 */
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {GridModule} from '../../component/grid/grid.directive';
import {MainShadowRoutingModule} from './main-shadow-routing.module';
import {NgModule} from '@angular/core';
import {MainShadowComponent} from './main-shadow.component';

@NgModule({
  imports: [
    CommonModule,
    MainShadowRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule
  ],
  declarations: [MainShadowComponent]
})

export default class MainShadowModule {}
