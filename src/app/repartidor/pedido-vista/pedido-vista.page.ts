import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Orden } from 'src/app/models/orden';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { OrdenService } from 'src/app/services/orden.service';
import { Direccion } from 'src/app/models/direccion';
import { ControlEnvase } from 'src/app/models/control-envase';
import { ControlEnvaseService } from 'src/app/services/control-envase.service';
import { TipoEnvase } from 'src/app/models/tipo-envase';

@Component({
  selector: 'app-pedido-vista',
  templateUrl: './pedido-vista.page.html',
  styleUrls: ['./pedido-vista.page.scss'],
})
export class PedidoVistaPage implements OnInit {
  image= "../../../assets/icon/logoEmpresa.png"
  orden: Orden = new Orden();
  idRepartidor = null;
  monto_cobrado = 0;
  controlEnvasesOpen =false;
  controlEnvases = [];
  controlEnvase = new ControlEnvase;
  tiposEnvases = [];


  constructor(private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    public toastController: ToastController,
    private authService: AuthService,
    private ordenService: OrdenService,
    private controlEnvaseService: ControlEnvaseService) {
    this.controlEnvase.fecha_ce = new Date()
    this.controlEnvase.cantEnvase_ce=0
    this.orden.usuario = new Usuario()
    this.orden.direccion = new Direccion()
    this.route.params.subscribe(params => {
      this.idRepartidor = params.idUsuario
      this.ordenService.getOrdenById(+params.idOrden).subscribe((detalle: Orden) => {
        this.controlEnvase.usuario = detalle.usuario.id_usu 
        this.orden = this.ordenService.transformarDate(detalle);
      })
    })
    this.controlEnvaseService.getTiposEnvase().subscribe((data: TipoEnvase[])=>{
      this.tiposEnvases = data;
    })
  }

  ngOnInit() {
  }

  verDireccion() {
    this.router.navigate(['/direccion-pedido', this.idRepartidor, this.orden.id_ord.toString()], { relativeTo: this.route, replaceUrl: true })
  }

  goBack() {
    this.router.navigate(['/pedidos', this.idRepartidor], { relativeTo: this.route, replaceUrl: true })
  }

  async presentToast(texto, color) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000,
      color: color,
    });
    toast.present();
  }

  btnEntregado() {
    //Actualizar estado orden, agregar pago
    this.ordenService.updateEstadoOrden(this.orden.id_ord, "Entregado").subscribe(dato => {
      if (this.monto_cobrado > 0 && this.monto_cobrado != null) {
        this.ordenService.hacerPago(this.orden.usuario.id_usu, this.monto_cobrado).subscribe(resp => {
          this.presentToast("Pedido Entregado Exitosamente", 'primary');
          this.goBack();
        }, error => {
          this.presentToast("Hubo un error al entregar su pedido", 'danger');
        })
      } else {
        this.presentToast("Pedido Entregado Exitosamente", 'primary');
        this.goBack();
      }

    }, error => {
      this.presentToast("Hubo un error al entregar su pedido", 'danger');
    })

  }

  registrarControlEnvase(isOpen){
    this.controlEnvasesOpen = isOpen
  }

  radioGroupChange(event){
    this.controlEnvase.estado_ce = event.detail.value;
  }

  setCantidadEnvases(value){
    this.controlEnvase.cantEnvase_ce = value
  }

  seleccionarEnvase(event){
    this.controlEnvase.tipEnvase_ce = event.detail.value
  }

  agregarControl(){
    console.log(this.controlEnvase)
    this.controlEnvaseService.postControlEnvase(this.controlEnvase).subscribe(data=>{
 //AgregarAlert su control fue registrado correctamente
      this.controlEnvase.estado_ce = null;
      this.controlEnvase.cantEnvase_ce = 0;
      this.controlEnvase.tipEnvase_ce = null;
      this.controlEnvasesOpen = false;
    })
  }
  

  setQuantity(value) {
    this.monto_cobrado = value;
  }

  async btnCancelado() {
    const alert = await this.alertController.create({
      header: '¿Esta seguro que deséa anular el pedido?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.ordenService.updateEstadoOrden(this.orden.id_ord, "Cancelado").subscribe(data => {
              this.presentToast("Pedido Anulado", 'danger');
              this.goBack();
            })
          },
        },
      ],
    });

    await alert.present();

  }

}
