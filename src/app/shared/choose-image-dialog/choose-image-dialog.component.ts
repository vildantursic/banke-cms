import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { cloneDeep } from 'lodash';
import {ImagesService} from "../../services/images/images.service";

@Component({
  selector: 'app-choose-image-dialog',
  templateUrl: './choose-image-dialog.component.html',
  styleUrls: ['choose-image-dialog.component.scss']
})
export class ChooseImageDialogComponent {

  images: Array<{ checked: boolean, path: string }> = [];

  constructor(private imagesService: ImagesService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.getImages();
  }

  getImages(): void {
    this.imagesService.getImages().subscribe((response: any) => {
      console.log(response);
      this.images = response.map(function (image) {
        return{
          checked: false,
          path: image,
        };
      });
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
      const form = new FormData();
      form.append('photos', file);
      this.imagesService.uploadImage(form).subscribe(response => {
        this.getImages();
      });
    }
  }

  saveData(): Array<{ checked: boolean, path: string }> {
    let findSelectedImage = cloneDeep(this.images);
    findSelectedImage = findSelectedImage.filter(image => image.checked ? image.path : '');
    return findSelectedImage.length !== 0 ? [findSelectedImage[0].path] : undefined;
  }
}
