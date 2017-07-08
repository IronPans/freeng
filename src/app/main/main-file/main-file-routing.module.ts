
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainFileComponent} from './main-file.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainFileComponent}
  ])],
  exports: [RouterModule]
})


export class MainFileRoutingModule {}
