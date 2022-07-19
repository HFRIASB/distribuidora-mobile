import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-direccion-pedido',
  templateUrl: './direccion-pedido.page.html',
  styleUrls: ['./direccion-pedido.page.scss'],
})
export class DireccionPedidoPage implements OnInit {

  
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center: any = {
    //lat: this.pedido.direccion.direccion_latitude,
    //lng: this.pedido.direccion.direccion_longitude,
    lat: -17.401472,
    lng: -66.155927,
  };
  markerId: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

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

  goBack() {
    this.router.navigate(['/pedido-vista'], { relativeTo: this.route, replaceUrl: true })
  }


}
