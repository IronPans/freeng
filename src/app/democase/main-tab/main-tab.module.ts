import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {TableModule} from '../../component/table/table.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainTabRoutingModule} from './main-tab-routing.module';
import {MainTabComponent} from './main-tab.component';
@NgModule({
  imports: [
    CommonModule,
    MainTabRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule
  ],
  declarations: [MainTabComponent]
})

export class MainTabModule {}
