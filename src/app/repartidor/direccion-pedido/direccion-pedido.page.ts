import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Direccion } from 'src/app/models/direccion';
import { DireccionService } from 'src/app/services/direccion.service';
import { OrdenService } from 'src/app/services/orden.service';
import { Orden } from 'src/app/models/orden';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-direccion-pedido',
  templateUrl: './direccion-pedido.page.html',
  styleUrls: ['./direccion-pedido.page.scss'],
})
export class DireccionPedidoPage implements OnInit {
  image= "../../../assets/icon/logoEmpresa.png"


  @ViewChild('map3')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center: any = {
    //lat: this.pedido.direccion.direccion_latitude,
    //lng: this.pedido.direccion.direccion_longitude,
    lat: -17.331139,
    lng: -66.226015
  };
  markerId: string;
  idRepartidor = null;
  orden: Orden = new Orden();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ordenService: OrdenService) {
    this.orden.usuario = new Usuario();
    this.orden.direccion = new Direccion();
    this.route.params.subscribe(params => {
      this.idRepartidor = params.idUsuario
      this.ordenService.getOrdenWithDireccion(params.idOrden).subscribe((datos: Orden)=>{
        this.orden = datos
      })
      
    })
  }

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
    this.router.navigate(['/pedido-vista', this.idRepartidor, this.orden.id_ord.toString()], { relativeTo: this.route, replaceUrl: true })
  }


}
