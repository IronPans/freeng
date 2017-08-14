import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {RatingModule} from '../../component/rating/rating.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainRatingRoutingModule} from './main-rating-routing.module';
import {MainRatingComponent} from './main-rating.component';

@NgModule({
  imports: [
    CommonModule,
    MainRatingRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    RatingModule,
    GridModule
  ],
  declarations: [MainRatingComponent]
})

export class MainRatingModule {}
