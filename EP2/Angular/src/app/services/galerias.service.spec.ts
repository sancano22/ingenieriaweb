import { TestBed } from '@angular/core/testing';

import { GaleriasService } from './galerias.service';

describe('GaleriasService', () => {
  let service: GaleriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GaleriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
