import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {BreadcrumbModule} from '../../component/breadcrumb/breadcrumb.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainBreadcrumbRoutingModule} from './main-breadcrumb-routing.module';
import {MainBreadcrumbComponent} from './main-breadcrumb.component';
import {LanguageModule} from '../common/language';

@NgModule({
  imports: [
    CommonModule,
    MainBreadcrumbRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    BreadcrumbModule,
    GridModule,
    LanguageModule
  ],
  declarations: [MainBreadcrumbComponent]
})

export class MainBreadcrumbModule {}
