import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {ChipModule} from '../../component/chip/chip.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainChipRoutingModule} from './main-chip-routing.module';
import {MainChipComponent} from './main-chip.component';

@NgModule({
  imports: [
    CommonModule,
    MainChipRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    ChipModule,
    GridModule
  ],
  declarations: [MainChipComponent]
})

export class MainChipModule {}
