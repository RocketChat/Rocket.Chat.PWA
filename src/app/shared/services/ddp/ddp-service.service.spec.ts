import { TestBed, inject } from '@angular/core/testing';

import { DDPService } from './ddp-service.service';

describe('DdpServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DDPService]
    });
  });

  it('should be created', inject([DDPService], (service: DDPService) => {
    expect(service).toBeTruthy();
  }));
});
