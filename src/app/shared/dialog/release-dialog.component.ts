import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './release-dialog.component.html',
  styleUrls: ['./release-dialog.component.scss']
})
export class ReleaseDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  selectAllForRelease(): void {
    this.data.items.map(item => item.checked = true);
  }

  deselectAllForRelease(): void {
    this.data.items.map(item => item.checked = false);
  }

  isAllSelected(): boolean {
    return this.data.items.filter(item => item.checked === true).length === this.data.items.length;
  }

  isAnySelected(): boolean {
    return this.data.items.filter(item => item.checked === true).length <= 0;
  }

  saveData(cancel?): any {
    if (cancel === false) {
      return [];
    } else {
      return this.data.items.filter(item => item.checked);
    }
  }
}
