import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssociationsComponent } from './admin-associations.component';

describe('AdminAssociationsComponent', () => {
  let component: AdminAssociationsComponent;
  let fixture: ComponentFixture<AdminAssociationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAssociationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAssociationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
