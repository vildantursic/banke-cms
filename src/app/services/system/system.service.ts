import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MainService } from '../main.service';

@Injectable()
export class SystemService {

  constructor(private service: MainService) { }

  /**
   * Gets array of users
   * @param type
   * @returns {Observable<any>}
   */
  getUsers(type?): Observable<any> {
    return this.service.get(type ? `admin/worker?type=${type}` : `admin/worker`);
  }

  /**
   * Gets array of user projects
   * @param email
   * @returns {Observable<any>}
   */
  getUserProjects(email): Observable<any> {
    return this.service.get(`admin/project?email=${email}`);
  }



  /**
   * Update user role
   * @param username
   * @param data
   * @returns {Observable<any>}
   */
  updateUserRole(username, data): Observable<any> {
    return this.service.put(`admin/scope/${username}`, data);
  }

  /**
   * Update user api limit
   * @param username
   * @param data
   * @returns {Observable<any>}
   */
  updateUserApiLimit(username, data): Observable<any> {
    return this.service.put(`admin/api/${username}`, data);
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
