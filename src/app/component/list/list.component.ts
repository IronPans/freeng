import { CommonModule } from '@angular/common';
import {NgModule, Component, OnInit, AfterViewInit, Input,
  ElementRef, ViewChild, Renderer2} from '@angular/core';

@Component({
  selector: 'free-list',
  template: `<div class="free-list" #list><ng-content></ng-content></div>`,
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {

  @Input() hover: boolean;
  @Input() line: boolean;
  @ViewChild('list') list: ElementRef;
  constructor(private renderer2: Renderer2) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const list = this.list.nativeElement;
    if (this.hover) {
      this.renderer2.addClass(list, 'free-list-hover');
    }

    if (this.line) {
      this.renderer2.addClass(list, 'free-list-line');
    }
  }

}

@Component({
  selector: 'free-list-item',
  template: `
    <a class="free-list-item">
      <ng-content select="free-icon"></ng-content>
      <ng-content select="free-avatar"></ng-content>
      <div class="free-list-content"><ng-content></ng-content></div>
      <ng-content select="[fButton]"></ng-content>
    </a>
  `
})

export class ListItemComponent {
  constructor() {}
}

@Component({
  selector: 'free-avatar',
  template:  `<div class="free-avatar" #avatar><ng-content select="free-image"></ng-content></div>`
})

export class ListAvatarComponent implements AfterViewInit {
  @Input() large: boolean;
  @ViewChild('avatar') avatar: ElementRef;
  constructor(private renderer2: Renderer2) {}

  ngAfterViewInit() {
    if (this.large) {
      this.renderer2.addClass(this.avatar.nativeElement, 'free-avatar-large');
    }
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [ListAvatarComponent, ListItemComponent, ListComponent],
  exports: [ListAvatarComponent, ListItemComponent, ListComponent]
})

export class ListModule {}
