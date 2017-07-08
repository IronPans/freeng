/**
 * Created by ux168 on 17-7-1.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridModule} from '../../component/grid/grid.directive';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {SpinnerModule} from '../../component/spinner/spinner.component';
import {TableModule} from '../../component/table/table.component';
import {MainSpinnerRoutingModule} from './main-spinner-routing.module';
import {MainSpinnerComponent} from './main-spinner.component';

@NgModule({
  imports: [
    CommonModule,
    MainSpinnerRoutingModule,
    TabGroupModule,
    TableModule,
    CodeModule,
    GridModule,
    SpinnerModule
  ],
  declarations: [MainSpinnerComponent]
})

export default class MainSpinnerModule {}
