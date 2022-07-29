import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  api_url='http://localhost:3000/'

  constructor( private http:HttpClient) { }

  getDireccionByIdUsuario(id: number){

  }

  postDireccion(data){

  }

  deleteDireccion(id: number){

  }

  getDireccionById(id: number){

  }
}
