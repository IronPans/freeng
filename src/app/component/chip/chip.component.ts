import { CommonModule } from '@angular/common';
import {
  NgModule, Component, OnInit, AfterViewInit, OnDestroy,
  Input, ViewChild, ElementRef, Renderer2, EventEmitter, Output
} from '@angular/core';

@Component({
  selector: 'free-chip-group',
  template: `
    <div class="free-chip-group" [ngClass]="chipClass">
      <free-chip *ngFor="let chip of chips" [value]="chip.value" 
        [delete]="chip.delete"></free-chip>
      <input type="text" *ngIf="placeholder" placeholder="placeholder"
             (focus)="onFocus()" (blur)="onFocus()" (keyup.enter)="onEnter($event)">
    </div>
  `,
  styleUrls: ['./chip.component.scss']
})

export class ChipGroupComponent implements OnInit {

  @Input() chips: any;
  @Output() chipsChange: EventEmitter<any> = new EventEmitter();
  @Input() placeholder: boolean;
  chipClass = {};
  focus: boolean;
  groups: ChipComponent[] = [];
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
    let i = this.groups.length;
    while (i--) {
      if (this.groups[i] === value) {
        this.groups.splice(i, 1);
      }
    }
  }

  onFocus() {
    this.focus = !this.focus;
    this.setChipClass();
  }

  onEnter(event: any) {
    this.chips.push({
      value: event.target.value,
      delete: true
    });
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
              private er: ElementRef,
              group: ChipGroupComponent) {
    this.group = group;
  }

  ngOnInit() {
    if (this.group && this.group.chips.indexOf(this.value) > 0) {
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
    const chips = this.group.groups;
    const index = chips.indexOf(this);
    if (index >= 0 ) {
      chips.splice(index, 1);
    }
    console.log(index);
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

