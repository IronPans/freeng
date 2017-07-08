import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ReviewFullpageComponent} from './review-fullpage.component';
@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: ReviewFullpageComponent}
  ])],
  exports: [RouterModule]
})

export class ReviewFullpageRoutingModule {}
