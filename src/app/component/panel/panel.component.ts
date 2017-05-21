import {CommonModule} from '@angular/common';
import { NgModule, Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'free-panel',
  template: `
    <div class="free-panel" [ngClass]="panelClass">
      <div class="free-panel-header">
        <span *ngIf="header">{{header}}</span>
        <ng-content select="f-header"></ng-content>
      </div>
      <div class="free-panel-content">
        <div class="free-panel-inner">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  @Input() header: string;
  @Input() theme: string;
  panelClass;
  constructor() { }

  ngOnInit() {
    this.panelClass = {
      'theme-black': (this.theme === 'black' ? true : false)
    };
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [PanelComponent],
  exports: [PanelComponent]
})

export class PanelModule {}
