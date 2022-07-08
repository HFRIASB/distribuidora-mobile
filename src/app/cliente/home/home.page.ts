import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';




@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  item_qty: any;
  isModalOpen = false;
  image = "https://d19d5sz0wkl0lu.cloudfront.net/dims4/default/fa33b82/2147483647/resize/300x%3E/quality/90/?url=https%3A%2F%2Fatd-brightspot.s3.amazonaws.com%2Fhomer.png"
  icon = "../../../assets/icon/add-to-cart.png"
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
  direcciones = [
    { direccion_id: 1, direccion_nombre: 'Caseta San Martin', direccion_latitud: "-17.401472", direccion_longitud: "-66.155927" },
    { direccion_id: 2, direccion_nombre: 'Casa Laguna', direccion_latitud: "-17.411392", direccion_longitud: "-66.144056" },
    { direccion_id: 3, direccion_nombre: 'Caseta Colcapirhua', direccion_latitud: "-17.390750", direccion_longitud: "-66.228295" }
  ]

  abrirCarrito(isOpen: boolean) {
    if (this.carrito.productos.length > 0) {
      this.isModalOpen = isOpen;
    } else {
      if (this.isModalOpen == false) {
        this.presentToast("Por favor elija un Producto", 'danger');
      } else {
        this.isModalOpen = isOpen;
      }
    }

  }
  hacerPedido(date) {
    this.carrito.entrega_fecha = date;
    console.log(this.carrito);
  }


  constructor(private router: Router, public toastController: ToastController, private alertController: AlertController, private route: ActivatedRoute,) {
    this.carrito.cliente_id = 1;
  }

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
  seleccionarDireccion(event) {
    this.carrito.direccion_id = event.detail.value;
  }
  goDirecciones() {
    this.router.navigate(['/direcciones'], { relativeTo: this.route, replaceUrl: true })
  }


}
