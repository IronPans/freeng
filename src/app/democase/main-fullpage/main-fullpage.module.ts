
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {InputtextModule} from '../../component/inputtext/inputtext.component';
import {GridModule} from '../../component/grid/grid.directive';
import {TableModule} from '../../component/table/table.component';
import {MainFullpageComponent} from './main-fullpage.component';
import {MainFullpageRoutingModule} from './main-fullpage-routing.module';
import {ButtonModule} from '../../component/button/button.directive';
import {RouterModule} from '@angular/router';
import {LanguageModule} from '../common/language';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    InputtextModule,
    GridModule,
    ButtonModule,
    MainFullpageRoutingModule,
    LanguageModule
  ],
  declarations: [MainFullpageComponent]
})

export class MainFullpageModule {}
