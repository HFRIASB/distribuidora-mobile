import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  image= "../../../assets/icon/logoEmpresa.png"


  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private authService: AuthService,
    private alertController: AlertController,
    public toastController: ToastController,
    ) { }

  ngOnInit() {
  }
  register(form) {
    console.log(form.value);
    let usuario= {
    nombre_usu: form.value.nombre,
    apPaterno_usu: form.value.apepat,
    apMaterno_usu: form.value.apemat,
    nroDocu_usu: form.value.ci,
    sexo_usu: form.value.sexo,
    celular_usu: form.value.celular,
    correo_usu: form.value.correo,
    password_usu: form.value.password,
    fRegistro_usu: new Date(),
    rol: 3//////////////Corregir con back
    }
    this.authService.registrarUsuario(usuario)
    .subscribe(datosResponce =>{
      this.alertSaveOrden();

    },(error)=>{
      this.presentToast("Ocurrió un error, vuelva intentar", 'danger');
      //toast"error"
    })
 
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
      duration: 2000,
      color: color,
    });
    toast.present();
  }
  
 
}
