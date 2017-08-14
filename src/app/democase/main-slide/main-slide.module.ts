import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CodeModule} from '../../component/code/code.component';
import {TableModule} from '../../component/table/table.component';
import {SlideModule} from '../../component/slides/slides.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainSlideRoutingModule} from './main-slide-routing.module';
import {MainSlideComponent} from './main-slide.component';

@NgModule({
  imports: [
    CommonModule,
    MainSlideRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    SlideModule,
    GridModule
  ],
  declarations: [MainSlideComponent]
})

export class MainSlideModule {}
