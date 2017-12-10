import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatIconModule,
  MatCardModule,
  MatGridListModule,
  MatChipsModule,
  MatTableModule,
  MatProgressBarModule,
  MatDialogModule,
  MatSortModule,
  MatMenuModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatSelectModule,
  MatTabsModule,
  MatButtonToggleModule,
  MatSliderModule,
  MatAutocompleteModule,
  MatRadioModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatTableModule,
    CdkTableModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSortModule,
    MatMenuModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSelectModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatProgressSpinnerModule
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    BrowserAnimationsModule
  ]
})
export class MaterialModule { }

