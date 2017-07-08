/**
 * Created by ux168 on 17-7-1.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelModule} from '../../component/panel/panel.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainColorRoutingModule} from './main-color-routing.module';
import {MainColorComponent} from './main-color.component';

@NgModule({
  imports: [
    CommonModule,
    MainColorRoutingModule,
    PanelModule,
    GridModule
  ],
  declarations: [MainColorComponent]
})

export default class MainColorModule {}
