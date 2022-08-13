import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.page.html',
  styleUrls: ['./nuevo-pedido.page.scss'],
})
export class NuevoPedidoPage implements OnInit {

  buscado: string;

  isModalOpen = false;

  handlerMessage = '';
  roleMessage = '';

  image = "https://d19d5sz0wkl0lu.cloudfront.net/dims4/default/fa33b82/2147483647/resize/300x%3E/quality/90/?url=https%3A%2F%2Fatd-brightspot.s3.amazonaws.com%2Fhomer.png"

  productos = [
    { producto_id: 1, producto_nombre: "aceite", producto_presentacion: 1, producto_stock: 15, categoria_id: 1, unidad_id: 1, producto_foto: this.image },
    { producto_id: 2, producto_nombre: "refresco", producto_presentacion: 2, producto_stock: 10, categoria_id: 2, unidad_id: 2, producto_foto: this.image },
    { producto_id: 3, producto_nombre: "leche", producto_presentacion: 1, producto_stock: 15, categoria_id: 1, unidad_id: 1, producto_foto: this.image },
    { producto_id: 4, producto_nombre: "pollo", producto_presentacion: 2, producto_stock: 10, categoria_id: 2, unidad_id: 2, producto_foto: this.image }
  ]

  carrito = {
    cliente_id: null,
    direccion_id: null,
    venta_ticomprobante: null,
    venta_fecha: new Date(),
    entrega_fecha: null,
    productos: []
  }

  hacerPedido(date) {
    this.carrito.entrega_fecha = date;
    console.log(this.carrito);
  }
 

  constructor(private router: Router, private route: ActivatedRoute, public toastController: ToastController, private alertController: AlertController) { }

  ngOnInit() {
  }

  addCart(id: number, producto_nombre: string) {
    this.presentAlert(id, producto_nombre).then(() => {
    }).catch(e => { });
  }

  async presentToast(texto, color) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

  async presentAlert(id: number, producto_nombre: string) {
    const alert = await this.alertController.create({
      header: 'Por favor ingrese una cantidad',
      buttons: [
        {
          text: 'AÑADIR',
          handler: (data) => {
            if (data.cantidad > 0 && data.cantidad < 101) {
              let addProduct = { producto_id: id, cantidad: data.cantidad, producto_nombre: producto_nombre }
              this.carrito.productos.push(addProduct);
              this.presentToast("Producto añadido exitosamente", 'primary');
            } else {
              this.presentToast("Error: Elija un número mayor a 0 y menor a 100", 'danger');
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
          name: 'cantidad',
          placeholder: 'Cantidad',
          min: 1,
          max: 100
        }
      ]
    });

    await alert.present();
  }

  eliminarProducto(item) {
    this.carrito.productos.splice(this.carrito.productos.findIndex(producto => producto === item), 1);
  }

  goPedidos(){
    this.router.navigate(['/pedidos'],
    {
      relativeTo: this.route,
      replaceUrl: true
    });
  }

  goCobros(){
    this.router.navigate(['/cobros'],
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
