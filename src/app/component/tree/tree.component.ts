import { CommonModule } from '@angular/common';
import {NgModule, Component, OnInit, Input, OnChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'free-tree-item',
  template: `
    <li class="free-tree-item">
      <span (click)="toggle($event)">{{title}}</span>
      <ul *ngIf="folder" [@treeState]="isActive">
        <free-tree-item *ngFor="let f of folder" title="{{f.title}}"
                        [file]="f?.file"  [folder]="f?.folder" [expanded]="f.expanded"></free-tree-item>
      </ul>
      <ul *ngIf="file" [@treeState]="isActive">
        <li *ngFor="let f of file" class="last" (click)="f?.click(f)"><span>{{f.title}}</span></li>
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

export class TreeItemComponent implements OnChanges {

  @Input() title: string;
  @Input() folder: any;
  @Input() file: any;
  @Input() expanded: boolean;
  isActive: string;
  isOpen: boolean;
  constructor() {
    this.isActive = 'inactive';
  }

  ngOnChanges() {
    console.log(this.expanded);
    if (this.expanded) {
      this.isActive = 'active';
      this.isOpen = true;
    }
  }

  toggle(event: any) {
    event.stopPropagation();
    const cl = event.target.parentNode.classList;
    cl.toggle('open');
    this.isOpen = !this.isOpen;
    this.isActive = this.isOpen ? 'active' : 'inactive';
  }
}

@Component({
  selector: 'free-tree',
  template: `
    <div class="free-tree">
      <ul>
       <free-tree-item *ngFor="let menu of menus" title="{{menu.title}}"
                     [file]="menu?.file"  [folder]="menu?.folder" [expanded]="menu.expanded"></free-tree-item>
      </ul>
    </div>`,
  styleUrls: ['./tree.component.scss']
})

export class TreeComponent implements OnInit {
  @Input() menus: any;
  constructor() { }
  ngOnInit() {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [TreeItemComponent, TreeComponent],
  exports: [TreeItemComponent, TreeComponent]
})

export class TreeModule {}
