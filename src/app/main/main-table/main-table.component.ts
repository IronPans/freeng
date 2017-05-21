import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {Title} from '@angular/platform-browser';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {TableModule} from '../../component/table/table.component';
import {CommonModule} from '@angular/common';
import {GridModule} from '../../component/grid/grid.directive';

@Component({
  selector: 'free-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss'],
  animations: [fadeInUp]
})
export class MainTableComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  cells: any[] = [];
  constructor(private title: Title) {
    this.title.setTitle('FreeAngular-Table');
  }

  ngOnInit() {
    this.cells = [
      {
        'pro': 'theme',
        'intro': '设置Table主题'
      },
      {
        'pro': 'theme',
        'intro': '设置Table主题'
      },
      {
        'pro': 'theme',
        'intro': '设置Table主题'
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
    GridModule
  ],
  declarations: [MainTableComponent]
})

export class MainTableModule {}
