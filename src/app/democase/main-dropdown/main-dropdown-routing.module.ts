/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainDropdownComponent} from './main-dropdown.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainDropdownComponent}
  ])],
  exports: [RouterModule]
})

export class MainDropdownRoutingModule {}
