import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-direccion-vista',
  templateUrl: './direccion-vista.page.html',
  styleUrls: ['./direccion-vista.page.scss'],
})
export class DireccionVistaPage implements OnInit {
  direccion=
  { 
    direccion_id: 1, 
    direccion_nombre: 'Caseta San Martin', 
    direccion_descripcion:'Puesto rojo #23',
    direccion_latitud: "-17.401472", 
    direccion_longitud: "-66.155927" 
  };

  constructor() { }

  ngOnInit() {
  }

}
