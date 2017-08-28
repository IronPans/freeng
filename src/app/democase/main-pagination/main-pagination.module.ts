import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridModule} from '../../component/grid/grid.directive';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {PaginationModule} from '../../component/pagination/pagination.component';
import {MainPaginationRoutingModule} from './main-pagination-routing.module';
import {MainPaginationComponent} from './main-pagination.component';
import {LanguageModule} from '../common/language';

@NgModule({
  imports: [
    CommonModule,
    MainPaginationRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    PaginationModule,
    LanguageModule
  ],
  declarations: [MainPaginationComponent]
})

export class MainPaginationModule {}
