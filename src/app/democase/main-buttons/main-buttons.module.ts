import {NgModule} from '@angular/core';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {ButtonModule} from '../../component/button/button.directive';
import {GridModule} from '../../component/grid/grid.directive';
import {MainButtonsComponent} from './main-buttons.component';
import {MainButtonsRoutingModule} from './main-buttons-routing.module';
@NgModule({
  imports: [
    CommonModule,
    MainButtonsRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    ButtonModule,
    GridModule
  ],
  declarations: [MainButtonsComponent]
})

export class MainButtonsModule {}
