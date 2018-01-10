import { Injectable } from '@angular/core';
import { MainService } from '../main.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PartnersService {

  constructor(private service: MainService) { }

  /**
   * Gets partners
   * @returns {Observable<any>}
   */
  getPartners(): Observable<any> {
    return this.service.get(`partners`);
  }

  /**
   * Create partner
   * @returns {Observable<any>}
   */
  createPartner(partner): Observable<any> {
    return this.service.post(`partners`, partner);
  }

  /**
   * Delete partner
   * @returns {Observable<any>}
   */
  deletePartner(id): Observable<any> {
    return this.service.delete(`partners/${id}`, );
  }
}
