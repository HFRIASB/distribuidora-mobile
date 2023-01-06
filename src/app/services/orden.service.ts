import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orden } from '../models/orden';
import { Pago } from '../models/pago';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  api_url = 'http://localhost:3000/orden/'
  api_url_producto = 'http://localhost:3000/'

  api_url_pago = 'http://localhost:3000/pago/'

  constructor(private http: HttpClient) { }

  getOrdenes(estado: string) {
    return this.http.get(this.api_url + "estado/" + estado);
  }

  getOrdenById(id: number) {
    return this.http.get(`${this.api_url}${id}`);
  }

  getOrdenWithDireccion(id: number) {
    return this.http.get(`${this.api_url}direccion/${id}`);
  }

  postOrden(data) {
    return this.http.post(this.api_url, data);
  }

  editOrden(data) {

  }
  updateEstadoOrden(id_ord: number, estado: string) {
    let nuevoEstado = {
      estado_ord: estado
    }
    return this.http.patch(this.api_url + id_ord.toString(), nuevoEstado)
  }
  patchStockProducto(id: any, cantidad: any) {
    return this.http.patch(this.api_url_producto + 'producto/' + id + '/cantidad/' + cantidad, null)
  }
  patchPedido(pedido:any){
    let payload={

    }
    return this.http.patch(`${this.api_url}${pedido.id_ord}`, pedido)
  }

  hacerPago(id_usu: number, monto: number){
    let nuevoPago = new Pago;
    nuevoPago.cantidad_pago = monto;
    nuevoPago.usuario = id_usu;
    nuevoPago.fecha_pago = new Date();
    return this.http.post(this.api_url_pago, nuevoPago)

  }

  transformarDate(orden: Orden) {
    let neworden = new Orden()
    neworden = orden
    neworden.fEntrega_ord = this.getFecha(orden.fEntrega_ord)
    neworden.fVenta_ord = this.getFecha(orden.fVenta_ord)
    return neworden
  }

  transformarFechaPago(pagos: Pago[]){
    let nuevosPagos = [];
    pagos.forEach(pago => {
      let auxiliar = pago;
      auxiliar.fecha_pago = this.getFecha(pago.fecha_pago);
      nuevosPagos.push(auxiliar)
    });
    return nuevosPagos;
  }

  getFecha(fecha: Date) {
    const nuevaFecha = new Date(fecha)
    let mes = ""
    let dia = ""
    if (nuevaFecha.getMonth() == 0) {
      mes = "Enero"
    } else if (nuevaFecha.getMonth() == 1) {
      mes = "Febrero"
    } else if (nuevaFecha.getMonth() == 2) {
      mes = "Marzo"
    } else if (nuevaFecha.getMonth() == 3) {
      mes = "Abril"
    } else if (nuevaFecha.getMonth() == 4) {
      mes = "Mayo"
    } else if (nuevaFecha.getMonth() == 5) {
      mes = "Junio"
    } else if (nuevaFecha.getMonth() == 6) {
      mes = "Julio"
    } else if (nuevaFecha.getMonth() == 7) {
      mes = "Agosto"
    } else if (nuevaFecha.getMonth() == 8) {
      mes = "Septiembre"
    } else if (nuevaFecha.getMonth() == 9) {
      mes = "Octubre"
    } else if (nuevaFecha.getMonth() == 10) {
      mes = "Noviembre"
    } else if (nuevaFecha.getMonth() == 11) {
      mes = "Diciembre"
    }

    if (nuevaFecha.getDay() == 0) {
      dia = "Domingo"
    } else if (nuevaFecha.getDay() == 1) {
      dia = "Lunes"
    } else if (nuevaFecha.getDay() == 2) {
      dia = "Martes"
    } else if (nuevaFecha.getDay() == 3) {
      dia = "Miercoles"
    } else if (nuevaFecha.getDay() == 4) {
      dia = "Jueves"
    } else if (nuevaFecha.getDay() == 5) {
      dia = "Viernes"
    } else if (nuevaFecha.getDay() == 6) {
      dia = "Sabado"
    }
    return `${dia}, ${nuevaFecha.getDate()} de ${mes} del ${nuevaFecha.getFullYear()}`
  }
}
