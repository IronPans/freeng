import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ShareModule} from '../../component/common/share';
import {AccordionModule} from '../../component/accordion/accordion.component';
import {PanelModule} from '../../component/panel/panel.component';
import {GridModule} from '../../component/grid/grid.directive';
import {ButtonModule} from '../../component/button/button.directive';
import {TabGroupModule} from '../../component/tab/tab.component';
import {MainComponent} from './main.component';
import {MainRoutingModule} from './main-routing.module';
import {LanguageModule} from '../common/language';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MainRoutingModule,
    ShareModule,
    AccordionModule,
    PanelModule,
    GridModule,
    TabGroupModule,
    ButtonModule,
    LanguageModule
  ],
  declarations: [MainComponent]
})

export class MainModule {}
