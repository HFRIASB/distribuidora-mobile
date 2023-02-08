import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { DireccionService } from 'src/app/services/direccion.service';
import { Direccion } from 'src/app/models/direccion';

declare var google: any;
@Component({
  selector: 'app-direccion-vista',
  templateUrl: './direccion-vista.page.html',
  styleUrls: ['./direccion-vista.page.scss'],
})
export class DireccionVistaPage implements OnInit {
  image= "../../../assets/icon/logoEmpresa.png"

  id_usuario = null;//id

  direccion: Direccion = new Direccion();

  @ViewChild("map", { static: false }) mapElement: ElementRef;
  map: any;
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
        //url: "assets/icon/icons8-location-50.png",
        scale: 4
      }
    })
    mapMarker.setMap(this.map)
  }

  // async addMarker(lat, lng) {
  //   //Add a marker to he map
  //   this.markerId = await this.newMap.addMarker({
  //     coordinate: {
  //       lat: lat,
  //       lng: lng,
  //     },
  //     title: "Mi Casa",
  //     draggable: false
  //   });
  // }

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
