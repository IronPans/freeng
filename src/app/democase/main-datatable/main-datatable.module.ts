import {CommonModule} from '@angular/common';
import {DatatableModule} from '../../component/datatable/datatable.component';
import {NgModule} from '@angular/core';
import {MainDatatableComponent} from './main-datatable.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CodeModule} from '../../component/code/code.component';
import {TableModule} from '../../component/table/table.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainDatatableRoutingModule} from './main-datatable-routing.module';
import {LanguageModule} from '../common/language';

@NgModule({
  imports: [
    CommonModule,
    DatatableModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    MainDatatableRoutingModule,
    LanguageModule
  ],
  declarations: [MainDatatableComponent]
})

export class MainDatatableModule {}
