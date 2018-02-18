import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { cloneDeep } from 'lodash';
import { ImagesService } from '../../services/images/images.service';

@Component({
  selector: 'app-choose-image-dialog',
  templateUrl: './choose-image-dialog.component.html',
  styleUrls: ['choose-image-dialog.component.scss']
})
export class ChooseImageDialogComponent {

  images: Array<{ checked: boolean, path: string }> = [];
  imageName = '';
  form = new FormData();

  constructor(private imagesService: ImagesService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.getImages();
  }

  getImages(): void {
    this.imagesService.getImages().subscribe((response: any) => {
      this.images = response;
      this.images.map(image => {
        Object.assign(image, {
          checked: false
        });
        return image;
      });
    });
  }

  deleteImage(image) {
    this.imagesService.deleteImage(image.file).subscribe((response: any) => {
      console.log(response);
      this.getImages();
    });
  }

  choseImage(i) {
    this.images.map(function (image, index) {
      if (index === i) {
        return image.checked = true;
      } else {
        return image.checked = false;
      }
    });
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.form.append('photos', file);
    }
  }

  saveImage() {
    if (this.imageName !== '') {
      this.imagesService.uploadImage(this.form, this.imageName).subscribe(response => {
        console.log(response);
        this.getImages();
      });
    }
  }

  saveData(): Array<{ checked: boolean, path: string }> {
    let findSelectedImage = cloneDeep(this.images);
    findSelectedImage = findSelectedImage.filter(image => image.checked ? image.location + image.file : '');
    return findSelectedImage.length !== 0 ? [findSelectedImage[0].location + findSelectedImage[0].file] : undefined;
  }
}
