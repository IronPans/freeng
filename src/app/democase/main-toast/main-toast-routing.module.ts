
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainToastComponent} from './main-toast.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainToastComponent}
  ])],
  exports: [RouterModule]
})

export class MainToastRoutingModule {}
