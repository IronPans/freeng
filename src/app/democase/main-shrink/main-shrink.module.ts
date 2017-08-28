import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {ShrinkModule} from '../../component/shrink/shrink.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainShrinkRoutingModule} from './main-shrink-routing.module';
import {MainShrinkComponent} from './main-shrink.component';
import {LanguageModule} from '../common/language';

@NgModule({
  imports: [
    CommonModule,
    MainShrinkRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    ShrinkModule,
    GridModule,
    LanguageModule
  ],
  declarations: [MainShrinkComponent]
})

export class MainShrinkModule {}
