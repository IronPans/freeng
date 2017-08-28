import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CalendarModule} from '../../component/calendar/calendar.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainCalendarRoutingModule} from './main-calendar-routing.module';
import {MainCalendarComponent} from './main-calendar.component';
import {LanguageModule} from '../common/language';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MainCalendarRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    CalendarModule,
    GridModule,
    LanguageModule
  ],
  declarations: [MainCalendarComponent]
})

export class MainCalendarModule {}
