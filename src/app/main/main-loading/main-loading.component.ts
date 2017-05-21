import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {LoadingModule} from '../../component/loading/loading.component';
import {GridModule} from '../../component/grid/grid.directive';

@Component({
  selector: 'free-main-loading',
  templateUrl: './main-loading.component.html',
  styleUrls: ['./main-loading.component.scss'],
  animations: [fadeInUp]
})
export class MainLoadingComponent implements OnInit {

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
    LoadingModule,
    GridModule
  ],
  declarations: [MainLoadingComponent]
})

export class MainLoadingModule {}
