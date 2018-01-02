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
    this.images = cloneDeep(data.images);
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
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      var form = new FormData();
      form.append("photos", file);
      this.imagesService.uploadImage(form).subscribe(response => {
        console.log(response);
      });
    }
  }

  saveData(): Array<{ checked: boolean, path: string }> {
    return this.images;
  }
}
