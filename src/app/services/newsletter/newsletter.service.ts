import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MainService } from '../main.service';

@Injectable()
export class NewsletterService {

  constructor(private service: MainService) { }

  /**
   * Gets array of newsletters
   * @returns {Observable<any>}
   */
  getNewsletter(): Observable<any> {
    return this.service.get(`blog/newsletter`);
  }

  /**
   * Create newsletters
   * @param data
   * @returns {Observable<any>}
   */
  createNewsletter(data): Observable<any> {
    return this.service.post(`blog/newsletter`, data);
  }

}
