import {Component, NgModule, OnInit} from '@angular/core';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {SelectModule} from '../../component/select/select.component';
import {PanelModule} from '../../component/panel/panel.component';
import {GridModule} from '../../component/grid/grid.directive';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'free-main-select',
  templateUrl: './main-select.component.html',
  styleUrls: ['./main-select.component.scss']
})
export class MainSelectComponent implements OnInit {

  options: any;
  selectedOption: any;
  test: any;
  constructor() { }

  ngOnInit() {
    this.options = [
      { label: 'just a city for select!just a city for select', value: '2'},
      { label: 'city2', value: '2'},
      { label: 'city3', value: '2'},
      { label: 'city4', value: '2'},
      { label: 'city5', value: '2'},
      { label: 'city6', value: '2'},
      { label: 'city7', value: '2'},
      { label: 'city8', value: '2'}
    ];
  }

  onChange($event) {
    console.log($event);
    console.log(this.test);
  }

}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    SelectModule,
    PanelModule,
    GridModule
  ],
  declarations: [MainSelectComponent]
})

export class MainSelectModule {}
