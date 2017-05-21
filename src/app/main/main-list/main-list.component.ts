import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {IconModule} from '../../component/icon/icon.component';
import {ListModule} from '../../component/list/list.component';
import {ImageModule} from '../../component/image/image.component';
import {GridModule} from '../../component/grid/grid.directive';

@Component({
  selector: 'free-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.scss'],
  animations: [fadeInUp]
})
export class MainListComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  pageTitle: string;
  constructor() {
    this.pageTitle = 'Component-List-FreeNG';
  }

  ngOnInit() {
  }

}

@NgModule({
  imports: [
    CommonModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    IconModule,
    ListModule,
    ImageModule,
    GridModule
  ],
  declarations: [MainListComponent]
})

export class MainListModule {}
