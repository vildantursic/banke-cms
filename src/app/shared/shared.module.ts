import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchBoxComponent } from './search-box/search-box.component';
import { MaterialModule } from './material-design/material-design.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SubToolbarComponent } from './sub-toolbar/sub-toolbar.component';
import { ReleaseDialogComponent } from './dialog/release-dialog.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { TabsComponent } from './tabs/tabs.component';
import { DsTagsComponent } from './ds-tags/ds-tags.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { LoadingComponent } from './loading/loading.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { DsSelectableTagsComponent } from './ds-selectable-tags/ds-selectable-tags.component';
import { ConfirmRemovalDialogComponent } from './confirm-removal-dialog/confirm-removal-dialog.component';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { ChooseImageDialogComponent } from './choose-image-dialog/choose-image-dialog.component';

@NgModule({
  declarations: [
    SearchBoxComponent,
    ToolbarComponent,
    SubToolbarComponent,
    ReleaseDialogComponent,
    UploadFileComponent,
    TabsComponent,
    DsTagsComponent,
    FileUploadComponent,
    LoadingComponent,
    DsTagsComponent,
    ConfirmationDialogComponent,
    DsSelectableTagsComponent,
    ConfirmRemovalDialogComponent,
    BlogCardComponent,
    ChooseImageDialogComponent,
  ],
  exports: [
    SearchBoxComponent,
    ToolbarComponent,
    SubToolbarComponent,
    ReleaseDialogComponent,
    UploadFileComponent,
    TabsComponent,
    DsTagsComponent,
    FileUploadComponent,
    LoadingComponent,
    ConfirmationDialogComponent,
    DsSelectableTagsComponent,
    ConfirmRemovalDialogComponent,
    BlogCardComponent,
    ChooseImageDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    ReleaseDialogComponent,
    ConfirmationDialogComponent,
    ConfirmRemovalDialogComponent,
    ChooseImageDialogComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
