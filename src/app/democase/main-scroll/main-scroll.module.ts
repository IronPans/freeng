import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {ScrollModule} from '../../component/scroll/scroll.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainScrollRoutingModule} from './main-scroll-routing.module';
import {MainScrollComponent} from './main-scroll.component';
import {LanguageModule} from '../common/language';

@NgModule({
  imports: [
    CommonModule,
    MainScrollRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    ScrollModule,
    GridModule,
    LanguageModule
  ],
  declarations: [MainScrollComponent]
})

export class MainScrollModule {}
