import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  image = "https://d19d5sz0wkl0lu.cloudfront.net/dims4/default/fa33b82/2147483647/resize/300x%3E/quality/90/?url=https%3A%2F%2Fatd-brightspot.s3.amazonaws.com%2Fhomer.png"



  constructor(
    private router: Router, private route: ActivatedRoute, private authService:AuthService  
  ) { }

  ngOnInit() {
  }
  goRegister() {
    this.router.navigate(['/register'],
      {
        relativeTo: this.route,
        replaceUrl: true
      });
  }

  login(form) {
    this.authService.validarUsuario({correo_usu:form.value.usuario, password_usu: form.value.password})
      .subscribe(usuarioToken=>{
      //  console.log(usuarioToken);
        this.authService.getRol(usuarioToken.id_usu)
          .then((user: Usuario)=>{
            if (user.rol.nombre_rol == "Cliente") {
              this.router.navigate(['/home'],
                {
                  relativeTo: this.route,
                  replaceUrl: true
                });
            } else if (user.rol.nombre_rol == "Repartidor" || user.rol.nombre_rol == "Administrador") {
              this.router.navigate(['/pedidos'],
                {
                  relativeTo: this.route,
                  replaceUrl: true
                });
          }})
      })
    }
   /* let user = {
      id: 1,
      accessToken: "asdadfsargedfh",
      rol: "cliente"
    };

    if (user.rol == "cliente") {
      this.router.navigate(['/home'],
        {
          relativeTo: this.route,
          replaceUrl: true
        });
    } else if (user.rol == "repartidor") {
      this.router.navigate(['/pedidos'],
        {
          relativeTo: this.route,
          replaceUrl: true
        });
    }*/
  

  btnCliente() {
    this.router.navigate(['/home'],
    {
      relativeTo: this.route,
      replaceUrl: true
    });
  }

  btnRepartidor() {
    this.router.navigate(['/pedidos'],
    {
      relativeTo: this.route,
      replaceUrl: true
    });
  }



}
