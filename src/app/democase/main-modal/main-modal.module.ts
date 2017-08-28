import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {ModalModule} from '../../component/modal/modal.component';
import {GridModule} from '../../component/grid/grid.directive';
import {ButtonModule} from '../../component/button/button.directive';
import {MainModalRoutingModule} from './main-modal-routing.module';
import {MainModalComponent} from './main-modal.component';
import {LanguageModule} from '../common/language';

@NgModule({
  imports: [
    CommonModule,
    MainModalRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    ModalModule,
    GridModule,
    ButtonModule,
    LanguageModule
  ],
  declarations: [MainModalComponent]
})

export class MainModalModule {}
