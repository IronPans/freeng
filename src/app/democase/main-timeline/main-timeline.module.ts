import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainTimelineComponent} from './main-timeline.component';
import {MainTimelineRoutingModule} from './main-timeline-routing.module';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {GridModule} from '../../component/grid/grid.directive';
import {TimelineModule} from '../../component/timeline/timeline.component';
import {ImageModule} from '../../component/image/image.component';
@NgModule({
  imports: [
    CommonModule,
    MainTimelineRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    TimelineModule,
    ImageModule
  ],
  declarations: [MainTimelineComponent]
})
export class MainTimelineModule {}
