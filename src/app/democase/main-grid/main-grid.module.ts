import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridModule} from '../../component/grid/grid.directive';
import {TableModule} from '../../component/table/table.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CodeModule} from '../../component/code/code.component';
import {MainGridRoutingModule} from './main-grid-routing.module';
import {MainGridComponent} from './main-grid.component';
import {LanguageModule} from '../common/language';

@NgModule({
  imports: [
    CommonModule,
    MainGridRoutingModule,
    GridModule,
    TableModule,
    TabGroupModule,
    CodeModule,
    LanguageModule
  ],
  declarations: [MainGridComponent]
})

export class MainGridModule {}
