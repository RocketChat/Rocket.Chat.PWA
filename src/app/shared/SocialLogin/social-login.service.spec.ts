import { TestBed, inject } from '@angular/core/testing';

import { SocialLoginService } from './social-login.service';

describe('SocialLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocialLoginService]
    });
  });

  it('should be created', inject([SocialLoginService], (service: SocialLoginService) => {
    expect(service).toBeTruthy();
  }));
});
