import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {GridModule} from '../../component/grid/grid.directive';

@Component({
  selector: 'free-main-typography',
  templateUrl: './main-typography.component.html',
  styleUrls: ['./main-typography.component.scss'],
  animations: [fadeInUp]
})
export class MainTypographyComponent implements OnInit {

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
    GridModule
  ],
  declarations: [MainTypographyComponent]
})

export class MainTypographyModule {}
