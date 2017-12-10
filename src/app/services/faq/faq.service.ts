import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MainService } from '../main.service';

@Injectable()
export class FaqService {

  constructor(private service: MainService) { }

  /**
   * Gets array of faqs
   * @returns {Observable<any>}
   */
  getFaqs(): Observable<any> {
    return this.service.get(`faq`);
  }

  /**
   * Create faq
   * @param data
   * @returns {Observable<any>}
   */
  createFaq(data): Observable<any> {
    return this.service.post(`faq`, data);
  }

  /**
   * Edit faq
   * @param id
   * @param data
   * @returns {Observable<any>}
   */
  editFaq(id: number, data): Observable<any> {
    return this.service.put(`faq?id=${id}`, data);
  }

  /**
   * Remove faq
   * @param id
   * @returns {Observable<any>}
   */
  removeFaq(id: number): Observable<any> {
    return this.service.delete(`faq?id=${id}`);
  }
}
