import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IndexComponent} from './index.component';
import {ListModule} from '../../component/list/list.component';
import {SidebarModule} from '../../component/sidebar/sidebar.component';
import {ShrinkModule} from '../../component/shrink/shrink.component';
import {BadgeModule} from '../../component/badge/badge.component';
import {RippleModule} from '../../component/ripple/ripple.directive';
import {GridModule} from '../../component/grid/grid.directive';
import {ShareModule} from '../../component/common/share';
import {HamburgeModule} from '../../component/hamburge/hamburge.component';
import {DropdownModule} from '../../component/dropdown/dropdown.component';
import {AccordionModule} from '../../component/accordion/accordion.component';
import {IconModule} from '../../component/icon/icon.component';
import {RouterModule} from '@angular/router';
import {ButtonModule} from '../../component/button/button.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {IndexRoutingModule} from './index-routing.module';
import {PanelModule} from '../../component/panel/panel.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    IndexRoutingModule,
    ButtonModule,
    IconModule,
    AccordionModule,
    DropdownModule,
    HamburgeModule,
    ShareModule,
    GridModule,
    RippleModule,
    BadgeModule,
    ShrinkModule,
    SidebarModule,
    ListModule,
    PanelModule
  ],
  declarations: [
    IndexComponent
  ]
})
export default class IndexModule {}
