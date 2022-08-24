import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-cobros',
  templateUrl: './cobros.page.html',
  styleUrls: ['./cobros.page.scss'],
})
export class CobrosPage implements OnInit {
  image= "../../../assets/icon/logoEmpresa.png"
  clientes:Usuario[]=[];
  repartidor_id = null;

  constructor(
    private alertController: AlertController,
    private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService ) { 
      this.route.params.subscribe(params => {
        this.repartidor_id = params.id
      })
      this.authService.getOnlyClientes().subscribe((clientes: Usuario[])=>{
        this.clientes = clientes;
      })
    }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Por favor ingrese el monto cobrado',
      buttons: [
        {
          text: 'AÑADIR',
          handler: (data) => {
          }
        },
        {
          text: 'CANCELAR',
          role: 'cancelar'
        }
      ],
      inputs: [
        {
          type: 'number',
          name: 'monto',
          placeholder: 'Monto'
        }
      ]
    });

    await alert.present();
  }

  goNuevoPedido(){
    this.router.navigate(['/nuevo-pedido', this.repartidor_id],//id
    {
      relativeTo: this.route,
      replaceUrl: true
    });
  }

  goPedidos(){
    this.router.navigate(['/pedidos', this.repartidor_id],
    {
      relativeTo: this.route,
      replaceUrl: true
    });
  }

  goDetalleCobro(cliente: Usuario){
    this.router.navigate(['/detalle-cobro', this.repartidor_id, cliente.id_usu.toString()], 
    {
      relativeTo: this.route,
      replaceUrl: true
    });
  }

  async goCerrarSesion(){
    const alert = await this.alertController.create({
      header: '¿Desea salir de su cuenta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          },
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
  
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

  }

}
