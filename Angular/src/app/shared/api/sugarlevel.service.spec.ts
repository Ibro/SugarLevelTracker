import { TestBed, inject } from '@angular/core/testing';

import { SugarLevelService } from './sugar-level.service';

describe('SugarLevelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SugarLevelService]
    });
  });

  it('should be created', inject([SugarLevelService], (service: SugarLevelService) => {
    expect(service).toBeTruthy();
  }));
});
