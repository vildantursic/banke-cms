import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogComponent } from './components/blog/blog.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/security/auth.service';
import { PdfUploadComponent } from './components/pdf-upload/pdf-upload.component';
import {AdsComponent} from './components/ads/ads.component';
import {PartnersComponent} from './components/partners/partners.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'blog', component: BlogComponent, canActivate: [AuthGuard] },
  { path: 'pdf-upload', component: PdfUploadComponent, canActivate: [AuthGuard] },
  { path: 'ads', component: AdsComponent, canActivate: [AuthGuard] },
  { path: 'partners', component: PartnersComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
