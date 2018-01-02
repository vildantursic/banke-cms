import { AfterViewInit, Component } from '@angular/core';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {MessageService} from '../../services/utilities/message/message.service';
import {MatDialog} from '@angular/material';
import {Helpers} from '../../helpers/helper';
import {Router} from '@angular/router';
import {AdsService} from "../../services/ads/ads.service";
import {ChooseImageDialogComponent} from "../../shared/choose-image-dialog/choose-image-dialog.component";
import {ImagesService} from "../../services/images/images.service";

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['ads.component.scss']
})
export class AdsComponent implements AfterViewInit {

  loading = true;
  addLoading = false;
  confirmDialog;
  confirmDialogGoFromRoute;
  chooseImageDialog;
  addingMode = false;
  editMode = false;

  ads = []
  images = [];

  constructor(private adsService: AdsService,
              private imagesService: ImagesService,
              private message: MessageService,
              private dialog: MatDialog,
              public router: Router,
              private helper: Helpers) { }

  ngAfterViewInit() {
    this.getAds();
    this.getImages();
  }

  getAds(): void {
    this.adsService.getAds().subscribe((response: any) => {
      console.log(response)
      this.ads = response.data;
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

  chooseImage(section, ad) {
    this.chooseImageDialog = this.dialog.open(ChooseImageDialogComponent, {
      data: {
        images: this.images
      }
    });

    this.chooseImageDialog.afterClosed().subscribe((result: Array<{ checked: boolean, path: string }>) => {
      if (result) {
        this.ads[section].ads[ad].image = [result.filter(image => image.checked ? image.path : '')[0].path];
      }
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

      this.adsService.uploadAds(this.ads).subscribe((response: any) => {
        console.log(response);
        this.message.show(response.hasOwnProperty('Message') ? response.Message : 'Error occurred');
        this.getAds();
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
