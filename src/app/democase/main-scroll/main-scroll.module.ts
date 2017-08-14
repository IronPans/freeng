import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {PanelModule} from '../../component/panel/panel.component';
import {ScrollModule} from '../../component/scroll/scroll.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainScrollRoutingModule} from './main-scroll-routing.module';
import {MainScrollComponent} from './main-scroll.component';

@NgModule({
  imports: [
    CommonModule,
    MainScrollRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    PanelModule,
    ScrollModule,
    GridModule
  ],
  declarations: [MainScrollComponent]
})

export class MainScrollModule {}
