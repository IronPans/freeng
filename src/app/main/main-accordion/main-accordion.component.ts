import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {AccordionModule} from '../../component/accordion/accordion.component';
import {GridModule} from '../../component/grid/grid.directive';

@Component({
  selector: 'free-main-accordion',
  templateUrl: './main-accordion.component.html',
  styleUrls: ['./main-accordion.component.scss'],
  animations: [fadeInUp]
})
export class MainAccordionComponent implements OnInit {

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
    AccordionModule,
    GridModule
  ],
  declarations: [MainAccordionComponent]
})

export class MainAccordionModule {}
