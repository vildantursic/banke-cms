import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DsTagsComponent } from './ds-tags.component';

describe('DsTagsComponent', () => {
  let component: DsTagsComponent;
  let fixture: ComponentFixture<DsTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DsTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
