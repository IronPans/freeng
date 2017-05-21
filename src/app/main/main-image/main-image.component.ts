import {Component, HostBinding, NgModule, OnInit} from '@angular/core';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {GridModule} from '../../component/grid/grid.directive';
import {fadeInUp} from '../../component/common/animations';

@Component({
  selector: 'free-main-image',
  templateUrl: './main-image.component.html',
  styleUrls: ['./main-image.component.scss'],
  animations: [fadeInUp]
})
export class MainImageComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  constructor() { }

  ngOnInit() {
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
  declarations: [MainImageComponent]
})

export class MainImageModule {}
