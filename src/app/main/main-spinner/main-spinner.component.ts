import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {GridModule} from '../../component/grid/grid.directive';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {SpinnerComponent, SpinnerModule} from "../../component/spinner/spinner.component";
import {TableModule} from "../../component/table/table.component";

@Component({
  selector: 'free-main-spinner',
  templateUrl: './main-spinner.component.html',
  styleUrls: ['./main-spinner.component.scss'],
  animations: [fadeInUp]
})
export class MainSpinnerComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';

  constructor() { }

  ngOnInit() {
  }

}
@NgModule({
  imports: [
    TabGroupModule,
    TableModule,
    CodeModule,
    GridModule,
    SpinnerModule
  ],
  declarations: [MainSpinnerComponent]
})

export class MainSpinnerModule {}
