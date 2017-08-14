/**
 * Created by ux168 on 17-7-1.
 */
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainChangelogComponent} from './main-changelog.component';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', component: MainChangelogComponent}
  ])],
  exports: [RouterModule]
})

export class MainChangelogRoutingModule {}
