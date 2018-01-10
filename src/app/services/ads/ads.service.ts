import { Injectable } from '@angular/core';
import { MainService } from '../main.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdsService {

  constructor(private service: MainService) { }

  /**
   * Gets ads
   * @returns {Observable<any>}
   */
  getAds(): Observable<any> {
    return this.service.get(`ads`);
  }

  /**
   * Upload ads
   * @returns {Observable<any>}
   */
  uploadAds(ads): Observable<any> {
    return this.service.post(`ads`, ads);
  }

  /**
   * Update ads
   * @returns {Observable<any>}
   */
  updateAds(ads): Observable<any> {
    return this.service.put(`ads`, ads);
  }
}
