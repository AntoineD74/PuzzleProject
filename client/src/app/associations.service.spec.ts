import { TestBed, inject } from '@angular/core/testing';

import { AssociationsService } from './associations.service';

describe('AssociationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssociationsService]
    });
  });

  it('should ...', inject([AssociationsService], (service: AssociationsService) => {
    expect(service).toBeTruthy();
  }));
});
