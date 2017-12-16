import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
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
  PdfService
} from './services/services';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';

import { AppRoutingModule } from './app-routing.module';
import { PdfUploadComponent } from './components/pdf-upload/pdf-upload.component';
import { ForumComponent } from './components/forum/forum.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogComponent,
    LoginComponent,
    PdfUploadComponent,
    ForumComponent,
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
    FroalaViewModule.forRoot()
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
    PdfService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule { }
