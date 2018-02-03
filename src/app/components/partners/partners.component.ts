import { AfterViewInit, Component } from '@angular/core';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {MessageService} from '../../services/utilities/message/message.service';
import {MatDialog} from '@angular/material';
import {Helpers} from '../../helpers/helper';
import {Router} from '@angular/router';
import {AdsService} from "../../services/ads/ads.service";
import {ChooseImageDialogComponent} from "../../shared/choose-image-dialog/choose-image-dialog.component";
import {ImagesService} from "../../services/images/images.service";
import {PartnersService} from "../../services/partners/partners.service";
import {ConfirmRemovalDialogComponent} from "../../shared/confirm-removal-dialog/confirm-removal-dialog.component";

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements AfterViewInit {

  loading = true;
  addLoading = false;
  confirmDialog;
  confirmRemoveDialog;
  chooseImageDialog;
  addingMode = false;
  editMode = false;

  newPartner = {
    image: '',
    type: '',
    active: true
  }

  partners = [];
  images = [];
  types = [
    {
      value: 'bank',
      viewValue: 'Banka',
    },
    {
      value: 'leasing',
      viewValue: 'Lizing',
    },
    {
      value: 'insurance',
      viewValue: 'Insurance',
    },
    {
      value: 'microcredit',
      viewValue: 'Microcredit',
    }
  ];

  constructor(private partnersService: PartnersService,
              private imagesService: ImagesService,
              private message: MessageService,
              private dialog: MatDialog,
              public router: Router,
              private helper: Helpers) { }

  ngAfterViewInit() {
    this.getPartners();
    this.getImages();
  }

  getPartners(): void {
    this.partnersService.getPartners().subscribe((response: any) => {
      console.log(response)
      this.partners = response;
    });
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

  addNewItem(): void {
    this.helper.setGlobalAddingMode();
    this.addingMode = true;
  }

  chooseImage() {
    this.chooseImageDialog = this.dialog.open(ChooseImageDialogComponent, {
      data: {
        images: this.images
      }
    });

    this.chooseImageDialog.afterClosed().subscribe((result: Array<{ checked: boolean, path: string }>) => {
      if (result) {
        this.newPartner.image = result.filter(image => image.checked ? image.path : '')[0].path;
      }
    });
  }

  /**
   * Opens item removal confirmation dialog, passes id and reacts on selected dialog option (remove / cancel)
   * @param id
   */
  removeConfirm(id): void {
    this.confirmRemoveDialog = this.dialog.open(ConfirmRemovalDialogComponent);

    this.confirmRemoveDialog.afterClosed().subscribe(result => {
      if (result) {
        this.removeItem(id);
      }
    });
  }

  /**
   * Remove item for passed id
   * @param id
   */
  removeItem(id): void {
    this.partnersService.deletePartner(id).subscribe((response: any) => {
      this.message.show(response.hasOwnProperty('Message') ? response.Message : 'Error occurred');
      this.getPartners();
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

      this.partnersService.createPartner(this.newPartner).subscribe((response: any) => {
        console.log(response);
        this.message.show(response.hasOwnProperty('Message') ? response.Message : 'Error occurred');
        this.getPartners();
        this.deactivateAddingMode();
      });
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
    this.clearData();
  }

  validateInsert(): boolean {
    return false;
  }

  clearData(): void {
    this.newPartner = {
      image: '',
      type: '',
      active: true
    };
  }
}
