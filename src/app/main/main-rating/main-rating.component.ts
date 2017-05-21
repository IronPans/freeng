import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {RatingModule} from '../../component/rating/rating.component';
import {GridModule} from '../../component/grid/grid.directive';

@Component({
  selector: 'free-main-rating',
  templateUrl: './main-rating.component.html',
  styleUrls: ['./main-rating.component.scss'],
  animations: [fadeInUp]
})
export class MainRatingComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  constructor() { }

  ngOnInit() {
  }

  ratingChange(value: number) {
    alert(value);
  }
}
@NgModule({
  imports: [
    CommonModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    RatingModule,
    GridModule
  ],
  declarations: [MainRatingComponent]
})

export class MainRatingModule {}
