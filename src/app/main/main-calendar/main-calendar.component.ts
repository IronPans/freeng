import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {CalendarModule} from '../../component/calendar/calendar.component';
import {PanelModule} from '../../component/panel/panel.component';
import {GridModule} from '../../component/grid/grid.directive';

@Component({
  selector: 'free-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.scss'],
  animations: [fadeInUp]
})
export class MainCalendarComponent implements OnInit {

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
    CalendarModule,
    PanelModule,
    GridModule
  ],
  declarations: [MainCalendarComponent]
})

export class MainCalendarModule {}
