import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModule} from '../../component/table/table.component';
import {CodeModule} from '../../component/code/code.component';
import {TabGroupModule} from '../../component/tab/tab.component';
import {ProgressModule} from '../../component/progress/progress.component';
import {GridModule} from '../../component/grid/grid.directive';
import {MainProgressRoutingModule} from './main-progress-routing.module';
import {MainProgressComponent} from './main-progress.component';

@NgModule({
  imports: [
    CommonModule,
    MainProgressRoutingModule,
    TabGroupModule,
    CodeModule,
    TableModule,
    ProgressModule,
    GridModule
  ],
  declarations: [MainProgressComponent]
})

export class MainProgressModule {}
