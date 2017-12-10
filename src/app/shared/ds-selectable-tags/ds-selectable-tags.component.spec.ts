import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsSelectableTagsComponent } from './ds-selectable-tags.component';

describe('DsSelectableTagsComponent', () => {
  let component: DsSelectableTagsComponent;
  let fixture: ComponentFixture<DsSelectableTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsSelectableTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsSelectableTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
