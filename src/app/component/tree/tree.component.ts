import {
  NgModule,
  Component,
  Input,
  AfterContentInit,
  OnDestroy,
  Output,
  EventEmitter,
  OnInit,
  EmbeddedViewRef,
  ViewContainerRef,
  ContentChildren,
  QueryList,
  TemplateRef,
  Inject,
  forwardRef
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShareModule} from '../common/share';
import {FreeTemplateDirective} from '../common/share';

export interface TreeNode {
  label?: string;
  data?: any;
  type?: string;
  icon?: any;
  expandedIcon?: any;
  collapsedIcon?: any;
  leaf?: boolean;
  expanded?: boolean;
  parent?: TreeNode;
  partialSelected?: boolean;
  style?: string,
  styleClass?: string;
  selectable?: boolean;
  children?: TreeNode[];
}

@Component({
  selector: 'free-template-loader',
  template: ``
})
export class TreeNodeLoaderComponent implements OnInit, OnDestroy {

  @Input() node: any;
  @Input() template: TemplateRef<any>;
  view: EmbeddedViewRef<any>;

  constructor(public viewContainer: ViewContainerRef) {
  }

  ngOnInit() {
    this.view = this.viewContainer.createEmbeddedView(this.template, {
      '\$implicit': this.node
    });
  }

  ngOnDestroy() {
    this.view.destroy();
  }
}

@Component({
  selector: 'free-tree-node',
  template: `
    <ng-template [ngIf]="node">
      <li [ngClass]="['free-treenode',node.styleClass||'', isLeaf() ? 'free-treenode-leaf': '']">
        <div class="free-treenode-content" (click)="onNodeClick($event)" (touchend)="onNodeTouchEnd()"
             [ngClass]="{'free-treenode-selectable':tree.selectionMode &&
             node.selectable !== false,'free-treenode-content-selected':isSelected()}">
                    <span class="free-tree-toggler fa fa-fw"
                          [ngClass]="{'fa-caret-right':!node.expanded,'fa-caret-down':node.expanded}"
                          (click)="toggle($event)"></span>
          <div class="free-tree-checkbox" *ngIf="tree.selectionMode == 'checkbox'">
            <div class="free-tree-checkbox-box">
                    <span class="free-tree-checkbox-icon fa"
                              [ngClass]="{'fa-check':isSelected(),'fa-minus':node.partialSelected}">
                        </span>
            </div>
          </div>
          <span [class]="getIcon()" *ngIf="node.icon||node.expandedIcon||node.collapsedIcon"></span>
          <span class="free-treenode-label" [ngClass]="{'free-selected-highlight':isSelected()}">
            <span *ngIf="!tree.getTemplateForNode(node)">{{node.label}}</span>
            <span *ngIf="tree.getTemplateForNode(node)">
              <free-template-loader [node]="node" [template]="tree.getTemplateForNode(node)">
                                </free-template-loader>
            </span>
          </span>
        </div>
        <ul class="free-treenode-children" style="display: none;" *ngIf="node.children && node.expanded"
            [style.display]="node.expanded ? 'block' : 'none'">
          <free-tree-node *ngFor="let childNode of node.children;let index=index"
                          [node]="childNode" [parentNode]="node" [index]="index"></free-tree-node>
        </ul>
      </li>
    </ng-template>
  `
})
export class TreeNodeComponent implements OnInit {

  static ICON_CLASS = 'fa fa-fw';

  @Input() node: TreeNode;

  @Input() parentNode: TreeNode;

  @Input() index: number;

  constructor(@Inject(forwardRef(() => TreeComponent)) public tree: TreeComponent) {
  }

  ngOnInit() {
    this.node.parent = this.parentNode;
  }

  getIcon() {
    let icon: string;

    if (this.node.icon) {
      icon = this.node.icon;
    } else {
      icon = this.node.expanded && this.node.children && this.node.children.length ?
        this.node.expandedIcon : this.node.collapsedIcon;
    }

    return TreeNodeComponent.ICON_CLASS + ' ' + icon;
  }

