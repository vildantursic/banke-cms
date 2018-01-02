import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseImageDialogComponent } from './choose-image-dialog.component';

describe('ChooseImageDialogComponent', () => {
  let component: ChooseImageDialogComponent;
  let fixture: ComponentFixture<ChooseImageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseImageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
