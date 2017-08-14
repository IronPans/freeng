import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainEditorRoutingModule} from './main-editor-routing.module';
import {MainEditorComponent} from './main-editor.component';
import {GridModule} from '../../component/grid/grid.directive';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {EditorModule} from '../../component/editor/editor.component';
import {FormsModule} from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MainEditorRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    EditorModule
  ],
  declarations: [MainEditorComponent]
})
export class MainEditorModule {}
