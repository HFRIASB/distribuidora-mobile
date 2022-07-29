import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  image = "https://d19d5sz0wkl0lu.cloudfront.net/dims4/default/fa33b82/2147483647/resize/300x%3E/quality/90/?url=https%3A%2F%2Fatd-brightspot.s3.amazonaws.com%2Fhomer.png"
  



  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

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
    rol: 2//////////////Corregir con back
    }
    this.authService.registrarUsuario(usuario)
    .subscribe(datosResponce =>{
      this.router.navigate(['/home']);
    },(error)=>{
      //toast"error"
    })
 
  }

  goBack() {
    this.router.navigate(['/login'], { relativeTo: this.route, replaceUrl: true })
  }

}
