import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { OrdenService } from 'src/app/services/orden.service';
import { Rol } from 'src/app/models/rol';

@Component({
  selector: 'app-detalle-cobro',
  templateUrl: './detalle-cobro.page.html',
  styleUrls: ['./detalle-cobro.page.scss'],
})
export class DetalleCobroPage implements OnInit {
  image = "../../../assets/icon/logoEmpresa.png"

  repartidor:Usuario = new Usuario();
  cliente: Usuario = new Usuario();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public toastController: ToastController,
    private alertController: AlertController,
    private ordenService: OrdenService
  ) {
    this.cliente.pago = []

    console.log(this.repartidor.rol)
    this.route.params.subscribe(params => {
      this.authService.getUsuarioById(params.id_repartidor).subscribe((repartidor: Usuario) => {
        this.repartidor = repartidor
        
      })
      this.authService.getDetalleCliente(params.id_cliente).subscribe((cliente: Usuario) => {
        this.cliente = cliente;

        this.cliente.pago = this.ordenService.transformarFechaPago(cliente.pago)
      })
    })
  }

  ngOnInit() {
  }

  async presentToast(texto, color) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

  async realizarPagoAlert() {
    const alert = await this.alertController.create({
      header: 'Por favor ingrese el monto que esta cancelando el cliente: ' + this.cliente.nombre_usu,
      buttons: [
        {
          text: 'AGREGAR PAGO',
          handler: (data) => {
            if (data.monto_a_pagar > 0) {
              this.ordenService.hacerPago(this.cliente.id_usu, data.monto_a_pagar).subscribe(dato => {
                this.presentToast("Se realizó el pago exitosamente", 'primary');
                location.reload();
              })
            } else {
              this.presentToast("Error: Elija un número mayor a 0", 'danger');
              this.realizarPagoAlert();
            }
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
          name: 'monto_a_pagar',
          placeholder: 'Monto',
          min: 1
        }
      ]

    });

    await alert.present();
  }

  hacerPago() {

  }

  goBack() {
    this.router.navigate(['/cobros', this.repartidor.id_usu], { relativeTo: this.route, replaceUrl: true })
  }

}
