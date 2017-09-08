import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {GridModule} from '../../component/grid/grid.directive';
import {LanguageModule} from '../common/language';
import {MainShareButtonRoutingModule} from './main-share-button-routing.module';
import {MainShareButtonComponent} from './main-share-button.component';
import {ShareButtonModule} from '../../component/share-button/share-button.component';

@NgModule({
  imports: [
    CommonModule,
    MainShareButtonRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    ShareButtonModule,
    LanguageModule
  ],
  declarations: [MainShareButtonComponent]
})

export class MainShareButtonModule {}
