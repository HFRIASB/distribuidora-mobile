import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Direccion } from 'src/app/models/direccion';
import { Orden } from 'src/app/models/orden';
import { OrdenProducto } from 'src/app/models/orden-producto';
import { Producto } from 'src/app/models/producto';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { OrdenProductoService } from 'src/app/services/orden-producto.service';
import { OrdenService } from 'src/app/services/orden.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  item_qty: any;
  isModalOpen = false;
  icon = "../../../assets/icon/add-to-cart.png"
  productos: Producto[] = [];

  orden = {
    fVenta_ord: null,
    fEntrega_ord: new Date(),
    usuario: null,
    direccion: null,
    ordenProducto: []
  }

  direcciones: Direccion[] = [];

  constructor(private router: Router,
    public toastController: ToastController,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private ordenService: OrdenService,
    private ordenProductoService: OrdenProductoService,
    private authService: AuthService) {
    this.orden.ordenProducto = []
    this.getProductos();
    this.route.params.subscribe(params => {
      this.orden.usuario = Number(params.idUsuario);
      this.authService.getUsuarioDireccion(this.orden.usuario).subscribe((params: Usuario) => {
        this.direcciones = params.direccion;
      })
    });
  }

  ngOnInit() {
  }


  abrirCarrito(isOpen: boolean) {
    if (this.orden.ordenProducto.length > 0) {
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
    this.orden.fEntrega_ord = new Date(date);
    const orden = {
      fVenta_ord: new Date(),
      fEntrega_ord: this.orden.fEntrega_ord,
      usuario: this.orden.usuario,
      direccion: this.orden.direccion
    }
    this.ordenService.postOrden(orden).subscribe((data: Orden) => {
      //console.log(this.orden.ordenProducto)
      this.orden.ordenProducto.forEach((element: OrdenProducto) => {
        let producto = {
          cantidad_op: element.cantidad_op,
          orden: data,
          producto: element.producto.id_prod
        }
        this.ordenProductoService.postOrdenProducto(producto).subscribe(data1 => {
        })
      });
    })
    //console.log(this.orden);
    this.isModalOpen = false;
    this.alertSaveOrden();
  }

  async alertSaveOrden() {
    const alert = await this.alertController.create({
      header: 'Pedido Realizado',
      message: 'Pedido realizado exitosamente, será redireccionado a su lista de pedidos',
      buttons: [{
        text: "OK",
        handler: ()=>{
          this.router.navigate(['/pedido-cliente', this.orden.usuario], { relativeTo: this.route, replaceUrl: true })
        }
      }],
    });
    await alert.present();
  }

  handlerMessage = '';
  roleMessage = '';

  addCart(producto: Producto) {
    this.presentAlert(producto).then(() => {
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

  async presentAlert(producto: Producto) {
    const alert = await this.alertController.create({
      header: 'Por favor ingrese una cantidad',
      buttons: [
        {
          text: 'AÑADIR',
          handler: (data) => {
            if (data.cantidad > 0 && data.cantidad < 101) {
              this.orden.ordenProducto.push({
                producto: producto,
                cantidad_op: data.cantidad
              })
              /* let ordenProducto: OrdenProducto = new OrdenProducto()
               ordenProducto.producto = producto;
               ordenProducto.cantidad_op = data.cantidad;
               this.orden.ordenProducto.push(ordenProducto);*/
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
    this.orden.ordenProducto.splice(this.orden.ordenProducto.findIndex(producto => producto === item), 1);
  }
  seleccionarDireccion(event) {
    this.orden.direccion = event.detail.value;
  }
  goDirecciones() {
    this.router.navigate(['/direcciones'], { relativeTo: this.route, replaceUrl: true })
  }

  goMisPedidos() {
    this.router.navigate(['/pedido-cliente'],
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

  customAlertOptions = {
    header: 'Selecione la ubicación de entrega',
    translucent: true
  };

  getProductos() {

    this.productoService.getTodoProductos()
      .subscribe((productos: Producto[]) => {
        this.productos = productos;
      })
  }


}
