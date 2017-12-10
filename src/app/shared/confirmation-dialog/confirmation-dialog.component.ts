import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  saveData(): boolean {
    return true;
  }

  showTitleMessage(): string {
    return this.data ? this.data.title : 'DO YOU WANT TO SAVE THIS?';
  }
  showButtonText(): string {
    return this.data ? this.data.confirmation : 'Save';
  }
}
