import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';

import { Helpers } from '../../helpers/helper';
import { MessageService } from '../../services/utilities/message/message.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent implements OnInit {

  size = {
    small: {
      width: 640,
      height: 640
    },
    large: {
      width: 1024,
      height: 512
    },
    gif: {
      width: 640,
      height: 640
    }
  };

  @Input() viewType = 'small';
  @Input() files = [{
    form: 'image',
    type: ['image/png', 'image/jpeg', 'image/jpg', 'video/mp4'],
    name: '',
    size: '',
    exists: '',
  }];
  // TODO fix file types
  @Input() type: string[] = ['jpeg', 'jpg', 'gif', 'mp4'];


  @Output('onImageUpload') onImageUpload: EventEmitter<any> = new EventEmitter();

  @ViewChild('uploadInput') uploadInput: any;
  @ViewChild('dropzone') dropzone: any;

  constructor(private helper: Helpers, private message: MessageService) { }

  ngOnInit() {
  }

  @HostListener('drop', ['$event']) public onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.discoverFile(files[0]);
    }
  }

  onUploadClick() {
    this.uploadInput.nativeElement.click();
  }

  fileChange(event): void {
    if (event.target.files[0]) {
      this.discoverFile(event.target.files[0]);
    }
  }

  discoverFile(uploadedFile): void {

    const fileExtension = uploadedFile.name.split('.').pop();
    let fileForm = '';

    this.files.forEach(file => {
      if ((fileExtension === 'jpeg' || fileExtension === 'jpg') && file.form === 'thumbnail') {

        this.helper.checkImageSize(this.size[this.viewType], uploadedFile, (isRequiredSize) => {
          if (isRequiredSize) {
            fileForm = 'thumbnail';
            file.name = uploadedFile.name;
            file.size = this.formatBytes(uploadedFile.size);

            this.onImageUpload.emit({ file: uploadedFile, form: fileForm});
          } else {
            this.message.show(`Image have to be ${this.size[this.viewType].width} x ${this.size[this.viewType].height}`)
          }
        })

      } else if (fileExtension === 'gif' && file.form === 'gif') {

        this.helper.checkImageSize(this.size['gif'], uploadedFile, (isRequiredSize) => {
          if (isRequiredSize) {
            fileForm = 'gif';
            file.name = uploadedFile.name;
            file.size = this.formatBytes(uploadedFile.size);

            this.onImageUpload.emit({ file: uploadedFile, form: fileForm});
          } else {
            this.message.show(`Gif have to be ${this.size['gif'].width} x ${this.size['gif'].height}`)
          }
        })
      } else if (fileExtension === 'mp4' && file.form === 'video') {
        fileForm = 'mp4';
        file.name = uploadedFile.name;
        file.size = this.formatBytes(uploadedFile.size);

        this.onImageUpload.emit({ file: uploadedFile, form: fileForm});
      } else {
        this.message.show(`File have to be in JPG, JPEG, GIF or MP4 format`);
      }
    })
  }

  formatBytes(bytes, decimals?): string {
    if (bytes === 0) {
      return '0 Bytes';
    };
    const k = 1000,
          dm = decimals || 2,
          sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
