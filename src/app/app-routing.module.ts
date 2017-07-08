import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: './main/login/login.module'},
  { path: 'main', loadChildren: './main/index/index.module'},
  { path: 'error', loadChildren: './main/main-error/main-error.module' },
  { path: 'review-fullpage', loadChildren: './main/main-fullpage/review-fullpage.module'},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/error' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
