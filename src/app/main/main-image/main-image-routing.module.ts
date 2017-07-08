
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainImageComponent} from './main-image.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainImageComponent}
  ])],
  exports: [RouterModule]
})

export class MainImageRoutingModule {}
