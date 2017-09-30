import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainKnobRoutingModule} from './main-knob-routing.module';
import {MainKnobComponent} from './main-knob.component';
import {LanguageModule} from '../common/language';
import {KnobModule} from '../../component/knob/knob.component';

@NgModule({
  imports: [
    CommonModule,
    MainKnobRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    LanguageModule,
    KnobModule
  ],
  declarations: [MainKnobComponent]
})

export class MainKnobModule {}
