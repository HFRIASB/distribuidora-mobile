import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { OrdenService } from 'src/app/services/orden.service';
import { Orden } from 'src/app/models/orden';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  image= "../../../assets/icon/logoEmpresa.png"
  usuario_repartidor: Usuario = new Usuario();

  handlerMessage = '';
  roleMessage = '';
  ordenes: Orden[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    public toastController: ToastController,
    private authService: AuthService,
    private ordenService: OrdenService) {
    this.route.params.subscribe(params => {
      this.authService.getUsuarioById(params.idUsuario).subscribe((user: Usuario) => {
        this.usuario_repartidor = user;
      })
      this.ordenService.getOrdenes("Pendiente").subscribe((detalle: Orden[]) => {
        detalle.forEach(element => {
          this.ordenes.push(this.ordenService.transformarDate(element))
        });
      })
    })
  }

  ngOnInit() {
  }

  abrirPedido(id) {
    this.router.navigate(['/pedido-vista', this.usuario_repartidor.id_usu.toString(), id.toString()],
      {
        relativeTo: this.route,
        replaceUrl: true
      });
  }

  goNPedido() {
    this.router.navigate(['/nuevo-pedido', this.usuario_repartidor.id_usu.toString()],
      {
        relativeTo: this.route,
        replaceUrl: true
      });
  }

  goCobros() {
    this.router.navigate(['/cobros', this.usuario_repartidor.id_usu.toString()],
      {
        relativeTo: this.route,
        replaceUrl: true
      });
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
