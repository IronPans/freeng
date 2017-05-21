import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {ModalModule} from '../../component/modal/modal.component';
import {GridModule} from '../../component/grid/grid.directive';

@Component({
  selector: 'free-main-modal',
  templateUrl: './main-modal.component.html',
  styleUrls: ['./main-modal.component.scss'],
  animations: [fadeInUp]
})
export class MainModalComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  visible: boolean;
  blueVisible: boolean;
  lightblueVisible: boolean;
  yellowVisible: boolean;
  greenVisible: boolean;
  redVisible: boolean;

  maskVisible: boolean;
  maskVisible2: boolean;
  constructor() { }

  ngOnInit() {
  }

  open() {
    this.visible = !this.visible;
  }
}

@NgModule({
  imports: [
    CommonModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    ModalModule,
    GridModule
  ],
  declarations: [MainModalComponent]
})

export class MainModalModule {}
