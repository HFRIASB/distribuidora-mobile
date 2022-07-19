import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedido-cliente',
  templateUrl: './pedido-cliente.page.html',
  styleUrls: ['./pedido-cliente.page.scss'],
})
export class PedidoClientePage implements OnInit {

  image = "https://d19d5sz0wkl0lu.cloudfront.net/dims4/default/fa33b82/2147483647/resize/300x%3E/quality/90/?url=https%3A%2F%2Fatd-brightspot.s3.amazonaws.com%2Fhomer.png"
 
  pedidos = [
    { 
      pedido_id: 1,
      pedido_estado: "entregado",
      cliente: {
               cliente_nombre: "Henry",
               cliente_id: 1,
               },
      direccion:{
                direccion_id:1,
                direccion_nombre:"miamicito",
                direccion_descripcion:"caseta #12",
                direccion_latitude:-17.390750,
                direccion_longitude:-66.228295
                 },
      venta_fecha: new Date(),
      entrega_fecha: new Date(),
      productos: [
        { producto: {
                    producto_id:1,
                    producto_nombre:"aceite"
                    }, 
          cantidad: 1, 
        },
        {
          producto: {
                    producto_id:2,
                    producto_nombre:"chesco"
                     }, 
         cantidad: 1,
        }
      ]
    },
    { 
      pedido_id: 2,
      pedido_estado: "cancelado",
      cliente: {
               cliente_nombre: "Jhoel",
               cliente_id: 2,
               },
      direccion:{
                direccion_id:2,
                direccion_nombre:"Colonial",
                direccion_descripcion:"caseta #13",
                direccion_latitude:-17.390750,
                direccion_longitude:-66.228295
                 },
      venta_fecha: new Date(),
      entrega_fecha: new Date(),
      productos: [
        { producto: {
                    producto_id:1,
                    producto_nombre:"aceite"
                    }, 
          cantidad: 1, 
        },
        {
          producto: {
                    producto_id:2,
                    producto_nombre:"chesco"
                     }, 
         cantidad: 1,
        }
      ]
    }
  ]


  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  goProducto(){
    this.router.navigate(['/home'],
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
