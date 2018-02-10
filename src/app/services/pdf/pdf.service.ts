import { Injectable } from '@angular/core';
import { MainService } from '../main.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PdfService {

  constructor(private service: MainService) { }

  /**
   * Gets pdf
   * @returns {Observable<any>}
   */
  getPDF(type: string): Observable<any> {
    return this.service.get(`pdf/${type}`);
  }

  /**
   * Upload data
   * @returns {Observable<any>}
   */
  uploadPDF(data, type: string): Observable<any> {
    return this.service.post(`pdf/${type}`, data);
  }
}
