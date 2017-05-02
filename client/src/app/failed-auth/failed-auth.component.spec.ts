import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedAuthComponent } from './failed-auth.component';

describe('FailedAuthComponent', () => {
  let component: FailedAuthComponent;
  let fixture: ComponentFixture<FailedAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailedAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
