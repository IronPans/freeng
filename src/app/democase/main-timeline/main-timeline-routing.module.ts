import {RouterModule} from '@angular/router';
import {MainTimelineComponent} from './main-timeline.component';
import {NgModule} from '@angular/core';
@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', component: MainTimelineComponent}
    ])
  ],
  exports: [RouterModule]
})
export class MainTimelineRoutingModule {}
