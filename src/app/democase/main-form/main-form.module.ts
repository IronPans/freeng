import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {CommonModule} from '@angular/common';
import {InputtextModule} from '../../component/inputtext/inputtext.component';
import {GridModule} from '../../component/grid/grid.directive';
import {NgModule} from '@angular/core';
import {MainFormComponent} from './main-form.component';
import {MainFormRoutingModule} from './main-form-routing.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MainFormRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    InputtextModule,
    GridModule
  ],
  declarations: [MainFormComponent]
})

export class MainFormModule {}
