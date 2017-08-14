import { TestBed, inject } from '@angular/core/testing';

import { AttachfileService } from './attachfile.service';

describe('AttachfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttachfileService]
    });
  });

  it('should be created', inject([AttachfileService], (service: AttachfileService) => {
    expect(service).toBeTruthy();
  }));
});
