import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainPanelComponent} from './main-panel.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainPanelComponent}
  ])],
  exports: [RouterModule]
})

export class MainPanelRoutingModule {}
