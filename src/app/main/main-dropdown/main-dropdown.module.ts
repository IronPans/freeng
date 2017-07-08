/**
 * Created by ux168 on 17-7-1.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {DropdownModule} from '../../component/dropdown/dropdown.component';
import {ShareModule} from '../../component/common/share';
import {GridModule} from '../../component/grid/grid.directive';
import {MainDropdownRoutingModule} from './main-dropdown-routing.module';
import {MainDropdownComponent} from './main-dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    MainDropdownRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    DropdownModule,
    ShareModule,
    GridModule
  ],
  declarations: [MainDropdownComponent]
})

export default class MainDropdownModule {}
