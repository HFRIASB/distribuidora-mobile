import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Direccion } from 'src/app/models/direccion';
import { Orden } from 'src/app/models/orden';
import { Usuario } from 'src/app/models/usuario';
import { OrdenService } from 'src/app/services/orden.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.page.html',
  styleUrls: ['./detalle-pedido.page.scss'],
})
export class DetallePedidoPage implements OnInit {

  image= "../../../assets/icon/logoEmpresa.png"
  id_usuario = null;//id

  handlerMessage = '';
  roleMessage = '';

 orden: Orden = new Orden() 
  constructor(
    private router: Router, 
    private route: ActivatedRoute,  
    private alertController: AlertController,
    public toastController: ToastController,
    private ordenService: OrdenService
  ) {
    this.orden.direccion= new Direccion();
    this.orden.usuario = new Usuario();//Usuario
    this.route.params.subscribe(params => {
      this.id_usuario = params.id_user;//id
      this.ordenService.getOrdenById(+params.id_ord).subscribe((detalle: Orden) => {
        this.orden = this.ordenService.transformarDate(detalle)
        console.log(this.orden)
      })
    });
  }

  ngOnInit() {
  }
  goBack(){
    this.router.navigate(['/pedido-cliente', this.id_usuario],//id
    {
      relativeTo: this.route,
      replaceUrl: true
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

  async goCerrarSesion(){
    const alert = await this.alertController.create({
      header: '¿Desea salir de su cuenta?',
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
  
            this.router.navigate(['/login'],
            {
              relativeTo: this.route,
              replaceUrl: true
            });
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;

  }
  



}
