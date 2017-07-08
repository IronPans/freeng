import { CommonModule } from '@angular/common';
import {
  NgModule, Component, OnInit, AfterViewInit, OnDestroy,
  Input, ViewChild, ElementRef, Renderer2, EventEmitter, Output
} from '@angular/core';

@Component({
  selector: 'free-chip-group',
  template: `
    <div class="free-chip-group" [ngClass]="chipClass">
      <free-chip *ngFor="let chip of value" [value]="chip.value"
        [delete]="chip.delete"></free-chip>
      <input spellcheck="false" type="text" *ngIf="placeholder" placeholder="placeholder"
             (focus)="onFocus()" (blur)="onFocus()" (keyup.enter)="onEnter($event)">
    </div>
  `,
  styleUrls: ['./chip.component.scss']
})

export class ChipGroupComponent implements OnInit {

  @Input()
  set chips(value: any) {
    this.value = [];
    for (const v of value) {
      const isExited = this.value.find((elem, index, array) => {
        return elem.value === v.value;
      });
      if (!isExited) {
        this.value.push(v);
      }
    }
  }

  get chips(): any {
    return this.value;
  }

  @Output() chipsChange: EventEmitter<any> = new EventEmitter();
  @Input() placeholder: boolean;
  chipClass = {};
  focus: boolean;
  groups: ChipComponent[] = [];
  value: any[] = [];
  constructor() {}

  ngOnInit() {
    this.setChipClass();
  }

  setChipClass() {
    this.chipClass = {
      'free-chip-input': this.placeholder,
      'free-chip-focus': this.focus
    };
  }

  addGroup(value: ChipComponent) {
    this.groups.push(value);
  }

  removeGroup(value: ChipComponent) {
    const index = this.value.findIndex((elem, i, array) => {
      return elem.value === value.value;
    });
    if (index !== -1) {
      this.groups.splice(index, 1);
      this.value.splice(index, 1);
      this.chipsChange.emit(this.value);
    }
  }

  onFocus() {
    this.focus = !this.focus;
    this.setChipClass();
  }

  onEnter(event: any) {
    const value = event.target.value.trim();
    if (value) {
      this.chips.push({
        value: value,
        delete: true
      });
      this.chips = this.chips.slice();
      event.target.value = '';
    }
  }
}

@Component({
  selector: 'free-chip',
  template: `
    <div class="free-chip" tabindex="0" #container>
      {{value}}  <i class="fa fa-times-circle delete-btn" *ngIf="delete" (click)="onDelete()"></i>
    </div>
  `
})
export class ChipComponent implements OnInit, AfterViewInit, OnDestroy {

  protected group: ChipGroupComponent;
  @Input() value: any;
  @Input() delete: boolean;
  @ViewChild('container') container: ElementRef;
  constructor(private renderer2: Renderer2,
              group: ChipGroupComponent) {
    this.group = group;
  }

  ngOnInit() {
    if (this.group) {
      this.group.addGroup(this);
    }
  }

  ngAfterViewInit() {
    if (this.delete) {
      this.renderer2.addClass(this.container.nativeElement, 'free-chip-delete');
    } else {
      this.renderer2.removeClass(this.container.nativeElement, 'free-chip-delete');
    }
  }

  onDelete() {
    if (this.group) {
      this.group.removeGroup(this);
    }
  }

  ngOnDestroy() {
    if (this.group) {
      this.group.removeGroup(this);
    }
  }

}

@NgModule({
  imports: [CommonModule],
  declarations: [ChipComponent, ChipGroupComponent],
  exports: [ChipComponent, ChipGroupComponent]
})

export class ChipModule {}

