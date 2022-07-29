import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  image = "https://d19d5sz0wkl0lu.cloudfront.net/dims4/default/fa33b82/2147483647/resize/300x%3E/quality/90/?url=https%3A%2F%2Fatd-brightspot.s3.amazonaws.com%2Fhomer.png"



  constructor(
    private router: Router, private route: ActivatedRoute
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
    let user = {
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
    }
  }

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
