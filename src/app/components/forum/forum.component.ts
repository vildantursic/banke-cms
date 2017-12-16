import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BlogService} from '../../services/blog/blog.service';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {MessageService} from '../../services/utilities/message/message.service';
import {MatDialog} from '@angular/material';
import {Helpers} from '../../helpers/helper';
import {ConfirmRemovalDialogComponent} from '../../shared/confirm-removal-dialog/confirm-removal-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements AfterViewInit {

  loading = true;
  addLoading = false;
  confirmDialog;
  confirmDialogGoFromRoute;
  confirmRemoveDialog;
  addingMode = false;
  editMode = false;

  blogs = [];
  newTag = '';
  newImageUrl = '';
  newImageDescription = '';
  newBlog = {
    name: '',
    body: '',
    images: [],
    tags: []
  };
  images = [];

  toolbarOptions = [  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']   ];
  editorOptions = {
    modules: {
      toolbar: this.toolbarOptions,
      clipboard: {
        matchVisual: false
      }
    },
    placeholder: 'Write blog text here...',
    theme: 'snow'
  };

  constructor(private blogService: BlogService,
              private message: MessageService,
              private dialog: MatDialog,
              public router: Router,
              private helper: Helpers) { }

  ngAfterViewInit() {
    this.getBlogs();
  }

  getBlogs(): void {
    this.blogService.getBlogs().subscribe((response: any) => {
      this.blogs = response.data;
    });
  }

  addNewItem(): void {
    this.helper.setGlobalAddingMode();
    this.addingMode = true;
  }

  onEditClicked(id): void {
    this.helper.setGlobalAddingMode();
    this.addingMode = true;
    this.editMode = true;
    this.newBlog = this.blogs.filter((blog) => blog.id === id)[0];
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
    this.blogService.removeBlog(id).subscribe((response: any) => {
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

    // this.newExercise.tags = this.helper.getSelectedTags(this.tags);
    if (this.validateInsert()) {
      this.message.show('Data is missing');
    } else {

      // this.addLoading = true;
      this.newBlog.tags = this.newBlog.tags.map((tag) => { return tag.name; });

      if (this.editMode) {
        console.log(this.newBlog);
        delete this.newBlog['slug'];
        delete this.newBlog['date'];
        this.newBlog.images = this.newBlog.images.map((image) => {
          Object.defineProperty(image, 'image', {
            enumerable: true,
            configurable: true,
            writable: true,
            value: image.path
          });
          delete image.path;
          return image;
        });

        this.blogService.editBlog(this.newBlog['id'], this.newBlog).subscribe((response: any) => {
          console.log(response);
          // if (this.images.length !== 0) {
          //   this.uploadImage();
          // }
          this.message.show(response.hasOwnProperty('Message') ? response.Message : 'Error occurred');
          this.getBlogs();
          this.deactivateAddingMode();
        });
      } else {
        this.blogService.createBlog(this.newBlog).subscribe((response: any) => {
          console.log(response);
          // if (this.images.length !== 0) {
          //   this.uploadImage();
          // }
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

  addTag(): void {
    this.newBlog.tags.push({
      name: this.newTag
    });

    this.newTag = '';
  }
  removeTag(i): void {
    this.newBlog.tags.splice(i, 1);
  }

  addImage(): void {
    this.newBlog.images.push({
      image: this.newImageUrl,
      description: this.newImageDescription
    });

    this.newImageUrl = '';
    this.newImageDescription = '';
  }
  removeImage(i): void {
    this.newBlog.images.splice(i, 1);
  }
  uploadImage(): void {
    const formData = new FormData();
    formData.append('image', this.images[0]);

    this.blogService.uploadImage(formData).subscribe((response: any) => {
      console.log(response);
    });
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

  validateInsert(): boolean {
    return this.newBlog.tags.length === 0 ||
      this.newBlog.name === '';
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
      name: '',
      body: '',
      images: [],
      tags: []
    };
  }
}
