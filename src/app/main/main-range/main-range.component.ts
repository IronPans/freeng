import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {RangeModule} from '../../component/range/range.component';
import {GridModule} from '../../component/grid/grid.directive';

@Component({
  selector: 'free-main-range',
  templateUrl: './main-range.component.html',
  styleUrls: ['./main-range.component.scss'],
  animations: [fadeInUp]
})
export class MainRangeComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  constructor() { }

  ngOnInit() {
  }

}
@NgModule({
  imports: [
    CommonModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    RangeModule,
    GridModule
  ],
  declarations: [MainRangeComponent]
})

export class MainRangeModule {}
