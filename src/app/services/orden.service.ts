import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  api_url='http://localhost:3000/'

  constructor( private http:HttpClient) { }

  getOrdenes(){

  }

  getOrdenById(id: number){

  }

  postOrden(data){

  }

  editOrden(data){

  }

  
}
