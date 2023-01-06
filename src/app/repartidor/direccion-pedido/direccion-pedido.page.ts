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
    console.log("si agarraaaaa",direccion)
    try {
      this.newMap = await GoogleMap.create({
        id: 'capacitor-google-maps',
        element: this.mapRef.nativeElement,
        apiKey: environment.google_maps_api_key,
        config: {
          center: {
            // The initial position to be rendered by the map
            lat: Number(this.direccion.lat_direc),
            lng: Number(this.direccion.lng_direc),
          },
          zoom: 18,
        },
      });

      //Habilitar mi Ubicacion
      //await this.newMap.enableCurrentLocation(true);

      this.addMarker(Number(this.direccion.lat_direc), Number(this.direccion.lng_direc));
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
