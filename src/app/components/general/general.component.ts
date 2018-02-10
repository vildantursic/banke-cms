import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SystemService} from '../../services/system/system.service';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material';
import {MessageService} from '../../services/utilities/message/message.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements AfterViewInit {

  newTag = '';
  confirmDialog;
  tags = [];
  users = [];

  constructor(private systemService: SystemService,
              private dialog: MatDialog,
              private message: MessageService
) { }

  ngAfterViewInit() {
    this.getTags();
    this.getUsers();
  }
  getUsers() {
    this.systemService.getUsers().subscribe((response: any) => {
      this.users = response;
    });
  }
  getTags(): void {
    this.tags = [];
    this.systemService.getTags().subscribe((response: any) => {
      console.log(response[response.length - 1]);
      for (const i in response[response.length - 1]) {
        if (response[response.length - 1].hasOwnProperty(i)) {
          this.tags.push(response[response.length - 1][i]);
        }
      }
      this.tags = this.tags.slice(0, this.tags.length - 2);
      console.log(this.tags);
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

    if (this.validateInsert()) {
      this.message.show('Data is missing');
    } else {

      this.systemService.updateTags(this.tags).subscribe((response: any) => {
        console.log(response);
        this.message.show(response.hasOwnProperty('Message') ? response.Message : 'Error occurred');
        this.getTags();
      });
    }
  }

  addTag(): void {
    this.tags.push(this.newTag);

    this.newTag = '';
  }
  removeTag(i): void {
    this.tags.splice(i, 1);
  }

  validateInsert(): boolean {
    return this.tags.length === 0 || this.tags.length >= 50;
  }
  removeUser(email) {
    this.systemService.removeUser(email).subscribe((response: any) => {
      this.getUsers();
    });
  }
}
