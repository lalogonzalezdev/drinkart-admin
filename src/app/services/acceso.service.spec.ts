/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AccesoService } from './acceso.service';

describe('Service: Acceso', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccesoService]
    });
  });

  it('should ...', inject([AccesoService], (service: AccesoService) => {
    expect(service).toBeTruthy();
  }));
});
