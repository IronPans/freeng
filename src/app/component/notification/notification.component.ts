import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'free-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
@NgModule({
  imports: [CommonModule],
  declarations: [NotificationComponent],
  exports: [NotificationComponent]
})

export class NotificationModule {}
