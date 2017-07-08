/**
 * Created by ux168 on 17-7-1.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelModule} from '../../component/panel/panel.component';
import {GridModule} from '../../component/grid/grid.directive';
import {CodeModule} from '../../component/code/code.component';
import {TreeModule} from '../../component/tree/tree.component';
import {MainStartRoutingModule} from './main-start-routing.module';
import {MainStartComponent} from './main-start.component';

@NgModule({
  imports: [
    CommonModule,
    MainStartRoutingModule,
    PanelModule,
    GridModule,
    CodeModule,
    TreeModule
  ],
  declarations: [MainStartComponent]
})

export default class MainStartModule {
}
