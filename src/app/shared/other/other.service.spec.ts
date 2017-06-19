import { TestBed, inject } from '@angular/core/testing';

import { OtherService } from './other.service';

describe('OtherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OtherService]
    });
  });

  it('should be created', inject([OtherService], (service: OtherService) => {
    expect(service).toBeTruthy();
  }));
});
