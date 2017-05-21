import {Component, OnInit, HostBinding, NgModule} from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {PanelModule} from '../../component/panel/panel.component';
import {GridModule} from '../../component/grid/grid.directive';
import {CommonModule} from '@angular/common';
import {TableModule} from "../../component/table/table.component";

@Component({
  selector: 'free-main-changelog',
  templateUrl: './main-changelog.component.html',
  styleUrls: ['./main-changelog.component.scss'],
  animations: [fadeInUp]
})
export class MainChangelogComponent implements OnInit {

  @HostBinding('@fadeInUpState') fadeInUpState;
  @HostBinding('style.display') display = 'block';
  constructor() { }

  ngOnInit() {
  }
}
@NgModule({
  imports: [
    CommonModule,
    PanelModule,
    GridModule,
    TableModule
  ],
  declarations: [MainChangelogComponent]
})

export class MainChangelogModule {}
