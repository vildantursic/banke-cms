import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MainService } from '../main.service';

@Injectable()
export class SystemService {

  constructor(private service: MainService) { }

  /**
   * Gets tags
   * @returns {Observable<any>}
   */
  getTags(): Observable<any> {
    return this.service.get(`tags`);
  }

  /**
   * Update tags
   * @param data
   * @returns {Observable<any>}
   */
  updateTags(data): Observable<any> {
    return this.service.post(`tags`, data);
  }

  /**
   * Invite user
   * @param data
   * @returns {Observable<any>}
   */
  inviteUser(data): Observable<any> {
    return this.service.post(`admin/invite`, data);
  }

  /**
   * Remove user
   * @param email
   * @returns {Observable<any>}
   */
  removeUser(email): Observable<any> {
    return this.service.delete(`admin/user/${email}`);
  }

  /**
   * Get terms
   * @returns {Observable<any>}
   */
  getTerms(): Observable<any> {
    return this.service.get(`system/terms`);
  }

  /**
   * Create term
   * @param data
   * @returns {Observable<any>}
   */
  createTerm(data): Observable<any> {
    return this.service.post(`admin/term`, data);
  }

  /**
   * Edit term
   * @param id
   * @param data
   * @returns {Observable<any>}
   */
  editTerm(id, data): Observable<any> {
    return this.service.put(`admin/term/${id}`, data);
  }
}
