import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainCropperComponent} from './main-cropper.component';
import {MainCropperRoutingModule} from './main-cropper-routing.module';
import {CropperModule} from '../../component/cropper/cropper.component';
import {ButtonModule} from '../../component/button/button.directive';
import {LanguageModule} from '../common/language';

@NgModule({
  imports: [
    CommonModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    CropperModule,
    ButtonModule,
    MainCropperRoutingModule,
    LanguageModule
  ],
  declarations: [MainCropperComponent]
})

export class MainCropperModule {}

