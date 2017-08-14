import {AfterViewInit, Component, ElementRef, Input, NgModule, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'free-column',
  template: `
    <div class="free-column" #container>
      <ng-content></ng-content>
    </div>
  `
})

export class ColumnComponent implements OnInit, AfterViewInit {

  @Input() columns: any;
  @ViewChild('container') containerViewChild: ElementRef;
  container: HTMLDivElement;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.container = this.containerViewChild.nativeElement;
    if (this.columns && typeof this.columns === 'object') {
      for (const name in this.columns) {
        if (this.columns.hasOwnProperty(name)) {
          this.addPrefix(this.container, name, this.columns[name]);
        }
      }
    }
  }

  addPrefix(element, attr, value): void {
    const prefix = ['Webkit', 'Moz'];
    let uattr = attr.split('');
    uattr[0] = uattr[0].toUpperCase();
    uattr = uattr.join('');
    prefix.forEach((x) => {
      element.style[x + uattr] = value;
    });
    element.style[attr] = value;
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [ColumnComponent],
  exports: [ColumnComponent]
})
export class ColumnModule {}
