import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {SwitchModule} from '../../component/switch/switch.component';
import {GridModule} from '../../component/grid/grid.directive';

@Component({
  selector: 'free-main-switch',
  templateUrl: './main-switch.component.html',
  styleUrls: ['./main-switch.component.scss'],
  animations: [fadeInUp]
})
export class MainSwitchComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  constructor() { }

  ngOnInit() {
  }

  onChange(event: any) {
    alert('是否选中：' + event.target.checked);
  }

}
@NgModule({
  imports: [
    CommonModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    SwitchModule,
    GridModule
  ],
  declarations: [MainSwitchComponent]
})

export class MainSwitchModule {}
