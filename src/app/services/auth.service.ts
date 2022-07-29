import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_url='http://localhost:3000/'

  constructor(
   private http:HttpClient
  ) { 

  }

  validarUsuario(datos): Observable<any>{
    return this.http.post(this.api_url+'auth',datos);
  }

  getRol(id_user: number){
    return new Promise((resolve,reject)=>{
      this.http.get(`${this.api_url}usuario/${id_user}`)
        .subscribe(response =>{
          resolve(response)
        },(error)=>{
          reject(error)
        })
    })
  }

  registrarUsuario(usuario){
    return this.http.post(this.api_url+'usuario',usuario);
  }
}
