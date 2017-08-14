import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MainRippleComponent} from './main-ripple.component';
@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', component: MainRippleComponent}
    ])
  ],
  exports: [RouterModule]
})
export class MainRippleRoutingModule {}
