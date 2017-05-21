import {Component, HostBinding, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {IconModule} from '../../component/icon/icon.component';
import {GridModule} from '../../component/grid/grid.directive';
import {fadeInUp} from '../../component/common/animations';

@Component({
  selector: 'free-main-icon',
  templateUrl: './main-icon.component.html',
  styleUrls: ['./main-icon.component.scss'],
  animations: [fadeInUp]
})
export class MainIconComponent implements OnInit {

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
    IconModule,
    GridModule
  ],
  declarations: [MainIconComponent]
})

export class MainIconModule {}
