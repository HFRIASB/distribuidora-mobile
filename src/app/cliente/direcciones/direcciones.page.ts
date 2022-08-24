import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Direccion } from 'src/app/models/direccion';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.page.html',
  styleUrls: ['./direcciones.page.scss'],
})
export class DireccionesPage implements OnInit {
  direcciones=[];

  image= "../../../assets/icon/logoEmpresa.png"
  handlerMessage = '';
  roleMessage = '';
  usuario= new Usuario();

  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private alertController: AlertController,
    public toastController: ToastController,
    private authService: AuthService) {
      this.route.params.subscribe(params => {
        this.authService.getUsuarioDireccion(+params.id_user).subscribe((data: Direccion[])=>{
          this.direcciones = data;
        })
        this.authService.getUsuarioById(params.id_user).subscribe((user: Usuario)=>{
          console.log(user)
          this.usuario = user;
        })
      })

  }

  ngOnInit() {
  }

  goProductos() {
    this.router.navigate(['/home', this.usuario.id_usu.toString()],
      {
        relativeTo: this.route,
        replaceUrl: true
      });
  }

  selecionarDireccion(direccion) {
    console.log(direccion)
    this.router.navigate(['/direccion-vista', this.usuario.id_usu.toString(), direccion],
      {
        relativeTo: this.route,
        replaceUrl: true
      });
  }

  agregarDireccion() {
    this.router.navigate(['/nueva-direccion', this.usuario.id_usu.toString()],
      {
        relativeTo: this.route,
        replaceUrl: true
      });
  }

  goMisPedidos(){
    this.router.navigate(['/pedido-cliente', this.usuario.id_usu.toString()],
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
