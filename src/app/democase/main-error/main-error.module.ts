import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridModule} from '../../component/grid/grid.directive';
import {IconModule} from '../../component/icon/icon.component';
import {MainErrorRoutingModule} from './main-error-routing.module';
import {MainErrorComponent} from './main-error.component';

@NgModule({
  imports: [
    CommonModule,
    MainErrorRoutingModule,
    GridModule,
    IconModule
  ],
  declarations: [MainErrorComponent]
})

export class MainErrorModule {}
