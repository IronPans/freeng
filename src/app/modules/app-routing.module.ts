/**
 * Created by tg on 17-3-26.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../main/main/main.component';
import { MainFormComponent } from '../main/main-form/main-form.component';
import { MainButtonsComponent } from '../main/main-buttons/main-buttons.component';
import { MainTabComponent} from '../main/main-tab/main-tab.component';
import { MainModalComponent } from '../main/main-modal/main-modal.component';
import { MainTooltipComponent } from '../main/main-tooltip/main-tooltip.component';
import { MainGalleryComponent } from '../main/main-gallery/main-gallery.component';
import { MainTypographyComponent } from '../main/main-typography/main-typography.component';
import { MainTableComponent } from '../main/main-table/main-table.component';
import { MainAccordionComponent } from '../main/main-accordion/main-accordion.component';
import { MainListComponent } from '../main/main-list/main-list.component';
import { MainLoadingComponent } from '../main/main-loading/main-loading.component';
import { MainScrollComponent } from '../main/main-scroll/main-scroll.component';
import { MainCalendarComponent } from '../main/main-calendar/main-calendar.component';
import { MainCardComponent } from '../main/main-card/main-card.component';
import { MainDropdownComponent } from '../main/main-dropdown/main-dropdown.component';
import { MainRangeComponent } from '../main/main-range/main-range.component';
import { MainShadowComponent } from '../main/main-shadow/main-shadow.component';
import { MainShrinkComponent } from '../main/main-shrink/main-shrink.component';
import { MainProgressComponent } from '../main/main-progress/main-progress.component';
import { MainRatingComponent } from '../main/main-rating/main-rating.component';
import { MainSelectComponent } from '../main/main-select/main-select.component';
import { MainChipComponent } from '../main/main-chip/main-chip.component';
import { MainStartComponent } from '../main/main-start/main-start.component';
import { MainColorComponent } from '../main/main-color/main-color.component';

import { IndexComponent } from '../main/index/index.component';
import { LoginComponent } from '../main/login/login.component';
import {MainCheckboxComponent} from '../main/main-checkbox/main-checkbox.component';
import {MainRadioComponent} from '../main/main-radio/main-radio.component';
import {MainSwitchComponent} from '../main/main-switch/main-switch.component';
import {MainBreadcrumbComponent} from '../main/main-breadcrumb/main-breadcrumb.component';
import {MainIconComponent} from '../main/main-icon/main-icon.component';
import {MainBadgeComponent} from '../main/main-badge/main-badge.component';
import {MainPopoverComponent} from '../main/main-popover/main-popover.component';
import {MainSpinnerComponent} from '../main/main-spinner/main-spinner.component';
import {MainChangelogComponent} from '../main/main-changelog/main-changelog.component';
import {MainTreeComponent} from '../main/main-tree/main-tree.component';
import {MainErrorComponent} from '../main/main-error/main-error.component';
import {MainImageComponent} from '../main/main-image/main-image.component';
import {MainGridComponent} from '../main/main-grid/main-grid.component';

// 子路由
const childRoutes: Routes = [
  { path: 'introduction', component: MainComponent},
  { path: 'input', component: MainFormComponent},
  { path: 'buttons', component: MainButtonsComponent},
  { path: 'tabs', component: MainTabComponent},
  { path: 'modals', component: MainModalComponent },
  { path: 'tooltips', component: MainTooltipComponent},
  { path: 'gallery', component: MainGalleryComponent },
  { path: 'typography', component: MainTypographyComponent },
  { path: 'table', component: MainTableComponent },
  { path: 'accordion', component: MainAccordionComponent },
  { path: 'list', component: MainListComponent },
  { path: 'loading', component: MainLoadingComponent },
  { path: 'scroll', component: MainScrollComponent },
  { path: 'calendar', component: MainCalendarComponent },
  { path: 'card', component: MainCardComponent },
  { path: 'dropdown', component: MainDropdownComponent },
  { path: 'range', component: MainRangeComponent },
  { path: 'shadow', component: MainShadowComponent },
  { path: 'shrink', component : MainShrinkComponent },
  { path: 'progress', component: MainProgressComponent },
  { path: 'rating', component: MainRatingComponent },
  { path: 'select', component: MainSelectComponent },
  { path: 'chip', component: MainChipComponent },
  { path: 'getting-started', component: MainStartComponent },
  { path: 'checkbox', component: MainCheckboxComponent },
  { path: 'radio', component: MainRadioComponent },
  { path: 'switch', component: MainSwitchComponent },
  { path: 'theme', component: MainColorComponent },
  { path: 'breadcrumb', component: MainBreadcrumbComponent },
  { path: 'icon', component: MainIconComponent },
  { path: 'badge', component: MainBadgeComponent },
  { path: 'popover', component: MainPopoverComponent },
  { path: 'spinner', component: MainSpinnerComponent },
  { path: 'changelog', component: MainChangelogComponent },
  { path: 'tree', component: MainTreeComponent },
  { path: 'image', component: MainImageComponent },
  { path: 'grid', component: MainGridComponent },
  { path: '', component: MainComponent},
  { path: '**', redirectTo: '/error'}
];

// 常量路由
const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'main', component: IndexComponent, children: childRoutes},
  { path: 'error', component: MainErrorComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
