import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ControlEnvaseService {

  api_url='https://distribuidora-aiol-api.herokuapp.com/'

  constructor( private http:HttpClient) { }

  postControlEnvase(data){
    return this.http.post(this.api_url+"control-envase",data)
  }

  getTiposEnvase(){
    return this.http.get(this.api_url+"tipo-envase");
  }


}
