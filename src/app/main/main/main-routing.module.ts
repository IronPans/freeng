import {MainComponent} from './main.component';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: MainComponent }
    ])
  ],
  exports: [RouterModule]
})

export default class MainRoutingModule {
}
