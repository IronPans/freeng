import {Component, HostBinding, NgModule, OnInit} from '@angular/core';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {PopoverModule} from '../../component/popover/popover.component';
import {ShareModule} from '../../component/common/share';
import {GridModule} from '../../component/grid/grid.directive';
import {fadeInUp} from '../../component/common/animations';

@Component({
  selector: 'free-main-popover',
  templateUrl: './main-popover.component.html',
  styleUrls: ['./main-popover.component.scss'],
  animations: [fadeInUp]
})
export class MainPopoverComponent implements OnInit {

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
    PopoverModule,
    ShareModule,
    GridModule
  ],
  declarations: [MainPopoverComponent]
})

export class MainPopoverModule {}
