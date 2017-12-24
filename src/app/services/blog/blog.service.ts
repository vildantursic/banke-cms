import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MainService } from '../main.service';

@Injectable()
export class BlogService {

  constructor(private service: MainService) { }

  /**
   * Gets array of blogs
   * @returns {Observable<any>}
   */
  getBlogs(): Observable<any> {
    return this.service.get(`blog`);
  }

  /**
   * Gets array of images
   * @returns {Observable<any>}
   */
  getImages(): Observable<any> {
    return this.service.get(`blog/images`);
  }

  /**
   * Gets array of suggested blogs
   * @returns {Observable<any>}
   */
  getSuggestedBlogs(): Observable<any> {
    return this.service.get(`blog/suggestions`);
  }

  /**
   * Gets array of blog
   * @param slug
   * @returns {Observable<any>}
   */
  getBlog(slug: string): Observable<any> {
    return this.service.get(`blog/posts/${slug}`);
  }

  /**
   * Create blog
   * @param data
   * @returns {Observable<any>}
   */
  createBlog(data): Observable<any> {
    return this.service.post(`blog`, data);
  }

  /**
   * Edit blog
   * @param slug
   * @param data
   * @returns {Observable<any>}
   */
  editBlog(slug: string, data): Observable<any> {
    return this.service.put(`blog/${slug}`, data);
  }

  /**
   * Remove blog
   * @param slug
   * @returns {Observable<any>}
   */
  removeBlog(slug: string): Observable<any> {
    return this.service.delete(`blog/${slug}`);
  }

  /**
   * Upload image
   * @param data
   * @returns {Observable<any>}
   */
  uploadImage(data): Observable<any> {
    return this.service.post(`blog/image`, data);
  }

}
