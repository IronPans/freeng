/**
 * Created by ux168 on 17-7-1.
 */

import {RouterModule} from '@angular/router';
import {MainButtonsComponent} from './main-buttons.component';
import {NgModule} from '@angular/core';
@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', component: MainButtonsComponent}
    ])
  ],
  exports: [RouterModule]
})

export class MainButtonsRoutingModule {}
