/**
 * Created by ux168 on 17-7-1.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridModule} from '../../component/grid/grid.directive';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {FileModule} from '../../component/file/file.component';
import {MainFileRoutingModule} from './main-file-routing.module';
import {MainFileComponent} from './main-file.component';

@NgModule({
  imports: [
    CommonModule,
    MainFileRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    FileModule
  ],
  declarations: [MainFileComponent]
})

export default class MainFileModule {}
