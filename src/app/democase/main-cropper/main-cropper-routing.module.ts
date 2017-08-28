import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainCropperComponent} from './main-cropper.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainCropperComponent}
  ])],
  exports: [RouterModule]
})

export class MainCropperRoutingModule {}
