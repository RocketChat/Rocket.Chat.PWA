import { TestBed, inject } from '@angular/core/testing';

import { ValueService } from './value.service';

describe('ValueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValueService]
    });
  });

  it('should be created', inject([ValueService], (service: ValueService) => {
    expect(service).toBeTruthy();
  }));
});
