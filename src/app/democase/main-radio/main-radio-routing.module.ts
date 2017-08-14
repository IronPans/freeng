/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainRadioComponent} from './main-radio.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainRadioComponent}
  ])],
  exports: [RouterModule]
})

export class MainRadioRoutingModule {}
