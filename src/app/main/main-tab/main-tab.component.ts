import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../component/table/table.component';
import {GridModule} from '../../component/grid/grid.directive';

@Component({
  selector: 'free-main-tab',
  templateUrl: './main-tab.component.html',
  styleUrls: ['./main-tab.component.scss'],
  animations: [fadeInUp]
})
export class MainTabComponent implements OnInit {

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
    GridModule
  ],
  declarations: [MainTabComponent]
})

export class MainTabModule {}
