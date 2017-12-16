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
  confirmDialogGoFromRoute;
  addingMode = false;
  editMode = false;

  pdf = {
    link: ''
  };

  constructor(private pdfService: PdfService,
              private message: MessageService,
              private dialog: MatDialog,
              public router: Router,
              private helper: Helpers) { }

  ngAfterViewInit() {
    this.getPDF();
  }

  getPDF(): void {
    this.pdfService.getPDF().subscribe((response: any) => {
      console.log(response)
      this.pdf = response;
    });
  }

  /**
   * Opens save item confirmation dialog and reacts on selected dialog option (save / cancel)
   */
  saveConfirm(): void {
    this.confirmDialog = this.dialog.open(ConfirmationDialogComponent);

    this.confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.saveItem();
      }
    });
  }

  /**
   * Prepares data for saving and saves item
   */
  saveItem(): void {

    // this.newExercise.tags = this.helper.getSelectedTags(this.tags);
    if (this.validateInsert()) {
      this.message.show('Data is missing');
    } else {

      this.pdfService.uploadPDF(this.pdf).subscribe((response: any) => {
        console.log(response);
        this.message.show(response.hasOwnProperty('Message') ? response.Message : 'Error occurred');
        this.getPDF();
        this.deactivateAddingMode();
      });
    }
  }

  goToRoute(routeLink): void {
    if (sessionStorage.getItem('adding') === 'true') {
      this.confirmDialogGoFromRoute = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'Are you sure you want to go ... all data will be lost',
          confirmation: 'Go'
        }
      });

      this.confirmDialogGoFromRoute.afterClosed().subscribe(result => {
        if (result) {
          this.router.navigate([routeLink]);
        }
      });
    } else {
      this.router.navigate([routeLink]);
    }
  }

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
