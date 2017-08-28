import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MainCascaderComponent} from './main-cascader.component';
import {MainCascaderRoutingModule} from './main-cascader-routing.module';
import {GridModule} from '../../component/grid/grid.directive';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CascaderModule} from '../../component/cascader/cascader.component';
import {LanguageModule} from '../common/language';

@NgModule({
  imports: [
    CommonModule,
    MainCascaderRoutingModule,
    FormsModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    CascaderModule,
    LanguageModule
  ],
  declarations: [MainCascaderComponent]
})

export class MainCascaderModule {}
