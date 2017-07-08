/**
 * Created by ux168 on 17-7-1.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {IconModule} from '../../component/icon/icon.component';
import {ListModule} from '../../component/list/list.component';
import {ImageModule} from '../../component/image/image.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainListRoutingModule} from './main-list-routing.module';
import {MainListComponent} from './main-list.component';

@NgModule({
  imports: [
    CommonModule,
    MainListRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    IconModule,
    ListModule,
    ImageModule,
    GridModule
  ],
  declarations: [MainListComponent]
})

export default class MainListModule {}