  isLeaf() {
    return this.node.leaf === false ? false : !(this.node.children && this.node.children.length);
  }

  toggle(event: Event) {
    if (this.node.expanded) {
      this.tree.onNodeCollapse.emit({originalEvent: event, node: this.node});
    } else {
      this.tree.onNodeExpand.emit({originalEvent: event, node: this.node});
    }

    this.node.expanded = !this.node.expanded
  }

  onNodeClick(event: MouseEvent) {
    this.tree.onNodeClick(event, this.node);
  }

  onNodeTouchEnd() {
    this.tree.onNodeTouchEnd();
  }

  isSelected() {
    return this.tree.isSelected(this.node);
  }
}

@Component({
  selector: 'free-tree',
  template: `
    <div [ngClass]="{'free-tree':true,'free-tree-selectable':selectionMode,'free-tree-loading': loading}"
         [ngStyle]="style" [class]="styleClass">
      <div class="free-tree-loading-mask" *ngIf="loading"></div>
      <div class="free-tree-loading-content" *ngIf="loading">
        <i [class]="'fa fa-pulse fa-2x ' + loadingIcon"></i>
      </div>
      <ul class="free-tree-inner" *ngIf="value">
        <free-tree-node *ngFor="let node of value;let index=index" [node]="node" [index]="index">
        </free-tree-node>
      </ul>
      <div class="free-tree-empty-message" *ngIf="!loading && !value">{{emptyMessage}}</div>
    </div>
  `
})
export class TreeComponent implements AfterContentInit {

  @Input() value: TreeNode[];

  @Input() selectionMode: string;

  @Input() selection: any;

  @Input() style: any;

  @Input() styleClass: string;

  @Input() metaKeySelection = true;

  @Input() loading: boolean;

  @Input() loadingIcon: string;

  @Input() emptyMessage: string;

  @Input() passSelectedUp = true;

  @Input() passSelectedDown = true;

  @Output() selectionChange: EventEmitter<any> = new EventEmitter();

  @Output() onNodeSelect: EventEmitter<any> = new EventEmitter();

  @Output() onNodeUnselect: EventEmitter<any> = new EventEmitter();

  @Output() onNodeExpand: EventEmitter<any> = new EventEmitter();

  @Output() onNodeCollapse: EventEmitter<any> = new EventEmitter();

  @ContentChildren(FreeTemplateDirective) templates: QueryList<any>;

  public templateMap: any;

  public nodeTouched: boolean;

  constructor() {
    this.loadingIcon = 'fa-spinner';
    this.emptyMessage = 'No records found';
  }

  ngAfterContentInit() {
    if (this.templates.length) {
      this.templateMap = {};
    }

    this.templates.forEach((item) => {
      this.templateMap[item.name] = item.template;
    });
  }

