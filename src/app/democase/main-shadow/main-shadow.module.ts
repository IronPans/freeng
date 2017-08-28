import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridModule} from '../../component/grid/grid.directive';
import {MainShadowRoutingModule} from './main-shadow-routing.module';
import {MainShadowComponent} from './main-shadow.component';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {LanguageModule} from '../common/language';

@NgModule({
  imports: [
    CommonModule,
    MainShadowRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    LanguageModule
  ],
  declarations: [MainShadowComponent]
})

export class MainShadowModule {}
