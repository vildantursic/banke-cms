import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Helpers} from '../../helpers/helper';
import {MessageService} from '../../services/utilities/message/message.service';
import {MatDialog} from '@angular/material';
import {FaqService} from '../../services/faq/faq.service';
import {ConfirmRemovalDialogComponent} from '../../shared/confirm-removal-dialog/confirm-removal-dialog.component';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {Router} from "@angular/router";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements AfterViewInit {

  loading = true;
  addLoading = false;
  confirmDialog;
  confirmDialogGoFromRoute;
  confirmRemoveDialog;
  addingMode = false;
  editMode = false;

  faqs = [];
  newFaq = {
    question: '',
    answer: '',
  };
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

  constructor(private faqService: FaqService,
              private message: MessageService,
              public router: Router,
              private dialog: MatDialog,
              private helper: Helpers) { }

  ngAfterViewInit() {
    this.getFaqs();
  }

  getFaqs(): void {
    this.faqService.getFaqs().subscribe((response: any) => {
      this.faqs = response.data;
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
    this.newFaq = this.faqs.filter((faq) => faq.id === id)[0];
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
    this.faqService.removeFaq(id).subscribe((response: any) => {
      this.message.show(response.hasOwnProperty('Message') ? response.Message : 'Error occurred');
      this.getFaqs();
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

    console.log(this.newFaq);
    // this.newExercise.tags = this.helper.getSelectedTags(this.tags);
    if (this.validateInsert()) {
      this.message.show('Data is missing');
    } else {

      // this.addLoading = true;

      if (this.editMode) {
        this.faqService.editFaq(this.newFaq['id'], this.newFaq).subscribe((response: any) => {
          console.log(response);
          this.message.show(response.hasOwnProperty('Message') ? response.Message : 'Error occurred');
          this.getFaqs();
          this.deactivateAddingMode();
        });
      } else {
        this.faqService.createFaq(this.newFaq).subscribe((response: any) => {
          console.log(response);
          this.message.show(response.hasOwnProperty('Message') ? response.Message : 'Error occurred');
          this.getFaqs();
          this.deactivateAddingMode();
        });
      }
    }
  }

  goToRoute(): void {
    if (sessionStorage.getItem('adding') === 'true') {
      this.confirmDialogGoFromRoute = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'Are you sure you want to go ... all data will be lost',
          confirmation: 'Go'
        }
      });

      this.confirmDialogGoFromRoute.afterClosed().subscribe(result => {
        if (result) {
          this.router.navigate(['blog']);
        }
      });
    } else {
      this.router.navigate(['blog']);
    }
  }

  /**
   * Closes add new item form and shows item list
   */
  closeAddingItem(): void {
    this.deactivateAddingMode();
  }

  validateInsert(): boolean {
    return this.newFaq.answer === '' ||
           this.newFaq.question === '';
  }

  deactivateAddingMode(): void {
    this.helper.unsetGlobalAddingMode();
    this.clearInputs();
    this.addingMode = false;
    this.addLoading = false;
    this.editMode = false;
  }

  clearInputs(): void {
    this.newFaq = {
      question: '',
      answer: ''
    };
  }
}
