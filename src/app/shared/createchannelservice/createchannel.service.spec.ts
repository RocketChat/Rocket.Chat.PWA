import { TestBed, inject } from '@angular/core/testing';

import { CreatechannelService } from './createchannel.service';

describe('CreatechannelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreatechannelService]
    });
  });

  it('should be created', inject([CreatechannelService], (service: CreatechannelService) => {
    expect(service).toBeTruthy();
  }));
});
