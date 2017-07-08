/**
 * Created by ux168 on 17-7-1.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridModule} from '../../component/grid/grid.directive';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {MainToastRoutingModule} from './main-toast-routing.module';
import {MainToastComponent} from './main-toast.component';
import {ButtonModule} from '../../component/button/button.directive';

@NgModule({
  imports: [
    CommonModule,
    MainToastRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    ButtonModule
  ],
  declarations: [MainToastComponent]
})

export default class MainToastModule { }
