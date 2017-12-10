import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';

import { DndModule } from 'ng2-dnd';
// import { QuillEditorModule } from 'ngx-quill-editor';

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
  FaqService
} from './services/services';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';

import { AppRoutingModule } from './app-routing.module';
import { FaqComponent } from './components/faq/faq.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogComponent,
    LoginComponent,
    FaqComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ang4-seo-pre'}),
    AppRoutingModule,
    SharedModule,
    MaterialModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    DndModule.forRoot(),
    // QuillEditorModule
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
    FaqService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule { }
