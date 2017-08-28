import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {IconModule} from '../../component/icon/icon.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainIconRoutingModule} from './main-icon-routing.module';
import {MainIconComponent} from './main-icon.component';
import {LanguageModule} from '../common/language';

@NgModule({
  imports: [
    CommonModule,
    MainIconRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    IconModule,
    GridModule,
    LanguageModule
  ],
  declarations: [MainIconComponent]
})

export class MainIconModule {}
