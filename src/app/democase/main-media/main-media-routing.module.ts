import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainMediaComponent} from './main-media.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainMediaComponent}
  ])],
  exports: [RouterModule]
})


export class MainMediaRoutingModule {}
