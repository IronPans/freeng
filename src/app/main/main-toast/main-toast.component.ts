import {Component, NgModule, OnInit} from '@angular/core';
import {GridModule} from '../../component/grid/grid.directive';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'free-main-toast',
  templateUrl: './main-toast.component.html',
  styleUrls: ['./main-toast.component.scss']
})
export class MainToastComponent implements OnInit {

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
  declarations: [MainToastComponent]
})

export class MainToastModule { }
