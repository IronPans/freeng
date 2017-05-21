import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {ButtonModule} from '../../component/button/button.directive';
import {GridModule} from '../../component/grid/grid.directive';

@Component({
  selector: 'free-main-buttons',
  templateUrl: './main-buttons.component.html',
  styleUrls: ['./main-buttons.component.scss'],
  animations: [fadeInUp]
})
export class MainButtonsComponent implements OnInit {

  msg = [];
  num = 0;
  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  pageTitle: string;
  constructor() {
    this.pageTitle = 'Components-Button-FreeNG';
  }

  ngOnInit() {
  }

  onClick() {
    this.msg.push('描述提示框' + (++this.num));
  }

}
@NgModule({
  imports: [
    CommonModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    ButtonModule,
    GridModule
  ],
  declarations: [MainButtonsComponent]
})

export class MainButtonsModule {}
