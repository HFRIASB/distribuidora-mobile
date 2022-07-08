import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-direccion-vista',
  templateUrl: './direccion-vista.page.html',
  styleUrls: ['./direccion-vista.page.scss'],
})
export class DireccionVistaPage implements OnInit {

  direccion =
    {
      direccion_id: 1,
      direccion_nombre: 'Caseta San Martin',
      direccion_descripcion: 'Puesto rojo #23',
      direccion_latitud: -17.401472,
      direccion_longitud: -66.155927
    };

  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center: any = {
    lat: this.direccion.direccion_latitud,
    lng: this.direccion.direccion_longitud,
    //lat: -17.401472,
    //lng: -66.155927,
  };
  markerId: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.createMap();
  }

  async createMap() {
    try {
      this.newMap = await GoogleMap.create({
        id: 'capacitor-google-maps',
        element: this.mapRef.nativeElement,
        apiKey: environment.google_maps_api_key,
        config: {
          center: this.center,
          zoom: 18,
        },
      });

      //Habilitar mi Ubicacion
      //await this.newMap.enableCurrentLocation(true);

      this.addMarker(this.center.lat, this.center.lng);
    } catch (e) {
      console.log(e);
    }
  }

  async addMarker(lat, lng) {
    //Add a marker to he map
    this.markerId = await this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng,
      },
      title: "Mi Casa",
      draggable: false
    });
  }
}
