
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainNotificationComponent} from './main-notification.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainNotificationComponent}
  ])],
  exports: [RouterModule]
})

export class MainNotificationRoutingModule {}
