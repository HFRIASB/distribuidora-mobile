import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdenProductoService {

  api_url='http://localhost:3000/'

  constructor( private http:HttpClient) { }

  getOrdenProductoByIdOrden(id: number){

  }
  
}
