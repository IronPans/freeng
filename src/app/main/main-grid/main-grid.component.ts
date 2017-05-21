import {Component, HostBinding, NgModule, OnInit} from '@angular/core';
import {GridModule} from '../../component/grid/grid.directive';
import {fadeInUp} from '../../component/common/animations';
import {TableModule} from '../../component/table/table.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CodeModule} from '../../component/code/code.component';

@Component({
  selector: 'free-main-grid',
  templateUrl: './main-grid.component.html',
  styleUrls: ['./main-grid.component.scss'],
  animations: [fadeInUp]
})
export class MainGridComponent implements OnInit {

  @HostBinding('@fadeInUpState') state;
  @HostBinding('style.display') display = 'block';
  constructor() { }

  ngOnInit() {
  }

}

@NgModule({
  imports: [
    GridModule,
    TableModule,
    TabGroupModule,
    CodeModule
  ],
  declarations: [MainGridComponent]
})

export class MainGridModule {}
