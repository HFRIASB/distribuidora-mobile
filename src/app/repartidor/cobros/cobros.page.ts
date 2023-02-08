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
  
  repartidor = new Usuario();

  constructor(
    private alertController: AlertController,
    private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService ) { 
      this.route.params.subscribe(params => {
        this.authService.getUsuarioById(params.id).subscribe((data: Usuario)=>{
          this.repartidor=data
          console.log(this.repartidor)
        })
      })
      this.authService.getOnlyClientes().subscribe((clientes: Usuario[])=>{
        clientes.forEach(element => {
          if(element.deuda_usu>0)
          {
            this.clientes.unshift(element)
          }  
        });
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
    this.router.navigate(['/nuevo-pedido', this.repartidor.id_usu],//id
    {
      relativeTo: this.route,
      replaceUrl: true
    });
  }

  goPedidos(){
    this.router.navigate(['/pedidos', this.repartidor.id_usu],
    {
      relativeTo: this.route,
      replaceUrl: true
    });
  }

  goDetalleCobro(cliente: Usuario){
    this.router.navigate(['/detalle-cobro', this.repartidor.id_usu, cliente.id_usu.toString()], 
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
