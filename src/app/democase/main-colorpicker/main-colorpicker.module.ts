import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {GridModule} from '../../component/grid/grid.directive';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {ButtonModule} from '../../component/button/button.directive';
import {MainColorpickerComponent} from './main-colorpicker.component';
import {MainColorpickerRoutingModule} from './main-colorpicker-routing.module';
import {ColorPickerModule} from '../../component/colorpicker/colorpicker.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MainColorpickerRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    ButtonModule,
    ColorPickerModule
  ],
  declarations: [MainColorpickerComponent]
})

export class MainColorpickerModule {}
