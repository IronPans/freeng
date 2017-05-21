import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {CheckboxModule} from '../../component/checkbox/checkbox.component';
import {GridModule} from '../../component/grid/grid.directive';
import { config } from '../../common/config';
import {ButtonModule} from '../../component/button/button.directive';

@Component({
  selector: 'free-main-checkbox',
  templateUrl: './main-checkbox.component.html',
  styleUrls: ['./main-checkbox.component.scss'],
  animations: [fadeInUp]
})
export class MainCheckboxComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  theme = [];
  constructor() { }

  ngOnInit() {
    this.theme = config.theme;
  }

}
@NgModule({
  imports: [
    CommonModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    CheckboxModule,
    GridModule,
    ButtonModule
  ],
  declarations: [MainCheckboxComponent]
})

export class MainCheckboxModule {}
