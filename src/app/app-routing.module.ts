import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
const routes: Routes = [
  {path: 'login', loadChildren: './democase/login/login.module#LoginModule'},
  {path: 'main', loadChildren: './democase/index/index.module#IndexModule'},
  {path: 'error', loadChildren: './democase/main-error/main-error.module#MainErrorModule'},
  {
    path: 'review-fullpage',
    loadChildren: './democase/main-fullpage/review-fullpage.module#ReviewFullpageModule'
  },
  {path: '', redirectTo: '/main/introduction', pathMatch: 'full'},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
