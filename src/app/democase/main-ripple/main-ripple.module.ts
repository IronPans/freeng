import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MainRippleRoutingModule} from './main-ripple-routing.module';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainRippleComponent} from './main-ripple.component';
import {RippleModule} from '../../component/ripple/ripple.directive';

@NgModule({
  imports: [
    CommonModule,
    MainRippleRoutingModule,
    TabGroupModule,
    CodeModule,
    GridModule,
    RippleModule
  ],
  declarations: [MainRippleComponent]
})
export class MainRippleModule {}
