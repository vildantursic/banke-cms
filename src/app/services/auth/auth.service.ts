import { Injectable } from '@angular/core';
import { MainService } from '../main.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {

  constructor(private service: MainService) { }

  /**
   * Is Logged In
   * @returns {Observable<boolean>}
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token') && localStorage.getItem('access_token') !== undefined;
  }

  /**
   * Login
   * @returns {Observable<any>}
   */
  login(): Observable<any> {
    return this.service.get('auth/login');
  }

  /**
   * Logout
   * @returns {Observable<any>}
   */
  logout(): Observable<any> {
    localStorage.clear();
    return Observable.of(true);
  }

  /**
   * Refresh access token
   * @returns {Observable<any>}
   */
  refreshAccessToken(refreshToken: string): Observable<any> {
    return this.service.get(`auth/refresh?token=${refreshToken}`);
  }

  /**
   * Get user data
   * @returns {Observable<any>}
   */
  getUserData(): Observable<any> {
    return this.service.get('auth/info');
  }

}
