import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {SwitchModule} from '../../component/switch/switch.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainSwitchRoutingModule} from './main-switch-routing.module';
import {MainSwitchComponent} from './main-switch.component';
import {LanguageModule} from '../common/language';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MainSwitchRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    SwitchModule,
    GridModule,
    LanguageModule
  ],
  declarations: [MainSwitchComponent]
})

export class MainSwitchModule {}
