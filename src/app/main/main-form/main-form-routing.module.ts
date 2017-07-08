
import {RouterModule} from '@angular/router';
import {MainFormComponent} from './main-form.component';
import {NgModule} from '@angular/core';
@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainFormComponent}
  ])],
  exports: [RouterModule]
})

export class MainFormRoutingModule {}
