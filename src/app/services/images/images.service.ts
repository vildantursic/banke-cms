import { Injectable } from '@angular/core';
import {MainService} from "../main.service";
import {Observable} from "rxjs";

@Injectable()
export class ImagesService {

  constructor(private service: MainService) { }

  /**
   * Gets array of images
   * @returns {Observable<any>}
   */
  getImages(): Observable<any> {
    return this.service.get(`images`);
  }

  /**
   * Upload image
   * @param data
   * @returns {Observable<any>}
   */
  uploadImage(data): Observable<any> {
    return this.service.post(`images/upload`, data);
  }

  /**
   * delete image
   * @param file
   * @returns {Observable<any>}
   */
  deleteImage(file): Observable<any> {
    return this.service.delete(`images`, file);
  }
}
