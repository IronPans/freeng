import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {GridModule} from '../../component/grid/grid.directive';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {MainMediaComponent} from './main-media.component';
import {MainMediaRoutingModule} from './main-media-routing.module';
import {MediaModule} from '../../component/media/media.component';
import {LanguageModule} from '../common/language';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    MainMediaRoutingModule,
    MediaModule,
    LanguageModule
  ],
  declarations: [MainMediaComponent]
})
export class MainMediaModule {}
