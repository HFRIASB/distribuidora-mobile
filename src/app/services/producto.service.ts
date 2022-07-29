import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  api_url='http://localhost:3000/'

  constructor( private http:HttpClient) { }

  getTodoProductos(): Observable<any> {
  return this.http.get(this.api_url+'producto');
  }

  getProductoId(id: number): Observable<any> {
    return this.http.get(`${this.api_url}producto/${id}`);
    }
}
