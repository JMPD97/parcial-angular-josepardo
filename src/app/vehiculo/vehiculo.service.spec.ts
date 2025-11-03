import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VehiculoService } from './vehiculo.service';

describe('Service: Vehiculo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehiculoService]
    });
  });

  it('should be created', () => {
    const service: VehiculoService = TestBed.inject(VehiculoService);
    expect(service).toBeTruthy();
  });
});