import {CommonModule} from '@angular/common';
import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CardModule} from '../../component/card/card.component';
import {ImageModule} from '../../component/image/image.component';
import {GridModule} from '../../component/grid/grid.directive';

@Component({
  selector: 'free-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.scss'],
  animations: [fadeInUp]
})
export class MainCardComponent implements OnInit {

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
    CardModule,
    ImageModule,
    GridModule
  ],
  declarations: [MainCardComponent]
})

export class MainCardModule {}
