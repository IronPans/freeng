import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {ProgressModule} from '../../component/progress/progress.component';
import {GridModule} from '../../component/grid/grid.directive';

@Component({
  selector: 'free-main-progress',
  templateUrl: './main-progress.component.html',
  styleUrls: ['./main-progress.component.scss'],
  animations: [fadeInUp]
})
export class MainProgressComponent implements OnInit {

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
    ProgressModule,
    GridModule
  ],
  declarations: [MainProgressComponent]
})

export class MainProgressModule {}
