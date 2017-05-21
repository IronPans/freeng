import {Component, OnInit, HostBinding, OnDestroy, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {RadioModule} from '../../component/radio/radio.component';
import {GridModule} from '../../component/grid/grid.directive';

@Component({
  selector: 'free-main-radio',
  templateUrl: './main-radio.component.html',
  styleUrls: ['./main-radio.component.scss'],
  animations: [fadeInUp]
})
export class MainRadioComponent implements OnInit, OnDestroy {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  abc = 'none';
  constructor() { }

  ngOnInit() {
    console.log(1);
  }

  ngOnDestroy() {
    console.log(2);
  }

}
@NgModule({
  imports: [
    CommonModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    RadioModule,
    GridModule
  ],
  declarations: [MainRadioComponent]
})

export class MainRadioModule {}
