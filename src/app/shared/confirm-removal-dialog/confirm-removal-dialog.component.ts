import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-removal-dialog',
  templateUrl: './confirm-removal-dialog.component.html',
  styleUrls: ['./confirm-removal-dialog.component.scss']
})
export class ConfirmRemovalDialogComponent {

  // TODO fix removal for canceling remove request
  constructor(@Inject(MAT_DIALOG_DATA) public data: { slug: number }) { }

  confirmRemoval(confirm): boolean {
    return !!confirm;
  }
}
