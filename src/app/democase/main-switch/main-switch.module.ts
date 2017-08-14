import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {SwitchModule} from '../../component/switch/switch.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainSwitchRoutingModule} from './main-switch-routing.module';
import {MainSwitchComponent} from './main-switch.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MainSwitchRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    SwitchModule,
    GridModule
  ],
  declarations: [MainSwitchComponent]
})

export class MainSwitchModule {}
