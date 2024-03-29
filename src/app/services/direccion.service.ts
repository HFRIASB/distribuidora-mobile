import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  api_url='https://distribuidora-aiol-api.herokuapp.com/direccion/'

  constructor( private http:HttpClient) { }

  getDireccionByIdUsuario(id: number){

  }

  postDireccion(data){
    return this.http.post(this.api_url, data);
  }

  deleteDireccion(id: number){

  }

  getDireccionById(id: string){
    return this.http.get(this.api_url+ id);
  }
}
