import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CodeModule} from '../../component/code/code.component';
import {GridModule} from '../../component/grid/grid.directive';
import {TableModule} from '../../component/table/table.component';
import {ButtonModule} from '../../component/button/button.directive';
import {LanguageModule} from '../common/language';
import {MainTourRoutingModule} from './main-tour-routing.module';
import {MainTourComponent} from './main-tour.component';
import {TourModule} from '../../component/tour/tour.component';
import {PanelModule} from '../../component/panel/panel.component';

@NgModule({
  imports: [
    CommonModule,
    TabGroupModule,
    CodeModule,
    GridModule,
    ButtonModule,
    TableModule,
    TourModule,
    PanelModule,
    LanguageModule,
    MainTourRoutingModule
  ],
  declarations: [MainTourComponent]
})

export class MainTourModule {}
