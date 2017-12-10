import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import * as moment from 'moment';
import { config } from '../app.config';


@Injectable()
export class Helpers {

  // Check image size
  checkImageSize(size: { width: number, height: number }, file, cb): void {

    const _URL = window.URL;

    const img = new Image();
    img.onload = function () {
      if (img.width === size.width && img.height === size.height) {
        cb(true)
      } else {
        cb(false)
      }
    };
    img.src = _URL.createObjectURL(file);
  }

  setStorageData(params): void {
    config.localStorageData.forEach((data: string) => {
      if (data === 'expires_in') {
        localStorage.setItem(data, moment(new Date()).add(params[data], 'seconds').format('YYYY-MM-DD HH:mm:ss'));
      } else {
        localStorage.setItem(data, params[data]);
      }
    })
  }

  setGlobalAddingMode(): any {
    sessionStorage.setItem('adding', 'true');
  }
  unsetGlobalAddingMode(): any {
    sessionStorage.setItem('adding', 'false');
  }
}
