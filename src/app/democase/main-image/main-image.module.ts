import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainImageRoutingModule} from './main-image-routing.module';
import {MainImageComponent} from './main-image.component';
import {LanguageModule} from '../common/language';

@NgModule({
  imports: [
    CommonModule,
    MainImageRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    LanguageModule
  ],
  declarations: [MainImageComponent]
})

export class MainImageModule {}
