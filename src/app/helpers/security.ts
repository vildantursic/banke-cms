import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class Security {

  permissions = [];

  constructor() {
    if (localStorage.getItem('permissions') !== null) {
      this.permissions = localStorage.getItem('permissions').split(',');
    }
  }

  checkAuthorization(resource): boolean {
    if (localStorage.getItem('scope') === null) {
      return false;
    } else {
      if (this.permissions.length !== 0) {
        return !this.permissions.filter((el => el === resource)).map(el => el === resource)[0];
      } else {
        return false;
      }
    }
  }

  isTokenExpired(): boolean {
    return moment(localStorage.getItem('expires_in')).format('YYYY-MM-DD HH:mm:ss') <= moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  }
}
