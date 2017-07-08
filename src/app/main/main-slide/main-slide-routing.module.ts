
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainSlideComponent} from './main-slide.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainSlideComponent}
  ])],
  exports: [RouterModule]
})

export class MainSlideRoutingModule {}
