import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainChipComponent} from './main-chip.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainChipComponent}
  ])],
  exports: [RouterModule]
})

export class MainChipRoutingModule {}
