/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainCalendarComponent} from './main-calendar.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainCalendarComponent}
  ])],
  exports: [RouterModule]
})

export class MainCalendarRoutingModule {}
