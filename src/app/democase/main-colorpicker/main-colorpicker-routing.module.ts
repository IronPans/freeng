import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MainColorpickerComponent} from './main-colorpicker.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainColorpickerComponent}
  ])],
  exports: [RouterModule]
})
export class MainColorpickerRoutingModule {}
