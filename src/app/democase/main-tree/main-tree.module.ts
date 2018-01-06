import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {GridModule} from '../../component/grid/grid.directive';
import {TreeModule} from '../../component/tree/tree.component';
import {MainTreeRoutingModule} from './main-tree-routing.module';
import {MainTreeComponent} from './main-tree.component';
import {LanguageModule} from '../common/language';
import {ButtonModule} from '../../component/button/button.directive';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MainTreeRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    TreeModule,
    ButtonModule,
    LanguageModule
  ],
  declarations: [MainTreeComponent]
})

export class MainTreeModule {}
