import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {GridModule} from '../../component/grid/grid.directive';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {ButtonModule} from '../../component/button/button.directive';
import {MainNotificationRoutingModule} from './main-notification-routing.module';
import {MainNotificationComponent} from './main-notification.component';
import {NotificationModule} from '../../component/notification/notification.component';
import {SelectModule} from '../../component/select/select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MainNotificationRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    ButtonModule,
    SelectModule,
    NotificationModule
  ],
  declarations: [MainNotificationComponent]
})

export class MainNotificationModule { }
