import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../vehiculo';
import { VehiculoService } from '../vehiculo.service';

@Component({
  selector: 'app-vehiculo-list',
  templateUrl: './vehiculo-list.component.html',
  styleUrls: ['./vehiculo-list.component.css']
})
export class VehiculoListComponent implements OnInit {

  vehiculos: Array<Vehiculo> = [];
  totalesPorMarca: { [marca: string]: number } = {};

  constructor(private VehiculoService: VehiculoService) { } // ← minúscula 'v'

  getVehiculos(): void {
    this.VehiculoService.getVehiculos().subscribe((vehiculos: Vehiculo[]) => { // ← minúscula 'v' y tipo explícito
      this.vehiculos = vehiculos;
      this.calcularTotalesPorMarca();
    });
  }
  calcularTotalesPorMarca(): void {
    this.totalesPorMarca = {};
    this.vehiculos.forEach(vehiculo => {
      this.totalesPorMarca[vehiculo.marca] = (this.totalesPorMarca[vehiculo.marca] || 0) + 1;
    });
  }
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  ngOnInit() {
    this.getVehiculos();
  }
}