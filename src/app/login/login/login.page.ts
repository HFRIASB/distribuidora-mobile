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
  image= "../../../assets/icon/logoEmpresa.png"

  constructor(
    private router: Router, private route: ActivatedRoute, private authService: AuthService
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
    this.authService.validarUsuario({ correo_usu: form.value.usuario, password_usu: form.value.password })
      .subscribe(
        usuarioToken => {
          this.authService.getRol(usuarioToken.id_usu)
            .then((user: Usuario) => {
              console.log(user)
              if (user.rol.nombre_rol == "Cliente") {
                this.router.navigate(['/home', user.id_usu],
                  {
                    relativeTo: this.route,
                    replaceUrl: true
                  });
              } else if (user.rol.nombre_rol == "Repartidor" || user.rol.nombre_rol == "Administrador") {
                this.router.navigate(['/pedidos', user.id_usu],
                  {
                    relativeTo: this.route,
                    replaceUrl: true
                  });
              }
            })
        },
        error => {
          console.log("ocurrio un eror, intente de nuevo")////////////////////////////////////
        }
      )
  }


}