  onNodeClick(event: MouseEvent, node: TreeNode) {
    const eventTarget = event.target;

    if (eventTarget['className'] && eventTarget['className'].indexOf('free-tree-toggler') === 0) {
      return;
    } else if (this.selectionMode) {
      if (node.selectable === false) {
        return;
      }

      const index = this.findIndexInSelection(node);
      const selected = (index >= 0);

      if (this.isCheckboxSelectionMode()) {
        if (selected) {
          if (this.passSelectedDown) {
            this.passDown(node, false);
          } else {
            this.selection = this.selection.filter((val, i) => i !== index);
          }

          if (this.passSelectedUp && node.parent) {
            this.passUp(node.parent, false);
          }

          this.selectionChange.emit(this.selection);
          this.onNodeUnselect.emit({originalEvent: event, node: node});
        } else {
          if (this.passSelectedDown) {
            this.passDown(node, true);
          } else {
            this.selection = [...this.selection || [], node];
          }

          if (this.passSelectedUp && node.parent) {
            this.passUp(node.parent, true);
          }

          this.selectionChange.emit(this.selection);
          this.onNodeSelect.emit({originalEvent: event, node: node});
        }
      } else {
        const metaSelection = this.nodeTouched ? false : this.metaKeySelection;

        if (metaSelection) {
          const metaKey = (event.metaKey || event.ctrlKey);

          if (selected && metaKey) {
            if (this.isSingleSelectionMode()) {
              this.selectionChange.emit(null);
            } else {
              this.selection = this.selection.filter((val, i) => i !== index);
              this.selectionChange.emit(this.selection);
            }

            this.onNodeUnselect.emit({originalEvent: event, node: node});
          } else {
            if (this.isSingleSelectionMode()) {
              this.selectionChange.emit(node);
            } else if (this.isMultipleSelectionMode()) {
              this.selection = (!metaKey) ? [] : this.selection || [];
              this.selection = [...this.selection, node];
              this.selectionChange.emit(this.selection);
            }

            this.onNodeSelect.emit({originalEvent: event, node: node});
          }
        } else {
          if (this.isSingleSelectionMode()) {
            if (selected) {
              this.selection = null;
              this.onNodeUnselect.emit({originalEvent: event, node: node});
            } else {
              this.selection = node;
              this.onNodeSelect.emit({originalEvent: event, node: node});
            }
          } else {
            if (selected) {
              this.selection = this.selection.filter((val, i) => i !== index);
              this.onNodeUnselect.emit({originalEvent: event, node: node});
            } else {
              this.selection = [...this.selection || [], node];
              this.onNodeSelect.emit({originalEvent: event, node: node});
            }
          }

          this.selectionChange.emit(this.selection);
        }
      }
    }

    this.nodeTouched = false;
  }

  onNodeTouchEnd() {
    this.nodeTouched = true;
  }

  findIndexInSelection(node: TreeNode) {
    let index: number = -1;

    if (this.selectionMode && this.selection) {
      if (this.isSingleSelectionMode()) {
        index = (this.selection === node) ? 0 : -1;
      } else {
        for (let i = 0; i < this.selection.length; i++) {
          if (this.selection[i] === node) {
            index = i;
            break;
          }
        }
      }
    }

    return index;
  }

  passUp(node: TreeNode, select: boolean) {
    if (node.children && node.children.length) {
      let selectedCount = 0;
      let childPartialSelected = false;
      for (const child of node.children) {
        if (this.isSelected(child)) {
          selectedCount++;
        } else if (child.partialSelected) {
          childPartialSelected = true;
        }
      }

      if (select && selectedCount === node.children.length) {
        this.selection = [...this.selection || [], node];
        node.partialSelected = false;
      } else {
        if (!select) {
          const index = this.findIndexInSelection(node);
          if (index >= 0) {
            this.selection = this.selection.filter((val, i) => i !== index);
          }
        }

        node.partialSelected = (childPartialSelected ||
        selectedCount > 0 && selectedCount !== node.children.length);
      }
    }

    const parent = node.parent;
    if (parent) {
      this.passUp(parent, select);
    }
  }

  passDown(node: TreeNode, select: boolean) {
    const index = this.findIndexInSelection(node);

    if (select && index === -1) {
      this.selection = [...this.selection || [], node];
    } else if (!select && index > -1) {
      this.selection = this.selection.filter((val, i) => i !== index);
    }

    node.partialSelected = false;

    if (node.children && node.children.length) {
      for (const child of node.children) {
        this.passDown(child, select);
      }
    }
  }

  isSelected(node: TreeNode) {
    return this.findIndexInSelection(node) !== -1;
  }

  isSingleSelectionMode() {
    return this.selectionMode && this.selectionMode === 'single';
  }

  isMultipleSelectionMode() {
    return this.selectionMode && this.selectionMode === 'multiple';
  }

  isCheckboxSelectionMode() {
    return this.selectionMode && this.selectionMode === 'checkbox';
  }

  getTemplateForNode(node: TreeNode): TemplateRef<any> {
    if (this.templateMap) {
      return node.type ? this.templateMap[node.type] : this.templateMap['default'];
    } else {
      return null;
    }
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [TreeComponent, TreeNodeComponent, TreeNodeLoaderComponent],
  exports: [TreeComponent, ShareModule]
})
export class TreeModule {
}
