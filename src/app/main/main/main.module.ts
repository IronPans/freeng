/**
 * Created by TGCode on 2017/6/30.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShareModule} from '../../component/common/share';
import {AccordionModule} from '../../component/accordion/accordion.component';
import {PanelModule} from '../../component/panel/panel.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainComponent} from './main.component';
import {RouterModule} from '@angular/router';
import MainRoutingModule from './main-routing.module';
import {ButtonModule} from '../../component/button/button.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MainRoutingModule,
    ShareModule,
    AccordionModule,
    PanelModule,
    GridModule,
    ButtonModule
  ],
  declarations: [MainComponent]
})

export default class MainModule {}
