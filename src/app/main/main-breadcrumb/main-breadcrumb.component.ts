import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {BreadcrumbModule} from '../../component/breadcrumb/breadcrumb.component';
import {GridModule} from '../../component/grid/grid.directive';

@Component({
  selector: 'free-main-breadcrumb',
  templateUrl: './main-breadcrumb.component.html',
  styleUrls: ['./main-breadcrumb.component.scss'],
  animations: [fadeInUp]
})
export class MainBreadcrumbComponent implements OnInit {

  menus: any;
  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  constructor() { }

  ngOnInit() {
    this.menus = [
      {'name': '首页'},
      {'name': '面包屑'},
      {'name': '面包屑'}
    ];
  }

}
@NgModule({
  imports: [
    CommonModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    BreadcrumbModule,
    GridModule
  ],
  declarations: [MainBreadcrumbComponent]
})

export class MainBreadcrumbModule {}
