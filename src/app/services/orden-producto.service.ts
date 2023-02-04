import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdenProductoService {

  api_url='https://distribuidora-aiol-api.herokuapp.com/orden-producto'

  constructor( private http:HttpClient) { }

  getOrdenProductoByIdOrden(id: number){

  }
  
  postOrdenProducto(data){
    return this.http.post(this.api_url, data);
  }
  
}
