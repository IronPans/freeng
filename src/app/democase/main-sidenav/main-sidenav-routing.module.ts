
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MainSidenavComponent} from './main-sidenav.component';
@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', component: MainSidenavComponent}
    ])
  ],
  exports: [RouterModule]
})
export class MainSidenavRoutingModule {}
