import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CodeModule} from '../../component/code/code.component';
import {GridModule} from '../../component/grid/grid.directive';
import {TableModule} from '../../component/table/table.component';
import {ButtonModule} from '../../component/button/button.directive';
import {LanguageModule} from '../common/language';
import {PopoverModule} from '../../component/popover/popover.component';
import {MainPopoverRoutingModule} from './main-popover-routing.module';
import {MainPopoverComponent} from './main-popover.component';
import {AccordionModule} from '../../component/accordion/accordion.component';

@NgModule({
  imports: [
    CommonModule,
    MainPopoverRoutingModule,
    TabGroupModule,
    CodeModule,
    GridModule,
    ButtonModule,
    TableModule,
    PopoverModule,
    AccordionModule,
    LanguageModule
  ],
  declarations: [MainPopoverComponent]
})

export class MainPopoverModule {}
