import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelModule} from '../../component/panel/panel.component';
import {GridModule} from '../../component/grid/grid.directive';
import {TableModule} from '../../component/table/table.component';
import {MainChangelogRoutingModule} from './main-changelog-routing.module';
import {MainChangelogComponent} from './main-changelog.component';
import {TimelineModule} from '../../component/timeline/timeline.component';
import {ShareModule} from '../../component/common/share';
import {LanguageModule} from '../common/language';

@NgModule({
  imports: [
    CommonModule,
    MainChangelogRoutingModule,
    PanelModule,
    GridModule,
    TableModule,
    TimelineModule,
    ShareModule,
    LanguageModule
  ],
  declarations: [MainChangelogComponent]
})

export class MainChangelogModule {}
