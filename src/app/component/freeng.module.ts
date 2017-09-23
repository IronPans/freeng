import {ModuleWithProviders, NgModule} from '@angular/core';
import {AccordionModule} from './accordion/accordion.component';
import {BadgeModule} from './badge/badge.component';
import {BreadcrumbModule} from './breadcrumb/breadcrumb.component';
import {CodeModule} from './code/code.component';
import {UploadModule} from './upload/upload.component';
import {TreeModule} from './tree/tree.component';
import {TooltipModule} from './tooltip/tooltip.directive';
import {ToastModule} from './toast/toast.component';
import {TimelineModule} from './timeline/timeline.component';
import {TableModule} from './table/table.component';
import {TabGroupModule} from './tab/tab.component';
import {SwitchModule} from './switch/switch.component';
import {SpinnerModule} from './spinner/spinner.component';
import {SlideModule} from './slides/slides.component';
import {SidenavModule} from './sidenav/sidenav.component';
import {ShrinkModule} from './shrink/shrink.component';
import {SelectModule} from './select/select.component';
import {ScrollModule} from './scroll/scroll.component';
import {RippleModule} from './ripple/ripple.directive';
import {RatingModule} from './rating/rating.component';
import {RangeModule} from './range/range.component';
import {RadioModule} from './radio/radio.component';
import {ProgressModule} from './progress/progress.component';
import {InputtextModule} from './inputtext/inputtext.component';
import {ImageModule} from './image/image.component';
import {IconModule} from './icon/icon.component';
import {HamburgeModule} from './hamburge/hamburge.component';
import {GridModule} from './grid/grid.directive';
import {EditorModule} from './editor/editor.component';
import {DropdownModule} from './dropdown/dropdown.component';
import {DraggableModule} from './draggable/draggable.component';
import {DatatableModule} from './datatable/datatable.component';
import {ContextmenuModule} from './contextmenu/contextmenu.component';
import {ColorPickerModule} from './colorpicker/colorpicker.component';
import {ChipModule} from './chip/chip.component';
import {CheckboxModule} from './checkbox/checkbox.component';
import {CascaderModule} from './cascader/cascader.component';
import {CardModule} from './card/card.component';
import {CalendarModule} from './calendar/calendar.component';
import {ButtonModule} from './button/button.directive';
import {ListModule} from './list/list.component';
import {LoadingModule} from './loading/loading.component';
import {MaskModule} from './mask/mask.component';
import {ModalModule} from './modal/modal.component';
import {NotificationModule} from './notification/notification.component';
import {PaginationModule} from './pagination/pagination.component';
import {ParticleModule} from './particle/particle.directive';
import {PanelModule} from './panel/panel.component';
import {ShareModule} from './common/share';
import {CropperModule} from './cropper/cropper.component';
import {MediaModule} from './media/media.component';
import {ChartModule} from './chart/chart.component';
import {FlowModule} from './flow/flow.component';
import { ShareButtonModule } from './share-button/share-button.component';
import {DomRenderer} from './common/dom';

export {AccordionModule} from './accordion/accordion.component';
export {BadgeModule} from './badge/badge.component';
export {BreadcrumbModule} from './breadcrumb/breadcrumb.component';
export {ButtonModule} from './button/button.directive';
export {CalendarModule} from './calendar/calendar.component';
export {CardModule} from './card/card.component';
export {CascaderModule} from './cascader/cascader.component';
export {CheckboxModule} from './checkbox/checkbox.component';
export {ChipModule} from './chip/chip.component';
export {ColorPickerModule} from './colorpicker/colorpicker.component';
export {ContextmenuModule} from './contextmenu/contextmenu.component';
export {DatatableModule} from './datatable/datatable.component';
export {DraggableModule} from './draggable/draggable.component';
export {DropdownModule} from './dropdown/dropdown.component';
export {EditorModule} from './editor/editor.component';
export {GridModule} from './grid/grid.directive';
export {HamburgeModule} from './hamburge/hamburge.component';
export {IconModule} from './icon/icon.component';
export {ImageModule} from './image/image.component';
export {InputtextModule} from './inputtext/inputtext.component';
export {ListModule} from './list/list.component';
export {LoadingModule} from './loading/loading.component';
export {MaskModule} from './mask/mask.component';
export {ModalModule} from './modal/modal.component';
export {NotificationModule} from './notification/notification.component';
export {PaginationModule} from './pagination/pagination.component';
export {PanelModule} from './panel/panel.component';
export {ParticleModule} from './particle/particle.directive';
export {ProgressModule} from './progress/progress.component';
export {RadioModule} from './radio/radio.component';
export {RangeModule} from './range/range.component';
export {RatingModule} from './rating/rating.component';
export {RippleModule} from './ripple/ripple.directive';
export {ScrollModule} from './scroll/scroll.component';
export {SelectModule} from './select/select.component';
export {ShrinkModule} from './shrink/shrink.component';
export {SidenavModule} from './sidenav/sidenav.component';
export {SlideModule} from './slides/slides.component';
export {SpinnerModule} from './spinner/spinner.component';
export {SwitchModule} from './switch/switch.component';
export {TabGroupModule} from './tab/tab.component';
export {TableModule} from './table/table.component';
export {TimelineModule} from './timeline/timeline.component';
export {ToastModule} from './toast/toast.component';
export {TooltipModule} from './tooltip/tooltip.directive';
export {TreeModule} from './tree/tree.component';
export {UploadModule} from './upload/upload.component';
export {CodeModule} from './code/code.component';
export {ShareModule} from './common/share';
export {CropperModule} from './cropper/cropper.component';
export {MediaModule} from './media/media.component';
export {ChartModule} from './chart/chart.component';
export {FlowModule} from './flow/flow.component';
export {ShareButtonModule} from './share-button/share-button.component';
export {DomRenderer} from './common/dom';

@NgModule({
  exports: [
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CascaderModule,
    CheckboxModule,
    ChipModule,
    ColorPickerModule,
    ContextmenuModule,
    DatatableModule,
    DraggableModule,
    DropdownModule,
    EditorModule,
    GridModule,
    HamburgeModule,
    IconModule,
    ImageModule,
    InputtextModule,
    ListModule,
    LoadingModule,
    MaskModule,
    ModalModule,
    NotificationModule,
    PaginationModule,
    PanelModule,
    ParticleModule,
    ProgressModule,
    RadioModule,
    RangeModule,
    RatingModule,
    RippleModule,
    ScrollModule,
    SelectModule,
    ShrinkModule,
    SidenavModule,
    SlideModule,
    SpinnerModule,
    SwitchModule,
    TabGroupModule,
    TableModule,
    TimelineModule,
    ToastModule,
    TooltipModule,
    TreeModule,
    UploadModule,
    ChartModule,
    CodeModule,
    ShareModule,
    CropperModule,
    MediaModule,
    FlowModule,
    ShareButtonModule
  ]
})
export class FreengModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FreengModule,
      providers: [
        DomRenderer
      ]
    };
  }
}
