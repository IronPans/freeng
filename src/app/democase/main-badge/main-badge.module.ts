import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {GridModule} from '../../component/grid/grid.directive';
import {BadgeModule} from '../../component/badge/badge.component';
import {IconModule} from '../../component/icon/icon.component';
import {MainBadgeRoutingModule} from './main-badge-routing.module';
import {MainBadgeComponent} from './main-badge.component';
import {ButtonModule} from '../../component/button/button.directive';
import {LanguageModule} from '../common/language';

@NgModule({
  imports: [
    CommonModule,
    MainBadgeRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    GridModule,
    ButtonModule,
    BadgeModule,
    IconModule,
    LanguageModule
  ],
  declarations: [MainBadgeComponent]
})

export class MainBadgeModule {}
