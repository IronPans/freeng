import {Component, OnInit, HostBinding, NgModule, Renderer2 } from '@angular/core';
import { fadeInUp } from '../../component/common/animations';
import {PanelModule} from '../../component/panel/panel.component';
import {CommonModule} from '@angular/common';
import {GridModule} from '../../component/grid/grid.directive';
import { config } from '../../common/config';

@Component({
  selector: 'free-main-color',
  templateUrl: './main-color.component.html',
  styleUrls: ['./main-color.component.scss'],
  animations: [fadeInUp]
})
export class MainColorComponent implements OnInit {

  @HostBinding('@fadeInUpState') state;
  @HostBinding('style.display') display = 'block';
  theme = [];
  constructor(private renderer2: Renderer2) { }

  ngOnInit() {
    this.theme = config.theme;
  }

  selectTheme(value: string) {
    const className = document.body.className;
    const theme = /free-theme-2/.test(className);
    document.body.className = theme ? 'free-theme-2' : '';
    this.renderer2.addClass(document.body, `free-${value}`);
  }

}
@NgModule({
  imports: [
    CommonModule,
    PanelModule,
    GridModule
  ],
  declarations: [MainColorComponent]
})

export class MainColorModule {}
