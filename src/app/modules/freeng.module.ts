/**
 * Created by root on 17-5-12.
 */
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import { ShareModule } from '../component/common/share';
import { AccordionModule } from '../component/accordion/accordion.component';
import { RangeModule } from '../component/range/range.component';
import { PanelModule } from '../component/panel/panel.component';
import { TabGroupModule } from '../component/tab/tab.component';
import { DropdownModule } from '../component/dropdown/dropdown.component';
import { TooltipModule } from '../component/tooltip/tooltip.directive';
import { ToastModule } from '../component/toast/toast.component';
import { LoadingModule } from '../component/loading/loading.component';
import { InputtextModule } from '../component/inputtext/inputtext.component';
import { ModalModule } from '../component/modal/modal.component';
import { ProgressModule } from '../component/progress/progress.component';
import { BreadcrumbModule } from '../component/breadcrumb/breadcrumb.component';
import { RadioModule } from '../component/radio/radio.component';
import { CheckboxModule } from '../component/checkbox/checkbox.component';
import { TableModule } from '../component/table/table.component';
import { CardModule } from '../component/card/card.component';
import { ImageModule } from '../component/image/image.component';
import { RatingModule } from '../component/rating/rating.component';
import { ShrinkModule } from '../component/shrink/shrink.component';
import { ListModule } from '../component/list/list.component';
import { IconModule } from '../component/icon/icon.component';
import { MaskModule } from '../component/mask/mask.component';
import { SelectModule } from '../component/select/select.component';
import { ChipModule } from '../component/chip/chip.component';
import { SwitchModule } from '../component/switch/switch.component';
import { HamburgeModule } from '../component/hamburge/hamburge.component';
import { SpinnerModule } from '../component/spinner/spinner.component';

import { ButtonModule } from '../component/button/button.directive';
import { RippleModule } from '../component/ripple/ripple.directive';
import { GridModule } from '../component/grid/grid.directive';
import { CodeModule } from '../component/code/code.component';
import {FileModule} from '../component/file/file.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShareModule,
    CheckboxModule,
    RippleModule,
    GridModule,
    SwitchModule,
    CodeModule,
    PanelModule,
    ModalModule,
    IconModule,
    RadioModule,
    RangeModule,
    DropdownModule,
    TooltipModule,
    ToastModule,
    LoadingModule,
    RatingModule,
    TabGroupModule,
    SpinnerModule,
    ProgressModule,
    InputtextModule,
    AccordionModule,
    ImageModule,
    ButtonModule,
    ShrinkModule,
    ListModule,
    SelectModule,
    MaskModule,
    ChipModule,
    TableModule,
    CardModule,
    BreadcrumbModule,
    HamburgeModule,
    FileModule
  ]
})
export class FreeNGModule { }
