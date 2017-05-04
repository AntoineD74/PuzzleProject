import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationOverviewComponent } from './association-overview.component';

describe('AssociationOverviewComponent', () => {
  let component: AssociationOverviewComponent;
  let fixture: ComponentFixture<AssociationOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociationOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
