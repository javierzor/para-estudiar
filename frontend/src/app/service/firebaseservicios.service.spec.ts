import { TestBed } from '@angular/core/testing';

import { FirebaseserviciosService } from './firebaseservicios.service';

describe('FirebaseserviciosService', () => {
  let service: FirebaseserviciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseserviciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
