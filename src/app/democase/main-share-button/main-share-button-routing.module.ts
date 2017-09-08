import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainShareButtonComponent} from './main-share-button.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainShareButtonComponent}
  ])],
  exports: [RouterModule]
})

export class MainShareButtonRoutingModule {}
