import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {GridModule} from '../../component/grid/grid.directive';
import {TreeModule} from '../../component/tree/tree.component';

@Component({
  selector: 'free-main-tree',
  templateUrl: './main-tree.component.html',
  styleUrls: ['./main-tree.component.scss'],
  animations: [fadeInUp]
})

export class MainTreeComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  menus = [];
  constructor() { }

  ngOnInit() {
    this.menus = [
      {
        title: '菜单',
        folder: [
          {
            title: '子菜单',
            file: [
              {
                title: '孙菜单'
              }
            ]
          }
        ]
      },
      {
        title: '菜单',
        file: [
          {
            title: '子菜单'
          }
        ]
      }
    ];
  }

}
@NgModule({
  imports: [
    CommonModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    TreeModule
  ],
  declarations: [MainTreeComponent]
})

export class MainTreeModule {}
