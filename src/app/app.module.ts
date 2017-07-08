import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {ToastController} from './component/toast/toast.controller';
import {App} from './main/app';
import {ToastModule} from './component/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    ToastModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ToastController,
    App
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
