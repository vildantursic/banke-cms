import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {MessageService} from '../../services/utilities/message/message.service';
import {MatDialog} from '@angular/material';
import {Helpers} from '../../helpers/helper';
import {Router} from '@angular/router';
import {PdfService} from '../../services/pdf/pdf.service';

@Component({
  selector: 'app-pdf-upload',
  templateUrl: './pdf-upload.component.html',
  styleUrls: ['./pdf-upload.component.scss']
})
export class PdfUploadComponent implements AfterViewInit {

  loading = true;
  addLoading = false;
  confirmDialog;
  addingMode = false;
  editMode = false;

  pdfFull = [];
  pdfPreview = [];

  constructor(private pdfService: PdfService,
              private message: MessageService,
              private dialog: MatDialog,
              public router: Router,
              private helper: Helpers) { }

  ngAfterViewInit() {
    this.getPdfFull();
    this.getPdfPreview();
  }

  getPdfFull(): void {
    this.pdfService.getPDF('pdfFull').subscribe((response: any) => {
      console.log(response);
      this.pdfFull = response;
    });
  }
  getPdfPreview(): void {
    this.pdfService.getPDF('pdfPreview').subscribe((response: any) => {
      console.log(response);
      this.pdfPreview = response;
    });
  }

  uploadPreview(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const form = new FormData();
      form.append('pdf', file);
      this.pdfService.uploadPDF(form, 'pdfPreview').subscribe(response => {
        console.log(response);
      });
    }
  }
  uploadFull(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const form = new FormData();
      form.append('pdf', file);
      this.pdfService.uploadPDF(form, 'pdfFull').subscribe(response => {
        console.log(response);
      });
    }
  }

  /**
   * Opens save item confirmation dialog and reacts on selected dialog option (save / cancel)
   */
  // saveConfirm(): void {
  //   this.confirmDialog = this.dialog.open(ConfirmationDialogComponent);
  //
  //   this.confirmDialog.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.saveItem();
  //     }
  //   });
  // }

  /**
   * Prepares data for saving and saves item
   */
  // saveItem(): void {
  //
  //   // this.newExercise.tags = this.helper.getSelectedTags(this.tags);
  //   if (this.validateInsert()) {
  //     this.message.show('Data is missing');
  //   } else {
  //
  //     this.pdfService.uploadPDF(this.pdf).subscribe((response: any) => {
  //       console.log(response);
  //       this.message.show(response.hasOwnProperty('Message') ? response.Message : 'Error occurred');
  //       this.getFullPdf();
  //       this.getPreviewPdf();
  //       this.deactivateAddingMode();
  //     });
  //   }
  // }

  /**
   * Closes add new item form and shows item list
   */
  closeAddingItem(): void {
    this.deactivateAddingMode();
  }

  deactivateAddingMode(): void {
    this.helper.unsetGlobalAddingMode();
    this.addingMode = false;
    this.addLoading = false;
    this.editMode = false;
  }

  validateInsert(): boolean {
    return false;
  }
}
