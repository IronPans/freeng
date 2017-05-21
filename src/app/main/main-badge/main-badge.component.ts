import {Component, HostBinding, NgModule, OnInit} from '@angular/core';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {GridModule} from '../../component/grid/grid.directive';
import {BadgeModule} from '../../component/badge/badge.component';
import {fadeInUp} from '../../component/common/animations';
import {IconModule} from '../../component/icon/icon.component';

@Component({
  selector: 'free-main-badge',
  templateUrl: './main-badge.component.html',
  styleUrls: ['./main-badge.component.scss'],
  animations: [fadeInUp]
})
export class MainBadgeComponent implements OnInit {

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
    GridModule,
    BadgeModule,
    IconModule
  ],
  declarations: [MainBadgeComponent]
})

export class MainBadgeModule {}
