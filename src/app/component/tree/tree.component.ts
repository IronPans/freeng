import { CommonModule } from '@angular/common';
import {
  NgModule, Component, Input, OnChanges, Output, EventEmitter, forwardRef, Inject,
  ElementRef, AfterViewInit
} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DomRenderer} from '../common/dom';

@Component({
  selector: 'free-echeckbox',
  template: `
    <label class="free-checkbox">
      <div class="free-checkbox-inner">
        <input type="checkbox" #rb
               [checked]="checked" name="{{checkboxName}}" (change)="onChange(rb.checked)">
        <div class="free-checkbox-ins"></div>
      </div>
    </label>
  `
})
export class ECheckboxComponent {

  @Input() checkboxName: string;
  @Input() checked: boolean;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  checkbox: HTMLInputElement;
  constructor() {
  }

  onChange(value: boolean) {
    this.checked = value;
    this.onClick.emit({
      checked: value
    });
  }
}

@Component({
  selector: 'free-tree-item',
  template: `
    <li class="free-tree-item" #item [class.open]="expanded">
      <span>
        <i class="fa fa-angle-left" (click)="toggle($event, item)"></i>
        <free-echeckbox *ngIf="selectable" (onClick)="onFoldClick($event, target)"></free-echeckbox>
        <div class="free-tree-item-inner">
          <i class="fa" [ngClass]="{'fa-folder': !isOpen, 'fa-folder-open': isOpen}"></i>
          {{title}}
        </div>
      </span>
      <ul *ngIf="folder" [@treeState]="isActive">
        <free-tree-item *ngFor="let f of folder" title="{{f.title}}" [selectable]="selectable"
                        [file]="f?.file"  [folder]="f?.folder" [expanded]="f.expanded"></free-tree-item>
      </ul>
      <ul *ngIf="file" [@treeState]="isActive">
        <li *ngFor="let f of file; index as i" class="last" (click)="onClick(f)">
          <span>
            <free-echeckbox *ngIf="selectable" (onClick)="onFileClick($event, target, i)"></free-echeckbox>
            <i class="fa {{f.type || 'fa-file-word-o'}}"></i>
            {{f.title}}
          </span>
        </li>
      </ul>
    </li>
  `,
  animations: [
    trigger('treeState', [
      state('active', style({
        height: '*'
      })),
      state('inactive', style({
        height: 0
      })),
      transition('active <=> inactive', animate('.25s ease'))
    ])
  ]
})

export class TreeItemComponent implements AfterViewInit, OnChanges {

  @Input() title: string;
  @Input() folder: any;
  @Input() file: any;
  // @Input() selectable: boolean;
  selectable: boolean;
  @Input() expanded: boolean;
  @Input() expandedIcon: string;
  @Input() collapsedIcon: string;
  @Input() index: number;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  isActive: string;
  isOpen: boolean;
  target: any;
  constructor(@Inject(forwardRef(() => TreeComponent)) private tree: TreeComponent,
              private er: ElementRef) {
    this.isActive = 'inactive';
  }

  ngAfterViewInit() {
    this.target = this.er.nativeElement;
  }

  ngOnChanges() {
    if (this.expanded) {
      this.isActive = 'active';
      this.isOpen = true;
    }
  }

  toggle(event: any, item) {
    event.stopPropagation();
    const cl = item.classList;
    cl.toggle('open');
    this.isOpen = !this.isOpen;
    this.isActive = this.isOpen ? 'active' : 'inactive';
  }

  onClick(item: any) {
    this.onSelect.emit(item);
  }

  onFoldClick(event, item) {
    this.tree.getSelection(item);
  }

  onFileClick(event, item, index) {
    this.tree.getSelection(item, index);
  }
}

@Component({
  selector: 'free-tree',
  template: `
    <div class="free-tree">
      <ul>
       <free-tree-item *ngFor="let menu of menus;index as i" [index]="i" title="{{menu.title}}"
                       [selectable]="selectable"
                     [file]="menu?.file"  [folder]="menu?.folder" [expanded]="menu.expanded">
       </free-tree-item>
      </ul>
    </div>`,
  providers: [DomRenderer]
})

export class TreeComponent {
  @Input() menus: any;
  @Input() selectable: boolean;
  selected: any;
  constructor(private domRenderer: DomRenderer) {
    this.selected = [];
  }

  getSelection(item, index?: number) {
    const selected = [];
    this.selected = [];
    while (item && !this.domRenderer.hasClass(item, 'free-tree')) {
      const itemIndex = this.getItemIndex(item);
      this.selected.unshift({
        type: index ? 'file' : 'folder',
        index: itemIndex
      });
      item = this.getItem(item.parentNode);
    }
    if (typeof index !== 'undefined') {
      this.selected.push({
        type: 'file',
        index: index
      });
    }
    let label = this.menus;
    const first = this.selected[0];
    selected.push(label[first['index']].title);
    label = label[first['index']][first['type']];
    this.selected.forEach((v, k) => {
      const next = this.selected[k + 1];
      if (next) {
        selected.push(label[next.index].title);
        label = label[next.index][next.type];
      }
    });
    console.log(selected);
  }

  getItem(item) {
    while (item) {
      if (this.domRenderer.hasClass(item, 'free-tree-item')) {
        item = item.parentNode;
        break;
      }
      item = item.parentNode;
    }
    return item;
  }

  getItemIndex(item) {
    const items = item.parentNode.querySelectorAll('free-tree-item');
    let index;
    for (let i = 0; i < items.length; i++) {
      if (items[i] === item) {
        index = i;
      }
    }
    return index;
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [ECheckboxComponent, TreeItemComponent, TreeComponent],
  exports: [ECheckboxComponent, TreeItemComponent, TreeComponent]
})

export class TreeModule {}
