import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MainDraggableComponent} from './main-draggable.component';
@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainDraggableComponent}
  ])],
  exports: [RouterModule]
})
export class MainDraggableRoutingModule {}
