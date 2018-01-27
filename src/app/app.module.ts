import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';

import { DndModule } from 'ng2-dnd';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material-design/material-design.module';


import { Helpers } from './helpers/helper';
import { Security } from './helpers/security';

import { AuthGuard } from './services/security/auth.service';
import { MainService } from './services/main.service';
import {
  AuthService,
  MessageService,
  HelperService,
  AppService,
  SystemService,
  BlogService,
  NewsletterService,
  FaqService,
  PdfService,
  AdsService,
  ImagesService,
  PartnersService
} from './services/services';

import { LoginComponent } from './components/login/login.component';
import { BlogComponent } from './components/blog/blog.component';

import { AppRoutingModule } from './app-routing.module';
import { PdfUploadComponent } from './components/pdf-upload/pdf-upload.component';
import {ShareButtonsModule} from 'ngx-sharebuttons';
import { AdsComponent } from './components/ads/ads.component';
import {PartnersComponent} from './components/partners/partners.component';
import {FiltersPipe, SortPipe} from './pipes/filters/filters.pipe';
import { GeneralComponent } from './components/general/general.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    LoginComponent,
    PdfUploadComponent,
    AdsComponent,
    PartnersComponent,
    FiltersPipe,
    SortPipe,
    GeneralComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ang4-seo-pre'}),
    AppRoutingModule,
    SharedModule,
    MaterialModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DndModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    HttpClientJsonpModule,
    ShareButtonsModule.forRoot()
  ],
  providers: [
    NgModel,
    AuthGuard,
    Helpers,
    Security,
    MainService,
    HelperService,
    AuthService,
    MessageService,
    AppService,
    SystemService,
    BlogService,
    NewsletterService,
    FaqService,
    PdfService,
    AdsService,
    ImagesService,
    PartnersService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule { }
