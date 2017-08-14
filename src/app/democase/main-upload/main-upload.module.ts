import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridModule} from '../../component/grid/grid.directive';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {UploadModule} from '../../component/upload/upload.component';
import {MainUploadRoutingModule} from './main-upload-routing.module';
import {MainUploadComponent} from './main-upload.component';

@NgModule({
  imports: [
    CommonModule,
    MainUploadRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    UploadModule
  ],
  declarations: [MainUploadComponent]
})

export class MainUploadModule {}
