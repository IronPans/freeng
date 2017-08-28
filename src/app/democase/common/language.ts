import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    CommonModule,
    TranslateModule
  ]
})
export class SharedModule {

  constructor(private translate: TranslateService) {

    translate.addLangs(['en', 'zh-CN']);
    translate.setDefaultLang('zh-CN');

    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|zh-CN/) ? browserLang : 'en');
  }
}

@NgModule({
  imports: [CommonModule, TranslateModule.forChild({})],
  exports: [TranslateModule]
})
export class LanguageModule {}
