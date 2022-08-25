import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
import { DireccionService } from 'src/app/services/direccion.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-nueva-direccion',
  templateUrl: './nueva-direccion.page.html',
  styleUrls: ['./nueva-direccion.page.scss'],
})
export class NuevaDireccionPage implements OnInit {
  image= "../../../assets/icon/logoEmpresa.png"

  isModalOpen = false;

  id_usuario = null;

  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center: any = {
    lat: -17.380771,
    lng: -66.153296,
  };
  markerId: string;

  direccion =
    {
      direccion_nombre: null,
      direccion_descripcion: null,
      direccion_latitud: null,
      direccion_longitud: null
    };

  constructor(private router: Router,
    private alertController: AlertController,
    public toastController: ToastController,
    private route: ActivatedRoute,
    private direccionService: DireccionService) {
    this.route.params.subscribe(params => {
      console.log(params)//
      this.id_usuario = params.idUsuario;//id
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
          zoom: 13,
        },
      });

      //Habilitar mi Ubicacion
      await this.newMap.enableCurrentLocation(true);

      this.addListeners();
    } catch (e) {
      console.log(e);
    }
  }

  async addMarker(lat, lng) {
    //Add a marker to he map
    if (this.markerId) this.removeMarker();
    this.markerId = await this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng,
      },
      //title: ,
      draggable: true
    });
  }

  async removeMarker(id?) {
    await this.newMap.removeMarker(id ? id : this.markerId);
  }

  async addListeners() {
    //Handle marker click

    await this.newMap.setOnMapClickListener((event) => {
      console.log('setOnMapClickListener', event);
      this.direccion.direccion_latitud = event.latitude;      //guardar latitude
      this.direccion.direccion_longitud = event.longitude;    //guardar longitude
      this.addMarker(event.latitude, event.longitude);
    });

    await this.newMap.setOnMyLocationButtonClickListener((event) => {
      console.log('setOnMyLocationButtonClickListener', event);
      //this.addMarker(event.latitude, event.longitude);
    });

    await this.newMap.setOnMyLocationClickListener((event) => {
      console.log('setOnMyLocationClickListener', event);
      //this.addMarker(event.latitude, event.longitude);
    });

  }

  confirmarUbiacion(isOpen) {
    console.log(this.direccion)
    if (this.direccion.direccion_latitud != null) {
      this.isModalOpen = isOpen;
    } else {
      this.presentToast("Por favor selecione una ubicación", 'danger');
    }
  }

  guardarUbicaion(form) {
    this.direccion.direccion_nombre = form.value.direccion_nombre;
    this.direccion.direccion_descripcion = form.value.direccion_descripcion;
    console.log(this.direccion);
    let nuevaDireccion = {
      nombre_direc: this.direccion.direccion_nombre,
      descripcion_direc: this.direccion.direccion_descripcion,
      lat_direc: this.direccion.direccion_latitud.toString(),
      lng_direc: this.direccion.direccion_longitud.toString(),
      usuario: Number(this.id_usuario),
      //rubro_direc: "Tienda2", AGREGAR DESPUES EN VISTA Y TS
      //telefono_direc: "4444454", AGREGAR DESPUES EN VISTA Y TS
    }
    this.direccionService.postDireccion(nuevaDireccion).subscribe(datos=>{
      this.presentToast("Dirección agregada exitosamente", 'primary');
      this.isModalOpen = false;
      this.alertSaveDireccion();
      
    });
  }

  async presentToast(texto, color) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

  async alertSaveDireccion() {
    const alert = await this.alertController.create({
      header: 'Dirección Guardada',
      message: 'Dirección guardada exitosamente, será redireccionado a su lista de direcciones',
      buttons: [{
        text: "OK",
        handler: () => {
          this.router.navigate(['/direcciones', this.id_usuario], { relativeTo: this.route, replaceUrl: true })
        }
      }],
    });
    await alert.present();
  }


  goBack() {
    this.router.navigate(['/direcciones', this.id_usuario], { relativeTo: this.route, replaceUrl: true })
  }

}
