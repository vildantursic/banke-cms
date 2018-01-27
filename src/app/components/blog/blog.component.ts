import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BlogService} from '../../services/blog/blog.service';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {MessageService} from '../../services/utilities/message/message.service';
import {MatDialog} from '@angular/material';
import {Helpers} from '../../helpers/helper';
import {ConfirmRemovalDialogComponent} from '../../shared/confirm-removal-dialog/confirm-removal-dialog.component';
import {Router} from '@angular/router';
import {ChooseImageDialogComponent} from "../../shared/choose-image-dialog/choose-image-dialog.component";

import { cloneDeep } from 'lodash';
import {ImagesService} from "../../services/images/images.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements AfterViewInit {

  loading = true;
  addLoading = false;
  confirmDialog;
  confirmRemoveDialog;
  chooseImageDialog;
  addingMode = false;
  editMode = false;

  blogs = [];
  newTag = '';
  newImageUrl = '';
  newImageDescription = '';
  newBlog = {
    slug: '',
    suptitle: '',
    title: '',
    subtitle: '',
    content: '',
    image: [],
    categories: [],
    topNews: false,
  };
  images = [];

  constructor(private blogService: BlogService,
              private imagesService: ImagesService,
              private message: MessageService,
              private dialog: MatDialog,
              public router: Router,
              private helper: Helpers) { }

  ngAfterViewInit() {
    this.getBlogs();
    this.getImages();
  }

  getBlogs(): void {
    this.blogService.getBlogs().subscribe((response: any) => {
      this.blogs = response;
      console.log(this.blogs)
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
  chooseImage() {
    this.chooseImageDialog = this.dialog.open(ChooseImageDialogComponent, {
      data: {
        images: this.images
      }
    });

    this.chooseImageDialog.afterClosed().subscribe((result: Array<{ checked: boolean, path: string }>) => {
      if (result) {
        this.newBlog.image = [result.filter(image => image.checked ? image.path : '')[0].path];
      }
    });
  }

  addNewItem(): void {
    this.helper.setGlobalAddingMode();
    this.addingMode = true;
  }

  onEditClicked(slug): void {
    this.helper.setGlobalAddingMode();
    this.addingMode = true;
    this.editMode = true;
    this.newBlog = cloneDeep(this.blogs.filter((blog) => blog.slug === slug)[0]);
  }

  /**
   * Opens item removal confirmation dialog, passes id and reacts on selected dialog option (remove / cancel)
   * @param slug
   */
  removeConfirm(slug): void {
    this.confirmRemoveDialog = this.dialog.open(ConfirmRemovalDialogComponent);

    this.confirmRemoveDialog.afterClosed().subscribe(result => {
      if (result) {
        this.removeItem(slug);
      }
    });
  }

  /**
   * Remove item for passed id
   * @param slug
   */
  removeItem(slug): void {
    this.blogService.removeBlog(slug).subscribe((response: any) => {
      this.message.show(response.hasOwnProperty('Message') ? response.Message : 'Error occurred');
      this.getBlogs();
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

      if (this.editMode) {
        this.blogService.editBlog(this.newBlog['slug'], this.newBlog).subscribe((response: any) => {
          console.log(response);
          this.message.show(response.hasOwnProperty('Message') ? response.Message : 'Error occurred');
          this.getBlogs();
          this.deactivateAddingMode();
        });
      } else {
        this.blogService.createBlog(this.newBlog).subscribe((response: any) => {
          console.log(response);
          this.message.show(response.hasOwnProperty('Message') ? response.Message : 'Error occurred');
          this.getBlogs();
          this.deactivateAddingMode();
        });
      }
    }
  }

  handleFileSelect(evt) {
    const files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (let i = 0, f; f = files[i]; i++) {
      this.images.push(f);

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      const reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return (e) => {
          // Render thumbnail.
          const span = document.createElement('span');
          span.innerHTML =
            `<img class="thumb" style=" height: 175px; border: 1px solid #000; margin: 10px 5px 0 0;" src="${e.target.result}"/>`;
          document.getElementById('list').insertBefore(span, null);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  addCategory(): void {
    this.newBlog.categories.push(this.newTag);

    this.newTag = '';
  }
  removeCategory(i): void {
    this.newBlog.categories.splice(i, 1);
  }

  addImage(): void {
    this.newBlog.image = [this.newImageUrl];

    this.newImageUrl = '';
    this.newImageDescription = '';
  }
  removeImage(i): void {
    this.newBlog.image.splice(i, 1);
  }

  /**
   * Closes add new item form and shows item list
   */
  closeAddingItem(): void {
    this.deactivateAddingMode();
  }

  validateInsert(): boolean {
    return this.newBlog.categories.length === 0 ||
           this.newBlog.title === '';
  }

  deactivateAddingMode(): void {
    this.helper.unsetGlobalAddingMode();
    this.clearInputs();
    this.addingMode = false;
    this.addLoading = false;
    this.editMode = false;
  }

  clearInputs(): void {
    this.newBlog = {
      slug: '',
      suptitle: '',
      title: '',
      subtitle: '',
      content: '',
      image: [],
      categories: [],
      topNews: false,
    };
  }
}
