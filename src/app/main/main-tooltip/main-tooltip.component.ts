import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CodeModule} from '../../component/code/code.component';
import {GridModule} from '../../component/grid/grid.directive';
import {TooltipModule} from '../../component/tooltip/tooltip.directive';
import {TableModule} from '../../component/table/table.component';

@Component({
  selector: 'free-main-tooltip',
  templateUrl: './main-tooltip.component.html',
  styleUrls: ['./main-tooltip.component.scss'],
  animations: [fadeInUp]
})
export class MainTooltipComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  constructor() { }

  ngOnInit() {
  }
}

@NgModule({
  imports: [
    TabGroupModule,
    CodeModule,
    GridModule,
    TooltipModule,
    TableModule
  ],
  declarations: [MainTooltipComponent]
})

export class MainTooltipModule {}
