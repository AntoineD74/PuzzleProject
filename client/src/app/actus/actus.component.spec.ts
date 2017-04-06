/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ActusComponent } from './actus.component';

describe('ActusComponent', () => {
  let component: ActusComponent;
  let fixture: ComponentFixture<ActusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
