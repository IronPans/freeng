/**
 * Created by tg on 17-4-3.
 */
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Component } from '@angular/core';

@Component({
  selector: 'f-header',
  template: '<ng-content></ng-content>'
})

export class HeaderComponent {}

@Component({
  selector: 'f-footer',
  template: '<ng-content></ng-content>'
})

export class FooterComponent {}

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule],
  declarations: [ HeaderComponent, FooterComponent ],
  exports: [HeaderComponent, FooterComponent]
})

export class ShareModule {}
