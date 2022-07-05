import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';




@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  item_qty:any;
  isModalOpen = false;
  image="https://d19d5sz0wkl0lu.cloudfront.net/dims4/default/fa33b82/2147483647/resize/300x%3E/quality/90/?url=https%3A%2F%2Fatd-brightspot.s3.amazonaws.com%2Fhomer.png"
  icon="../../../assets/icon/add-to-cart.png"
  productos=[
    {producto_id:1,producto_nombre:"aceite",producto_presentacion:1,producto_stock:15,categoria_id:1,unidad_id:1,producto_foto:this.image},
    {producto_id:2,producto_nombre:"refresco",producto_presentacion:2,producto_stock:10,categoria_id:2,unidad_id:2,producto_foto:this.image},
    {producto_id:3,producto_nombre:"leche",producto_presentacion:1,producto_stock:15,categoria_id:1,unidad_id:1,producto_foto:this.image},
    {producto_id:4,producto_nombre:"pollo",producto_presentacion:2,producto_stock:10,categoria_id:2,unidad_id:2,producto_foto:this.image}
  ]
  carrito={
    cliente_id:null,
    direccion_id:null,
    venta_ticomprobante:null,
    venta_fecha:new Date(),
    entrega_fecha:null,
    productos:[]
  }

  abrirCarrito(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  
  constructor(private router: Router, public toastController: ToastController, private alertController: AlertController) { 
    this.carrito.cliente_id=1;
  }

  ngOnInit() {
  }

  addCart(id){
    this.presentAlert().then(()=>{
      let addProduct={producto_id:id, cantidad:1}
      this.carrito.productos.push(addProduct);
      console.log(this.carrito);
      this.presentToast();
    }).catch(e=>{});
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Producto añadido exitosamente.',
      duration: 2000,
      color: 'primary',
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Por favor ingrese cantidad',
      buttons: ['AÑADIR AL CARRITO'],
      inputs: [
        {
          type: 'number',
          placeholder: 'Cantidad',
          min: 1,
          max: 100
        } 
      ]
    });

    await alert.present();
  }



  incrementQty(){
    this.item_qty += 1;
    console.log(this.item_qty + 1);
    }
    
    //decrements item
    
  decrementQty(){
      if(this.item_qty-1 < 1){
        this.item_qty = 1;
        console.log('item_1->' + this.item_qty)
      }
      else{
        this.item_qty -= 1;
        console.log('item_2->' + this.item_qty);
    }
    }

}
