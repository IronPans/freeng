import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReviewFullpageRoutingModule} from './review-fullpage-routing';
import {ReviewFullpageComponent} from './review-fullpage.component';
import {FullpageModule} from '../../component/fullpage/fullpage.component';

@NgModule({
  imports: [
    CommonModule,
    FullpageModule,
    ReviewFullpageRoutingModule
  ],
  declarations: [ReviewFullpageComponent]
})

export class ReviewFullpageModule {}
