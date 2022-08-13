import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pedido-vista',
  templateUrl: './pedido-vista.page.html',
  styleUrls: ['./pedido-vista.page.scss'],
})
export class PedidoVistaPage implements OnInit {
  isModalOpen = false;

  pedido = 
    { 
      pedido_id: 1,
      pedido_estado: "entregado",
      cliente: {
               cliente_nombre: "Henry",
               cliente_id: 1,
               },
      direccion:{
                direccion_id:1,
                direccion_nombre:"miamicito",
                direccion_descripcion:"caseta #12",
                direccion_latitude:-17.390750,
                direccion_longitude:-66.228295
                 },
      venta_fecha: new Date(),
      entrega_fecha: new Date(),
      productos: [
                 { producto: {
                             producto_id:1,
                             producto_nombre:"aceite"
                             }, 
                   cantidad: 1, 
                 },
                 {
                   producto: {
                             producto_id:2,
                             producto_nombre:"chesco"
                              }, 
                  cantidad: 1,
                 }
                  ]
    }

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
    handlerMessage = '';
    roleMessage = '';
  
  


  constructor(private router: Router, private route: ActivatedRoute, private alertController: AlertController,public toastController: ToastController) { }

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

  verDireccion() {
    this.router.navigate(['/direccion-pedido'], { relativeTo: this.route, replaceUrl: true })
  }
 
  goBack() {
    this.router.navigate(['/pedidos'], { relativeTo: this.route, replaceUrl: true })
  }

  async presentToast(texto, color) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

  btnEntregado(){
    this.presentToast("Pedido Entregado Exitosamente", 'primary');
  }

  async btnCancelado(){
    const alert = await this.alertController.create({
      header: '¿Esta seguro que desea cancelar el pedido?',
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
            this.presentToast("Pedido Cancelado", 'primary');
          },
        },
      ],
    });

    await alert.present();



    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;

  }

}
