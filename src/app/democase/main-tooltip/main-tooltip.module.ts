import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CodeModule} from '../../component/code/code.component';
import {GridModule} from '../../component/grid/grid.directive';
import {TooltipModule} from '../../component/tooltip/tooltip.directive';
import {TableModule} from '../../component/table/table.component';
import {MainTooltipRoutingModule} from './main-tooltip-routing.module';
import {MainTooltipComponent} from './main-tooltip.component';
import {ButtonModule} from '../../component/button/button.directive';
import {LanguageModule} from '../common/language';

@NgModule({
  imports: [
    CommonModule,
    MainTooltipRoutingModule,
    TabGroupModule,
    CodeModule,
    GridModule,
    ButtonModule,
    TooltipModule,
    TableModule,
    LanguageModule
  ],
  declarations: [MainTooltipComponent]
})

export class MainTooltipModule {}
