import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridModule} from '../../component/grid/grid.directive';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {LanguageModule} from '../common/language';
import {MainValidationRoutingModule} from './main-validation-routing.module';
import {MainValidationComponent} from './main-validation.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputtextModule} from '../../component/inputtext/inputtext.component';
import {ButtonModule} from '../../component/button/button.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    LanguageModule,
    InputtextModule,
    ButtonModule,
    MainValidationRoutingModule
  ],
  declarations: [MainValidationComponent]
})

export class MainValidationModule {}
