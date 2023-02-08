import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Direccion } from 'src/app/models/direccion';
import { DireccionService } from 'src/app/services/direccion.service';
import { OrdenService } from 'src/app/services/orden.service';
import { Orden } from 'src/app/models/orden';
import { Usuario } from 'src/app/models/usuario';

declare var google: any;
@Component({
  selector: 'app-direccion-pedido',
  templateUrl: './direccion-pedido.page.html',
  styleUrls: ['./direccion-pedido.page.scss'],
})
export class DireccionPedidoPage implements OnInit {
  image= "../../../assets/icon/logoEmpresa.png"


  @ViewChild("map", { static: false }) mapElement: ElementRef;
  map: any;
  center: any;
  markerId: string;
  idRepartidor = null;
  orden: Orden = new Orden();
  direccion: Direccion = new Direccion();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ordenService: OrdenService) {
    this.orden.usuario = new Usuario();
    this.orden.direccion = new Direccion();
    this.route.params.subscribe(params => {
      this.idRepartidor = params.idUsuario
      this.ordenService.getOrdenWithDireccion(params.idOrden).subscribe((datos: Orden)=>{
        console.log(datos.direccion,"estos")
        this.orden=datos;
        this.direccion = datos.direccion;
        this.createMap(this.direccion)
      })
      
    })
  }

  ngOnInit() {
  }

  async createMap(direccion) {
    let latLng = new google.maps.LatLng(+this.direccion.lat_direc, +this.direccion.lng_direc);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          "featureType": "poi",
          "stylers": [
            { "visibility": "off" }
          ]
        }
      ]
    };
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      mapOptions
    ) 
    let mapMarker = new google.maps.Marker({
      position: latLng,
      icon: {
        color: '#fecb00',
        //url: "assets/icon/icons8-location-50.png",
        scale: 4
      }
    })
    mapMarker.setMap(this.map)
  }
 
  goBack() {
    this.router.navigate(['/pedido-vista', this.idRepartidor, this.orden.id_ord.toString()], { relativeTo: this.route, replaceUrl: true })
  }


}
