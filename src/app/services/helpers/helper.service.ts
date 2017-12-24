import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class HelperService {

  /**
   * Function combines route url and query params
   *
   * @param route
   * @param queryParams
   * @returns {string}
   */
  generateRoute(route: string, queryParams?: {}): string {

    const rootUrl = environment.api;

    let reqUrl = rootUrl + '/' + route;
    if (queryParams) {
      reqUrl += '?';
      for (const obj in queryParams) {
        if (obj) {
          reqUrl += obj + '=' + queryParams[obj] + '&';
        }
      }
    }

    return reqUrl;
  }

  /**
   * Function creates authorization headers
   *
   * @param headers
   * @param auth
   * @returns headers
   */
  createAuthorizationHeader(headers: HttpHeaders, auth = true): any {
    // if (auth) {
      headers.append('Content-type', 'application/json');
      headers.append('authorization', 'Bearer ' + localStorage.getItem('access_token'));
    // }
  }

  /**
   * Function checks response data validity
   *
   * @param response
   * @returns response
   */
  checkDataValidity(response): any {
    if (response.hasOwnProperty('status')) {
      if (response.status === 400) {
        setTimeout(() => {
          // location.reload();
          console.log('there was error 400');
        }, 2000);
        return { data: [] };
      } else {
        return response;
      }
    } else {
      return response;
    }
  }

}
