import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orden } from '../models/orden';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  api_url='http://localhost:3000/orden/'

  constructor( private http:HttpClient) { }

  getOrdenes(){

  }

  getOrdenById(id: number){
    return this.http.get(`${this.api_url}${id}`);
  }

  postOrden(data){
    return this.http.post(this.api_url, data);
  }

  editOrden(data){

  }

  transformarDate(orden: Orden){
    let neworden = new Orden()
    neworden=orden
    neworden.fEntrega_ord = this.getFecha(orden.fEntrega_ord)
    neworden.fVenta_ord = this.getFecha(orden.fVenta_ord)
    return neworden
  }

  getFecha(fecha: Date){   
    const nuevaFecha = new Date(fecha)
    let mes = ""
    let dia = ""
    console.log(fecha,nuevaFecha.getDate(), nuevaFecha.getMonth(), nuevaFecha.getFullYear())
    if (nuevaFecha.getMonth()== 0) {
      mes="Enero"
    }else if (nuevaFecha.getMonth()== 1) {
      mes="Febrero"
    } else if (nuevaFecha.getMonth()== 2) {
      mes="Marzo"
    }else if (nuevaFecha.getMonth()== 3) {
      mes="Abril"
    }else if (nuevaFecha.getMonth()== 4) {
      mes="Mayo"
    }else if (nuevaFecha.getMonth()== 5) {
      mes="Junio"
    }else if (nuevaFecha.getMonth()== 6) {
      mes="Julio"
    }else if (nuevaFecha.getMonth()== 7) {
      mes="Agosto"
    }else if (nuevaFecha.getMonth()== 8) {
      mes="Septiembre"
    }else if (nuevaFecha.getMonth()== 9) {
      mes="Octubre"
    }else if (nuevaFecha.getMonth()== 10) {
      mes="Noviembre"
    }else if (nuevaFecha.getMonth()== 11) {
      mes="Diciembre"
    }

    if (nuevaFecha.getDay()== 0) {
      dia="Domingo"
    }else if (nuevaFecha.getDay()== 1) {
      dia="Lunes"
    }else if (nuevaFecha.getDay()== 2) {
      dia="Martes"
    }else if (nuevaFecha.getDay()== 3) {
      dia="Miercoles"
    }else if (nuevaFecha.getDay()== 4) {
      dia="Jueves"
    }else if (nuevaFecha.getDay()== 5) {
      dia="Viernes"
    }else if (nuevaFecha.getDay()== 6) {
      dia="Sabado"
    }
    return `${dia}, ${nuevaFecha.getDate()} de ${mes} del ${nuevaFecha.getFullYear()}`
  }
}
