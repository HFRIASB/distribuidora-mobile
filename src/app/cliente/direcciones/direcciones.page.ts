import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.page.html',
  styleUrls: ['./direcciones.page.scss'],
})
export class DireccionesPage implements OnInit {

  direcciones = [
    { direccion_id: 1, direccion_nombre: 'Caseta San Martin', direccion_descripcion:'Puesto rojo #23',direccion_latitud: "-17.401472", direccion_longitud: "-66.155927" },
    { direccion_id: 2, direccion_nombre: 'Casa Laguna', direccion_descripcion:'Puesto verde #24',direccion_latitud: "-17.411392", direccion_longitud: "-66.144056" },
    { direccion_id: 3, direccion_nombre: 'Caseta Colcapirhua', direccion_descripcion:'Puesto azul #65',direccion_latitud: "-17.390750", direccion_longitud: "-66.228295" }
  ]

  image = "https://d19d5sz0wkl0lu.cloudfront.net/dims4/default/fa33b82/2147483647/resize/300x%3E/quality/90/?url=https%3A%2F%2Fatd-brightspot.s3.amazonaws.com%2Fhomer.png"

  constructor(private router: Router,private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
  }

  goProductos(){
    this.router.navigate(['/home'], 
    { 
      relativeTo: this.route,
      replaceUrl: true
    });
  }

  selecionarDireccion(direccion){
    this.router.navigate(['/direccion-vista'], 
    { 
      relativeTo: this.route,
      replaceUrl: true
    });
  }

   agregarDireccion(){
    this.router.navigate(['/nueva-direccion'], 
    { 
      relativeTo: this.route,
      replaceUrl: true
    });
  }

}
