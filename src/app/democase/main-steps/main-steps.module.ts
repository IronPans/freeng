import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {GridModule} from '../../component/grid/grid.directive';
import {LanguageModule} from '../common/language';
import {MainStepsComponent} from './main-steps.component';
import {MainStepsRoutingModule} from './main-steps-routing.module';
import {StepsModule} from '../../component/steps/steps.component';
import {ButtonModule} from '../../component/button/button.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    MainStepsRoutingModule,
    GridModule,
    StepsModule,
    ButtonModule,
    LanguageModule
  ],
  declarations: [MainStepsComponent]
})

export class MainStepsModule {}
