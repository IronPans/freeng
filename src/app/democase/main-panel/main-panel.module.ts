import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridModule} from '../../component/grid/grid.directive';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {MainPanelComponent} from './main-panel.component';
import {MainPanelRoutingModule} from './main-panel-routing.module';
import {PanelModule} from '../../component/panel/panel.component';
import {ShareModule} from '../../component/common/share';
import {LanguageModule} from '../common/language';

@NgModule({
  imports: [
    CommonModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    ShareModule,
    GridModule,
    PanelModule,
    MainPanelRoutingModule,
    LanguageModule
  ],
  declarations: [MainPanelComponent]
})

export class MainPanelModule {}
