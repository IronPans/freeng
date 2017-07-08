/**
 * Created by ux168 on 17-7-1.
 */

import {NgModule} from '@angular/core';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {AccordionModule} from '../../component/accordion/accordion.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainAccordionComponent} from './main-accordion.component';
import {MainAccordionRoutingModule} from './main-accordion-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MainAccordionRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    AccordionModule,
    GridModule
  ],
  declarations: [MainAccordionComponent]
})

export default class MainAccordionModule {}
