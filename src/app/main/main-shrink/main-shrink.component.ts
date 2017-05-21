import {Component, NgModule, OnInit} from '@angular/core';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {ShrinkModule} from '../../component/shrink/shrink.component';
import {GridModule} from '../../component/grid/grid.directive';

@Component({
  selector: 'free-main-shrink',
  templateUrl: './main-shrink.component.html',
  styleUrls: ['./main-shrink.component.scss']
})
export class MainShrinkComponent implements OnInit {

  menus: any;
  constructor() {
    this.menus = [
      { 'icon': 'user'},
      { 'icon': 'user'},
      { 'icon': 'user'}
    ];
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
    ShrinkModule,
    GridModule
  ],
  declarations: [MainShrinkComponent]
})

export class MainShrinkModule {}
