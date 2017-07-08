/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainSpinnerComponent} from './main-spinner.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainSpinnerComponent}
  ])],
  exports: [RouterModule]
})

export class MainSpinnerRoutingModule {}
