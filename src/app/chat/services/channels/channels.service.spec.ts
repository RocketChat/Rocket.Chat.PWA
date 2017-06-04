import { TestBed, inject } from '@angular/core/testing';

import { ChannelsService } from './channels.service';

describe('ChannelsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChannelsService]
    });
  });

  it('should be created', inject([ChannelsService], (service: ChannelsService) => {
    expect(service).toBeTruthy();
  }));
});
