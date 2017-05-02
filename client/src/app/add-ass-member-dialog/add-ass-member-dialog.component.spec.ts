import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssMemberDialogComponent } from './add-ass-member-dialog.component';

describe('AddAssMemberDialogComponent', () => {
  let component: AddAssMemberDialogComponent;
  let fixture: ComponentFixture<AddAssMemberDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssMemberDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssMemberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
