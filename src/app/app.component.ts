import { Component, NgZone, ViewChild, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {MatDialog, MatSidenav} from '@angular/material';
import 'rxjs/add/operator/switchMap';

import { config } from './app.config';
import { Security } from './helpers/security';
import { Helpers } from './helpers/helper';

import { AuthService } from './services/auth/auth.service';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  isLoggedIn = false;
  title = '';
  currentUrl = '';
  search = '';
  link = 'home';
  loading;
  id;
  sidebarShowStyle = 'side';
  confirmDialog;
  activeRoute = '';

  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    public router: Router,
    private location: Location,
    private security: Security,
    private helper: Helpers,
    private ngZone: NgZone,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.helper.unsetGlobalAddingMode();

    // setTimeout(() => {
    //   this.refreshToken();
    // }, 3600000);

    // Preventing drag and drop on rest of screen
    window.addEventListener( 'dragover', function(e: any){
      e = e || event;
      e.preventDefault();
    }, false);
    window.addEventListener( 'drop', function(e: any){
      e = e || event;
      e.preventDefault();
    }, false);

    // if (this.security.isTokenExpired()) {
    //   this.refreshToken();
    // }

    // scroll to top when route is changed and parse url to route name
    router.events.subscribe(() => {
      this.helper.unsetGlobalAddingMode();
      this.activeRoute = router.url;
      this.isLoggedIn = this.authService.isLoggedIn();

      this.loading = true;
      window.scrollTo(0, 0);
      this.currentUrl = this.location.path().slice(1, this.location.path().length).toUpperCase();

      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });

  }

  ngAfterViewInit(): void {

  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  logout(event): void {
    this.authService.logout().subscribe((response) => {
      if (response) {
        this.router.navigate(['login']);
      }
    });
  }

  refreshToken(): void {
    this.authService.refreshAccessToken(localStorage.getItem('refresh_token')).subscribe((response) => {
      if (response.hasOwnProperty('access_token')) {
        if (response.access_token) {
          this.helper.setStorageData(response);
          location.reload();
        }
      }
    });
  }

  getUserData(): any {
    return {
      firstName: localStorage.getItem('first_name'),
      lastName: localStorage.getItem('last_name'),
      email: localStorage.getItem('email'),
      image: localStorage.getItem('image')
    };
  }
}
