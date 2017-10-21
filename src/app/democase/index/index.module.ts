import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {IndexComponent} from './index.component';
import {ListModule} from '../../component/list/list.component';
import {SidenavModule} from '../../component/sidenav/sidenav.component';
import {ShrinkModule} from '../../component/shrink/shrink.component';
import {BadgeModule} from '../../component/badge/badge.component';
import {RippleModule} from '../../component/ripple/ripple.directive';
import {GridModule} from '../../component/grid/grid.directive';
import {HamburgeModule} from '../../component/hamburge/hamburge.component';
import {DropdownModule} from '../../component/dropdown/dropdown.component';
import {AccordionModule} from '../../component/accordion/accordion.component';
import {IconModule} from '../../component/icon/icon.component';
import {ScrollModule} from '../../component/scroll/scroll.component';
import {ButtonModule} from '../../component/button/button.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {IndexRoutingModule} from './index-routing.module';
import {PanelModule} from '../../component/panel/panel.component';
import {LanguageModule} from '../common/language';
import {ImageModule} from '../../component/image/image.component';
import {BackTopModule} from '../../component/back-top/back-top.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    IndexRoutingModule,
    ButtonModule,
    ScrollModule,
    IconModule,
    AccordionModule,
    DropdownModule,
    HamburgeModule,
    GridModule,
    RippleModule,
    BadgeModule,
    ShrinkModule,
    SidenavModule,
    ListModule,
    PanelModule,
    ImageModule,
    BackTopModule,
    LanguageModule
  ],
  declarations: [
    IndexComponent
  ]
})
export class IndexModule {}
