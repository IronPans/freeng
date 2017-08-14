import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainDraggableRoutingModule} from './main-draggable-routing.module';
import {MainDraggableComponent} from './main-draggable.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CodeModule} from '../../component/code/code.component';
import {TableModule} from '../../component/table/table.component';
import {GridModule} from '../../component/grid/grid.directive';
import {DraggableModule} from '../../component/draggable/draggable.component';
import {ListModule} from '../../component/list/list.component';
import {ImageModule} from '../../component/image/image.component';
@NgModule({
  imports: [
    CommonModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    MainDraggableRoutingModule,
    DraggableModule,
    ListModule,
    ImageModule
  ],
  declarations: [MainDraggableComponent]
})
export class MainDraggableModule {}
