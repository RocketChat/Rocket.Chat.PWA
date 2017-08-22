import { TestBed, inject } from '@angular/core/testing';

import { AuthgaurdService } from './authgaurd.service';

describe('AuthgaurdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthgaurdService]
    });
  });

  it('should be created', inject([AuthgaurdService], (service: AuthgaurdService) => {
    expect(service).toBeTruthy();
  }));
});
