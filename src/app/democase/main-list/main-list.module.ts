import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {IconModule} from '../../component/icon/icon.component';
import {ListModule} from '../../component/list/list.component';
import {ImageModule} from '../../component/image/image.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainListRoutingModule} from './main-list-routing.module';
import {MainListComponent} from './main-list.component';
import {ButtonModule} from '../../component/button/button.directive';
import {LanguageModule} from '../common/language';

@NgModule({
  imports: [
    CommonModule,
    MainListRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    IconModule,
    ListModule,
    ButtonModule,
    ImageModule,
    GridModule,
    LanguageModule
  ],
  declarations: [MainListComponent]
})

export class MainListModule {}
