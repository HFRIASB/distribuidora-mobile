import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Direccion } from 'src/app/models/direccion';
import { Producto } from 'src/app/models/producto';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { OrdenProductoService } from 'src/app/services/orden-producto.service';
import { OrdenService } from 'src/app/services/orden.service';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.page.html',
  styleUrls: ['./nuevo-pedido.page.scss'],
})
export class NuevoPedidoPage implements OnInit {
  image = "../../../assets/icon/logoEmpresa.png"

  buscado: string;

  isModalOpen = false;
  carritoOpen = false;
  productos = [];
  clienteElegido = new Usuario();
  clientes = [];
  direccionElegida = null;
  date = null;

  carrito = [];
  repartidor = new Usuario();
  searchTerm: string = '';
customAlertOptions: any;/////////////////////////

  buscarCliente(isOpen) {
    this.isModalOpen = isOpen;
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    public toastController: ToastController,
    private alertController: AlertController,
    private productoService: ProductoService,
    private authService: AuthService,
    private ordenService: OrdenService,
    private ordenProductoService: OrdenProductoService) {
    this.route.params.subscribe(params => {
      this.authService.getUsuarioById(params.id).subscribe((data: Usuario) => {
        this.repartidor = data
      })
    })
    this.productoService.getTodoProductos().subscribe((data: Producto[]) => {
      this.productos = data
    })
    this.clienteElegido.direccion = [];
    this.authService.getOnlyClientes().subscribe((cliente: Usuario[]) => {
      this.clientes = cliente
    })
  }

  ngOnInit() {
  }

  addCart(id: number, producto_nombre: string) {
    this.presentAlert(id, producto_nombre).then(() => {
    }).catch(e => { });
  }

  hacerPedido() {
    const orden = {
      fVenta_ord: new Date(),
      fEntrega_ord: new Date(this.date),
      usuario: this.clienteElegido.id_usu,
      direccion: Number(this.direccionElegida)
    }
    this.ordenService.postOrden(orden).subscribe(data => {
      this.carrito.forEach((element, index) => {
        let producto = {
          cantidad_op: element.cantidad,
          orden: data,
          producto: element.producto_id
        }
        this.ordenProductoService.postOrdenProducto(producto).subscribe(data1 => {
          if (index == this.carrito.length - 1) {
            this.presentToast("Pedido realizado exitosamente", "primary");
            this.router.navigate(['/pedidos', this.repartidor.id_usu],
              {
                relativeTo: this.route,
                replaceUrl: true
              });
          }
        })
      })
    })
  }

  agregarProducto(isOpen) {
    this.carritoOpen = isOpen;
  }

  elegirCliente(cliente) {
    this.direccionElegida = null;
    this.clienteElegido = cliente;
    this.isModalOpen = false;
    this.presentToast("Selecione una dirección", "primary");
  }

  async presentToast(texto, color) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

  seleccionarDireccion(event) {
    this.direccionElegida = event.detail.value
    console.log(this.direccionElegida)
  }

  async presentAlert(id: number, producto_nombre: string) {
    const alert = await this.alertController.create({
      header: 'Por favor ingrese una cantidad',
      buttons: [
        {
          text: 'AÑADIR',
          handler: (data) => {
            if (data.cantidad > 0 && data.cantidad < 101) {
              let addProduct = {
                producto_id: id,
                cantidad: data.cantidad,
                producto_nombre: producto_nombre
              }
              this.carrito.push(addProduct);
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
    this.carrito.splice(this.carrito.findIndex(producto => producto === item), 1);
  }

  goPedidos() {
    this.router.navigate(['/pedidos', this.repartidor.id_usu],
      {
        relativeTo: this.route,
        replaceUrl: true
      });
  }

  goCobros() {
    this.router.navigate(['/cobros', this.repartidor.id_usu],
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
