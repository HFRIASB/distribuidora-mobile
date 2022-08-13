import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

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

  @ViewChild('map1')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center: any = {
    lat: this.direccion.direccion_latitud,
    lng: this.direccion.direccion_longitud,
    //lat: -17.401472,
    //lng: -66.155927,
  };
  markerId: string;
  handlerMessage = '';
  roleMessage = '';

  constructor(private router: Router, private route: ActivatedRoute, private alertController: AlertController,public toastController: ToastController, ) { }

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
    this.router.navigate(['/direcciones'], { relativeTo: this.route, replaceUrl: true })
  }

  async presentToast(texto, color) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

  async eliminarDireccion(){
    const alert = await this.alertController.create({
      header: '¿Desea eliminar la dirección?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
            this.presentToast("Dirección eliminada exitosamente", 'primary');
          },
        },
      ],
    });

    await alert.present();



    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;

  }
}
