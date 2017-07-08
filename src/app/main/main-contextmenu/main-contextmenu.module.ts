import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {GridModule} from '../../component/grid/grid.directive';
import {ContextmenuModule} from '../../component/contextmenu/contextmenu.component';
import {MainContextRoutingModule} from './main-contextmenu-routing.module';
import {ButtonModule} from '../../component/button/button.directive';
import {MainContextmenuComponent} from './main-contextmenu.component';

@NgModule({
  imports: [
    CommonModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    ButtonModule,
    ContextmenuModule,
    MainContextRoutingModule
  ],
  declarations: [MainContextmenuComponent]
})

export default class MainChipModule {}

