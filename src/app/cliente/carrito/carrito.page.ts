import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  qty:any;

  fechaEntrega: Date= new Date();

  constructor(/*private router: Router*/) { this.qty = 1;}

  image="https://d19d5sz0wkl0lu.cloudfront.net/dims4/default/fa33b82/2147483647/resize/300x%3E/quality/90/?url=https%3A%2F%2Fatd-brightspot.s3.amazonaws.com%2Fhomer.png"
  
  ngOnInit() {
  }
  /*register(dateForm){
    console.log(dateForm.value)
    this.router.navigate(['/home'])
  }*/

  cambioFecha(event){
    console.log('ionChange', event)
    console.log('Date', new Date( event.detail.value ) );
  }

  // increment product qty
  incrementQty() {
  console.log(this.qty+1);
  this.qty += 1;
  }
  
  // decrement product qty
  decrementQty() {
  if(this.qty-1 < 1 ){
  this.qty = 1
  console.log("1->"+this.qty);
  }else{
  this.qty -= 1;
  console.log("2->"+this.qty);
  }
  }
}