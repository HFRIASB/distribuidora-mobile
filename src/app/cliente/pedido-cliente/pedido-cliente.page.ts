import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Orden } from 'src/app/models/orden';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { OrdenService } from 'src/app/services/orden.service';

@Component({
  selector: 'app-pedido-cliente',
  templateUrl: './pedido-cliente.page.html',
  styleUrls: ['./pedido-cliente.page.scss'],
})
export class PedidoClientePage implements OnInit {

  image= "../../../assets/icon/logoEmpresa.png"
  pedidos = [];

  user = new Usuario;

  handlerMessage = '';
  roleMessage = '';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    public toastController: ToastController,
    private authService: AuthService,
    private ordenService: OrdenService) {
    this.route.params.subscribe(params => {
      this.authService.getUsuarioById(params.id).subscribe((user: Usuario) => {
        this.user = user;
      })
      this.authService.getUsuarioOrden(params.id, "Pendiente").subscribe((pedidos: Orden[]) => {
        pedidos.forEach(pedido => {
          this.pedidos.push(this.ordenService.transformarDate(pedido))
        });
      })
    });
  }

  ngOnInit() {
  }

  goProducto() {
    this.router.navigate(['/home', this.user.id_usu],//id
      {
        relativeTo: this.route,
        replaceUrl: true
      });
  }

  goDirecciones() {
    this.router.navigate(['/direcciones', this.user.id_usu],
      {
        relativeTo: this.route,
        replaceUrl: true
      });
  }

  abrirPedido(pedido) {
    console.log(pedido)
    this.router.navigate(['/detalle-pedido', this.user.id_usu, pedido.id_ord],
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


  async goCerrarSesion() {
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
