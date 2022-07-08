import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

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
                direccion_latitude:11,
                direccion_longitude:12
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
                direccion_latitude:12,
                direccion_longitude:13
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

  abrirPedido(){
    this.router.navigate(['/pedido-vista'],
    {
      relativeTo: this.route,
      replaceUrl: true
    });
  }

}
