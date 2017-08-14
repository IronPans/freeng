
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainUploadComponent} from './main-upload.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainUploadComponent}
  ])],
  exports: [RouterModule]
})


export class MainUploadRoutingModule {}
