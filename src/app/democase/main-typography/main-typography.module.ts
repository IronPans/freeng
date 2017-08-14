import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainTypographyRoutingModule} from './main-typography-routing.module';
import {MainTypographyComponent} from './main-typography.component';

@NgModule({
  imports: [
    CommonModule,
    MainTypographyRoutingModule,
    TabGroupModule,
    CodeModule,
    GridModule
  ],
  declarations: [MainTypographyComponent]
})

export class MainTypographyModule {}
