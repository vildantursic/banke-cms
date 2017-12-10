import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MainService } from '../main.service';
import { App } from '../../models/blog';

@Injectable()
export class AppService {

  constructor(private service: MainService) { }

  /**
   * Gets array of apps
   * @returns {Observable<any>}
   */
  getApps(): Observable<App[]> {
    return this.service.get('apps');
  }

  /**
   * Creates app
   * @param data
   * @returns {any}
   */
  createApp(data): Observable<App> {
    return this.service.post(`apps`, data)
  }

  /**
   * Insert app package names
   * @param id
   * @param data
   * @returns {any}
   */
  insertAppPackageNames(id, data): Observable<App> {
    return this.service.put(`apps/${id}/package`, data)
  }

  /**
   * Release app
   * @param data
   * @returns {any}
   */
  releaseApp(data): Observable<App> {
    return this.service.put(`apps`, data)
  }

  /**
   * Insert Packages in App
   * @param data
   * @returns {any}
   */
  insertPackages(id, data): Observable<App> {
    return this.service.put(`apps?id=${id}`, data)
  }
}
