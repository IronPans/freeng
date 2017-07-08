import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index.component';
import {NgModule} from '@angular/core';

const childRoutes: Routes = [
  {path: 'introduction', loadChildren: '../main/main.module'},
  {path: 'input', loadChildren: '../main-form/main-form.module'},
  {path: 'buttons', loadChildren: '../main-buttons/main-buttons.module'},
  {path: 'tabs', loadChildren: '../main-tab/main-tab.module'},
  {path: 'modals', loadChildren: '../main-modal/main-modal.module'},
  {path: 'tooltips', loadChildren: '../main-tooltip/main-tooltip.module'},
  {path: 'typography', loadChildren: '../main-typography/main-typography.module'},
  {path: 'table', loadChildren: '../main-table/main-table.module'},
  {path: 'accordion', loadChildren: '../main-accordion/main-accordion.module'},
  {path: 'list', loadChildren: '../main-list/main-list.module'},
  {path: 'loading', loadChildren: '../main-loading/main-loading.module'},
  {path: 'card', loadChildren: '../main-card/main-card.module'},
  {path: 'dropdown', loadChildren: '../main-dropdown/main-dropdown.module'},
  {path: 'range', loadChildren: '../main-range/main-range.module'},
  {path: 'shadow', loadChildren: '../main-shadow/main-shadow.module'},
  {path: 'shrink', loadChildren: '../main-shrink/main-shrink.module'},
  {path: 'progress', loadChildren: '../main-progress/main-progress.module'},
  {path: 'rating', loadChildren: '../main-rating/main-rating.module'},
  {path: 'select', loadChildren: '../main-select/main-select.module'},
  {path: 'chip', loadChildren: '../main-chip/main-chip.module'},
  {path: 'getting-started', loadChildren: '../main-start/main-start.module'},
  {path: 'checkbox', loadChildren: '../main-checkbox/main-checkbox.module'},
  {path: 'radio', loadChildren: '../main-radio/main-radio.module'},
  {path: 'switch', loadChildren: '../main-switch/main-switch.module'},
  {path: 'theme',  loadChildren: '../main-color/main-color.module'},
  {path: 'breadcrumb', loadChildren: '../main-breadcrumb/main-breadcrumb.module'},
  {path: 'icon', loadChildren: '../main-icon/main-icon.module'},
  {path: 'badge', loadChildren: '../main-badge/main-badge.module'},
  {path: 'spinner', loadChildren: '../main-spinner/main-spinner.module'},
  {path: 'changelog', loadChildren: '../main-changelog/main-changelog.module'},
  {path: 'tree', loadChildren: '../main-tree/main-tree.module'},
  {path: 'image', loadChildren: '../main-image/main-image.module'},
  {path: 'grid', loadChildren: '../main-grid/main-grid.module'},
  {path: 'toast', loadChildren: '../main-toast/main-toast.module'},
  {path: 'file', loadChildren: '../main-file/main-file.module'},
  {path: 'pagination', loadChildren: '../main-pagination/main-pagination.module'},
  {path: 'slide', loadChildren: '../main-slide/main-slide.module'},
  {path: 'contextmenu', loadChildren: '../main-contextmenu/main-contextmenu.module'},
  {path: 'fullpage', loadChildren: '../main-fullpage/main-fullpage.module'},
  {path: '', redirectTo: '/main/introduction', pathMatch: 'full'},
  {path: '**', redirectTo: '/error'}
];

const routes: Routes = [{
  path: '', component: IndexComponent, children: childRoutes
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class IndexRoutingModule {
}
