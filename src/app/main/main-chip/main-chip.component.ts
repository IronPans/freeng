import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {ChipModule} from '../../component/chip/chip.component';
import {GridModule} from '../../component/grid/grid.directive';

@Component({
  selector: 'free-main-chip',
  templateUrl: './main-chip.component.html',
  styleUrls: ['./main-chip.component.scss'],
  animations: [fadeInUp]
})
export class MainChipComponent implements OnInit {
  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  animals: any[];
  citys: any[];
  constructor() { }

  ngOnInit() {
    this.animals = [
      {'value': 'chip'},
      {'value': 'chip'},
      {'value': 'chip'},
      {'value': 'chip'}
    ];

    this.citys = [
      {'value': 'chip1', 'delete': true},
      {'value': 'chip2', 'delete': true},
      {'value': 'chip3', 'delete': true},
      {'value': 'chip4', 'delete': true},
    ];
  }

}
@NgModule({
  imports: [
    CommonModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    ChipModule,
    GridModule
  ],
  declarations: [MainChipComponent]
})

export class MainChipModule {}
