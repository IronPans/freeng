import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CheckboxModule} from '../../component/checkbox/checkbox.component';
import {GridModule} from '../../component/grid/grid.directive';
import {ButtonModule} from '../../component/button/button.directive';
import {MainCheckboxRoutingModule} from './main-checkbox-routing.module';
import {MainCheckboxComponent} from './main-checkbox.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MainCheckboxRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    CheckboxModule,
    GridModule,
    ButtonModule
  ],
  declarations: [MainCheckboxComponent]
})

export class MainCheckboxModule {}
