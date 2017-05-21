import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {GridModule} from '../../component/grid/grid.directive';

@Component({
  selector: 'free-main-shadow',
  templateUrl: './main-shadow.component.html',
  styleUrls: ['./main-shadow.component.scss'],
  animations: [fadeInUp]
})
export class MainShadowComponent implements OnInit {

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
    GridModule
  ],
  declarations: [MainShadowComponent]
})

export class MainShadowModule {}
