import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {MainEditorComponent} from './main-editor.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', component: MainEditorComponent}
    ])
  ],
  exports: [RouterModule]
})
export class MainEditorRoutingModule { }
