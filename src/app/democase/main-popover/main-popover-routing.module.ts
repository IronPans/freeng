import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainPopoverComponent} from './main-popover.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainPopoverComponent}
  ])],
  exports: [RouterModule]
})

export class MainPopoverRoutingModule {}
