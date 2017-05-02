import { TestBed, inject } from '@angular/core/testing';

import { GrowlMessagesService } from './growl-messages.service';

describe('GrowlMessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GrowlMessagesService]
    });
  });

  it('should ...', inject([GrowlMessagesService], (service: GrowlMessagesService) => {
    expect(service).toBeTruthy();
  }));
});
