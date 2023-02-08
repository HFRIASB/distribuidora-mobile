import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
import { DireccionService } from 'src/app/services/direccion.service';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';

declare var google: any;
@Component({
  selector: 'app-nueva-direccion',
  templateUrl: './nueva-direccion.page.html',
  styleUrls: ['./nueva-direccion.page.scss'],
})
export class NuevaDireccionPage implements OnInit {
  image= "../../../assets/icon/logoEmpresa.png"

  isModalOpen = false;

  id_usuario = null;

  @ViewChild("map", { static: false }) mapRef: ElementRef;
  newMap: any;
  //newMap: GoogleMap;
  previusMarker;

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
      Geolocation.getCurrentPosition()
        .then(async resp => {
          let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
          let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }
          this.newMap = new google.maps.Map(
            this.mapRef.nativeElement,
            mapOptions
          )
  
          google.maps.event.addListener(this.newMap, 'click', (event) => {
              if (this.previusMarker) {
                this.previusMarker.setMap(null);
              }
              let latLng = event.latLng.toJSON();
              this.direccion.direccion_latitud = latLng.lat.toString();
              this.direccion.direccion_longitud = latLng.lng.toString();
              this.previusMarker = new google.maps.Marker({
                position: latLng,
                map: this.newMap,
                icon: {
                  //url: "assets/icon/icons8-location-50.png",
                  scale: 4
                }
              })
            })
          })
          
    
      }
      async addMarker(lat, lng) {
        //Add a marker to he map
        this.previusMarker = new google.maps.Marker({
          position:{
            lat:lat,
            lng:lng
          },
          map: this.newMap,
          icon: {
            url: "assets/icon/icons8-location-50.png",
            scale: 4
          }
        })
      }

  async removeMarker(id?) {
    await this.newMap.removeMarker(id ? id : this.markerId);
  }

  async addListeners() {
    //Handle marker click
    google.maps.event.addListener(this.newMap, 'click', (event) => {
      if (this.previusMarker) {
        this.previusMarker.setMap(null);
      }
      let latLng = event.latLng.toJSON();
      this.direccion.direccion_latitud = event.latitude;      //guardar latitude
      this.direccion.direccion_longitud = event.longitude; 
      this.addMarker(event.latitude, event.longitude);
    })
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
