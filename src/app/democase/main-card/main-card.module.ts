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
import {ButtonModule} from '../../component/button/button.directive';

@NgModule({
  imports: [
    CommonModule,
    MainCardRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    CardModule,
    ImageModule,
    ButtonModule,
    GridModule
  ],
  declarations: [MainCardComponent]
})

export class MainCardModule {}
