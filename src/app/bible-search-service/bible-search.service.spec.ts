import { TestBed, inject } from '@angular/core/testing';

import { BibleSearchService } from './bible-search.service';

describe('BibleSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BibleSearchService]
    });
  });

  it('should be created', inject([BibleSearchService], (service: BibleSearchService) => {
    expect(service).toBeTruthy();
  }));
});
