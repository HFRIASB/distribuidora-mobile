import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  

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
  login(form){
    let user= {
      id:1,
      accessToken: "asdadfsargedfh",
      rol:"cliente"
    };

    if (user.rol == "cliente") {
      this.router.navigate(['/home'],
      {
        relativeTo: this.route,
        replaceUrl: true
      });
    }else if (user.rol == "repartidor") {
      this.router.navigate(['/pedidos'],
      {
        relativeTo: this.route,
        replaceUrl: true
      });
    }
  }

}
