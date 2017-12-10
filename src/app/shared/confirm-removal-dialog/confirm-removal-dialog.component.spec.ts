import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRemovalDialogComponent } from './confirm-removal-dialog.component';

describe('ConfirmRemovalDialogComponent', () => {
  let component: ConfirmRemovalDialogComponent;
  let fixture: ComponentFixture<ConfirmRemovalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmRemovalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRemovalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
