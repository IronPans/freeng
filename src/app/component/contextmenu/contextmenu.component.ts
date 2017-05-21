import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'free-contextmenu',
  templateUrl: './contextmenu.component.html',
  styleUrls: ['./contextmenu.component.scss']
})
export class ContextmenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
@NgModule({
  imports: [CommonModule],
  declarations: [ContextmenuComponent],
  exports: [ContextmenuComponent]
})

export class ContextmenuModule {}
