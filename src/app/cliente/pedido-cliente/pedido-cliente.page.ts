import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pedido-cliente',
  templateUrl: './pedido-cliente.page.html',
  styleUrls: ['./pedido-cliente.page.scss'],
})
export class PedidoClientePage implements OnInit {

  image = "https://d19d5sz0wkl0lu.cloudfront.net/dims4/default/fa33b82/2147483647/resize/300x%3E/quality/90/?url=https%3A%2F%2Fatd-brightspot.s3.amazonaws.com%2Fhomer.png"
 
  pedidos=[];

 /* pedidos = [
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
    },
    { 
      pedido_id: 2,
      pedido_estado: "cancelado",
      cliente: {
               cliente_nombre: "Jhoel",
               cliente_id: 2,
               },
      direccion:{
                direccion_id:2,
                direccion_nombre:"Colonial",
                direccion_descripcion:"caseta #13",
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
  ]*/
  user_id=null;

  handlerMessage = '';
  roleMessage = '';

  constructor(private router: Router, 
    private route: ActivatedRoute,  
    private alertController: AlertController,
    public toastController: ToastController,
    private authService: AuthService ) {
      this.route.params.subscribe(params => {
        //console.log(params)
        this.user_id = Number(params.id);
        this.authService.getUsuarioOrden(this.user_id,"Pendiente").subscribe((pedidos:any[]) => {
          this.pedidos=pedidos;
        })
    }); }

  ngOnInit() {
  }

  goProducto(){
    this.router.navigate(['/home'],
    {
      relativeTo: this.route,
      replaceUrl: true
    });
  }

  goDirecciones(){
    this.router.navigate(['/direcciones'],
    {
      relativeTo: this.route,
      replaceUrl: true
    });
  }

  abrirPedido(pedido){
    console.log(pedido)
    this.router.navigate(['/detalle-pedido',this.user_id, pedido.id_ord],
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
