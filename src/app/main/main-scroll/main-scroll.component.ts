import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {PanelModule} from '../../component/panel/panel.component';
import {ScrollModule} from '../../component/scroll/scroll.component';
import {GridModule} from '../../component/grid/grid.directive';

@Component({
  selector: 'free-main-scroll',
  templateUrl: './main-scroll.component.html',
  styleUrls: ['./main-scroll.component.scss'],
  animations: [fadeInUp]
})
export class MainScrollComponent implements OnInit {

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
    PanelModule,
    ScrollModule,
    GridModule
  ],
  declarations: [MainScrollComponent]
})

export class MainScrollModule {}
