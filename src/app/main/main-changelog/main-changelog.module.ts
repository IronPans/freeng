/**
 * Created by ux168 on 17-7-1.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelModule} from '../../component/panel/panel.component';
import {GridModule} from '../../component/grid/grid.directive';
import {TableModule} from '../../component/table/table.component';
import {MainChangelogRoutingModule} from './main-changelog-routing.module';
import {MainChangelogComponent} from './main-changelog.component';

@NgModule({
  imports: [
    CommonModule,
    MainChangelogRoutingModule,
    PanelModule,
    GridModule,
    TableModule
  ],
  declarations: [MainChangelogComponent]
})

export default class MainChangelogModule {}
