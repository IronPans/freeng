/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainRatingComponent} from './main-rating.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainRatingComponent}
  ])],
  exports: [RouterModule]
})

export class MainRatingRoutingModule {}
