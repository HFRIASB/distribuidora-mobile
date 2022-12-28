import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Rol } from 'src/app/models/rol';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  image = "../../../assets/icon/logoEmpresa.png"
  rol = new Rol();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertController: AlertController,
    public toastController: ToastController,
  ) {
    this.authService.getRolByName("Cliente").subscribe((data: any) => {
      this.rol = data;
    })
  }

  ngOnInit() {
  }
  register(form) {
    let usuario = {
      nombre_usu: form.value.nombre,
      apPaterno_usu: form.value.apepat,
      apMaterno_usu: form.value.apemat,
      nroDocu_usu: form.value.ci,
      sexo_usu: form.value.sexo,
      celular_usu: form.value.celular,
      correo_usu: form.value.correo,
      password_usu: form.value.password,
      fRegistro_usu: new Date(),
      rol: this.rol.id_rol
    }
    if (form.value.verificarPassword == form.value.password) {
      this.authService.registrarUsuario(usuario)
        .subscribe(datosResponce => {
          this.alertSaveOrden();
        }, (error) => {
          this.presentToast("Ocurrió un error, vuelva intentar", 'danger');

        })
    } else {
      this.presentToast("Las contraseñas ingresadas son diferentes, verifique las que las contraseñas sena iguales", 'danger');

    }


  }

  goBack() {
    this.router.navigate(['/login'], { relativeTo: this.route, replaceUrl: true })
  }

  async alertSaveOrden() {
    const alert = await this.alertController.create({
      header: 'Usuario Registrado',
      message: 'Usuario registrado exitosamente, ingrese con su usuario y contraseña',
      buttons: [{
        text: "OK",
        handler: () => {
          this.router.navigate(['/login'],
            {
              relativeTo: this.route,
              replaceUrl: true
            })
        }
      }],
    });
    await alert.present();
  }

  async presentToast(texto, color) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 3000,
      color: color,
    });
    toast.present();
  }


}
