import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { DireccionService } from 'src/app/services/direccion.service';
import { Direccion } from 'src/app/models/direccion';

@Component({
  selector: 'app-direccion-vista',
  templateUrl: './direccion-vista.page.html',
  styleUrls: ['./direccion-vista.page.scss'],
})
export class DireccionVistaPage implements OnInit {
  image= "../../../assets/icon/logoEmpresa.png"

  id_usuario = null;//id

  direccion: Direccion = new Direccion();

  @ViewChild('map1')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center:any;
  markerId: string;
  handlerMessage = '';
  roleMessage = '';

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private alertController: AlertController,
    public toastController: ToastController,
    private direccionService: DireccionService) { 
      this.route.params.subscribe(params => {
        console.log(params)//
        this.id_usuario = params.id_user;//id
        this.direccionService.getDireccionById(params.id_direccion).subscribe((direccion:Direccion)=>{
          this.direccion=direccion;
          this.createMap(this.direccion);
        })
      })
    }

  ngOnInit() {
  }

  // ngAfterViewInit() {
  //   this.createMap(this.direccion);
  // }

  async createMap(direccion) {
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
    this.router.navigate(['/direcciones', this.id_usuario], { relativeTo: this.route, replaceUrl: true })
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
