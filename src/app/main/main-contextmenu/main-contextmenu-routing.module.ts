import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainContextmenuComponent} from './main-contextmenu.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainContextmenuComponent}
  ])],
  exports: [RouterModule]
})

export class MainContextRoutingModule {}
