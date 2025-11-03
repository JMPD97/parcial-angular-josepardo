import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';
import { HttpClientModule } from '@angular/common/http';

import { VehiculoListComponent } from './vehiculo-list.component';
import { VehiculoService } from '../vehiculo.service';
import { Vehiculo } from '../vehiculo';

describe('VehiculoListComponent', () => {
  let component: VehiculoListComponent;
  let fixture: ComponentFixture<VehiculoListComponent>;
  let debug: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [VehiculoListComponent],
      providers: [VehiculoService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculoListComponent);
    component = fixture.componentInstance;

    // Crear 3 vehículos con faker
    for(let i = 0; i < 3; i++) {
      const vehiculo = new Vehiculo(
        faker.number.int(),
        faker.vehicle.manufacturer(),
        faker.vehicle.model(),
        faker.vehicle.type(),
        faker.number.int({ min: 2010, max: 2023 }),
        faker.number.int({ min: 10000, max: 100000 }),
        faker.vehicle.color(),
        faker.image.url()
      );
      component.vehiculos.push(vehiculo);
    }

    component.calcularTotalesPorMarca();
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a table with 3 rows plus header', () => {
    const tableRows = debug.queryAll(By.css('tbody tr'));
    expect(tableRows.length).toBe(3);

    const tableHeader = debug.queryAll(By.css('thead tr'));
    expect(tableHeader.length).toBe(1);
  });

  it('should have 3 table rows with vehicle data', () => {
    const rows = debug.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(3);

    rows.forEach((row, index) => {
      const cells = row.queryAll(By.css('td'));
      expect(cells[0].nativeElement.textContent).toContain((index + 1).toString());
      expect(cells[1].nativeElement.textContent).toContain(component.vehiculos[index].marca);
      expect(cells[2].nativeElement.textContent).toContain(component.vehiculos[index].linea);
      expect(cells[3].nativeElement.textContent).toContain(component.vehiculos[index].modelo.toString());
    });
  });

  it('should have table header with correct columns', () => {
    const headerCells = debug.queryAll(By.css('thead th'));
    expect(headerCells.length).toBe(4);
    expect(headerCells[0].nativeElement.textContent).toContain('#');
    expect(headerCells[1].nativeElement.textContent).toContain('Marca');
    expect(headerCells[2].nativeElement.textContent).toContain('Línea');
    expect(headerCells[3].nativeElement.textContent).toContain('Modelo');
  });

  it('should calculate brand totals correctly', () => {
    expect(Object.keys(component.totalesPorMarca).length).toBeGreaterThan(0);
  });

  it('should display brand totals', () => {
    const brandTotals = debug.queryAll(By.css('.tables-container div div'));
    expect(brandTotals.length).toBe(Object.keys(component.totalesPorMarca).length);
  });
});