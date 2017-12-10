import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { config } from '../../app.config';
import { Helpers } from '../../helpers/helper';

import { AuthService } from '../../services/auth/auth.service';

interface IUserParams {
  access_token: string;
  email: string;
  first_name: string;
  family_name: string;
  picture: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private helper: Helpers) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['blog']);
    }

    this.route.queryParams.subscribe((params: IUserParams) => {
      if (params.access_token) {
        this.helper.setStorageData(params);
        this.router.navigate(['blog']);
        location.reload();
      } else {
        this.authService.login().subscribe((response: any) => {
          this.login = response;
        });
      }
    });
  }
}
