import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {CommonModule} from '@angular/common';
import {ShareModule} from '../../component/common/share';
import {AccordionModule} from '../../component/accordion/accordion.component';
import {PanelModule} from '../../component/panel/panel.component';
import {GridModule} from '../../component/grid/grid.directive';

@Component({
  selector: 'free-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [fadeInUp]
})
export class MainComponent implements OnInit {
  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  constructor() { }

  ngOnInit() {
  }
}

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    AccordionModule,
    PanelModule,
    GridModule
  ],
  declarations: [MainComponent]
})

export class MainModule {}
