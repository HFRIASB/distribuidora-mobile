import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cobros',
  templateUrl: './cobros.page.html',
  styleUrls: ['./cobros.page.scss'],
})
export class CobrosPage implements OnInit {
  
  user_id=null;

  constructor(
    private alertController: AlertController,
    private router: Router, 
    private route: ActivatedRoute, ) { }

  ngOnInit() {
  }

  editarCobro() {
    this.presentAlert().then(() => {
    }).catch(e => { });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Por favor ingrese el monto cobrado',
      buttons: [
        {
          text: 'AÑADIR',
          handler: (data) => {
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
          name: 'monto',
          placeholder: 'Monto'
        }
      ]
    });

    await alert.present();
  }

  goProducto(){
    this.router.navigate(['/home', this.user_id],//id
    {
      relativeTo: this.route,
      replaceUrl: true
    });
  }

  goDirecciones(){
    this.router.navigate(['/direcciones'],
    {
      relativeTo: this.route,
      replaceUrl: true
    });
  }

}
