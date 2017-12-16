import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HelperService } from './helpers/helper.service';
import { MessageService } from './utilities/message/message.service';

@Injectable()
export class MainService {

  // TODO separate error handling into helper

  constructor(private http: HttpClient, private helper: HelperService, private message: MessageService) { }

  /**
   * Get Request
   *
   * @param route
   * @param queryParams
   * @returns {Observable<R>}
   */
  get(route: string, queryParams?: {}): Observable<any> {

    const headers = new HttpHeaders();
    this.helper.createAuthorizationHeader(headers, false);

    return this.http.get(this.helper.generateRoute(route, queryParams), {
      headers: headers
    })
      .map((res: HttpResponse<any>) => this.helper.checkDataValidity(res))
      .catch((err: any) => {
        this.message.show(err.status ?  err.statusText || err.message : 'Timeout Error');
        return Observable.of(err);
    });
  }

  /**
   * Post Request
   *
   * @param route
   * @param data
   * @param queryParams
   * @returns {Observable<R>}
   */
  post(route: string, data?: {}, queryParams?: {}): any {

    const headers = new HttpHeaders();
    this.helper.createAuthorizationHeader(headers);

    return this.http.post(this.helper.generateRoute(route, queryParams), data, {
      headers: headers
    })
      .map((res: HttpResponse<any>) => this.helper.checkDataValidity(res))
      .catch((err: Error) => {
        this.message.show(err.message === undefined ? 'Timeout Error' : err.message);
        return Observable.of(err);
    });
  }

  /**
   * Put Request
   *
   * @param route
   * @param data
   * @param queryParams
   * @returns {Observable<R>}
   */
  put(route: string, data?: {}, queryParams?: {}) {

    const headers = new HttpHeaders();
    this.helper.createAuthorizationHeader(headers);

    return this.http.put(this.helper.generateRoute(route, queryParams), data, {
      headers: headers
    })
      .map((res: HttpResponse<any>) => this.helper.checkDataValidity(res))
      .catch((err: Error) => {
        this.message.show(err.message === undefined ? 'Timeout Error' : err.message);
        return Observable.of(err);
      });
  }

  /**
   * Delete Request
   *
   * @param route
   * @param queryParams
   * @returns {Observable<R>}
   */
  delete(route: string, queryParams?: {}) {

    const headers = new HttpHeaders();
    this.helper.createAuthorizationHeader(headers);

    return this.http.delete(this.helper.generateRoute(route, queryParams), {
      headers: headers
    })
      .map((res: HttpResponse<any>) => this.helper.checkDataValidity(res))
      .catch((err: Error) => {
        this.message.show(err.message === undefined ? 'Timeout Error' : err.message);
        return Observable.of(err);
    });
  }

}
