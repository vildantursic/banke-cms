import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  template: `
    <input type="file" (change)="fileChange($event)" placeholder="Upload file" accept=".jpg,.jpeg,.gif">
  `
})
export class UploadFileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      const headers = new Headers();
      /** No need to include Content-Type in Angular 4 */
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
    }
  }

}
