import {AfterViewInit, Component, ElementRef, Input, NgModule, OnInit, Renderer2, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'free-sidebar',
  template: `
    <aside class="free-sidebar" #container>
      <div class="free-sidebar-wrapper">
        <ng-content></ng-content>
      </div>
    </aside>
  `,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  _open: boolean;
  @ViewChild('container') container: ElementRef;
  @Input() direction = 'left';
  @Input() top: any;
  @Input()
  set open(value: boolean) {
    this._open = value;
    const con = this.container.nativeElement;
    if (this._open) {
      this.renderer2.addClass(con, 'free-sidebar-active');
    } else {
      this.renderer2.removeClass(con, 'free-sidebar-active');
    }
  }

  get open(): boolean {
    return this._open;
  }
  constructor(private renderer2: Renderer2) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const con = this.container.nativeElement;
    this.renderer2.addClass(con, `free-sidebar-${this.direction}`);

    if (this.top) {
      this.renderer2.setStyle(con, 'top', `${this.top}px`);
    }
  }

}

@NgModule({
  imports: [CommonModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent]
})

export class SidebarModule {}
