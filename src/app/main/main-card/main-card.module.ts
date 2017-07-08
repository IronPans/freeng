/**
 * Created by ux168 on 17-7-1.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CardModule} from '../../component/card/card.component';
import {ImageModule} from '../../component/image/image.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainCardRoutingModule} from './main-card-routing.module';
import {MainCardComponent} from './main-card.component';

@NgModule({
  imports: [
    CommonModule,
    MainCardRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    CardModule,
    ImageModule,
    GridModule
  ],
  declarations: [MainCardComponent]
})

export default class MainCardModule {}
