import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {RadioModule} from '../../component/radio/radio.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainRadioRoutingModule} from './main-radio-routing.module';
import {MainRadioComponent} from './main-radio.component';
import {LanguageModule} from '../common/language';

@NgModule({
  imports: [
    CommonModule,
    MainRadioRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    RadioModule,
    GridModule,
    LanguageModule
  ],
  declarations: [MainRadioComponent]
})

export class MainRadioModule {}
