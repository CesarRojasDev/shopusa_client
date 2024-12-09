import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = 'http://localhost:8080/api/productos'; // La URL del backend
  private token = localStorage.getItem('token'); // Obtener el token de autenticación
  
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Producto[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.get<Producto[]>(this.API_URL, { headers });
  }

  getProductById(id: string): Observable<Producto> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.get<Producto>(`${this.API_URL}/${id}`, { headers });
  }
  getProductBySku(sku: string): Observable<Producto> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.get<Producto>(`${this.API_URL}/sku/${sku}`, { headers });
  }

  createProduct(product: Producto): Observable<Producto> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.post<Producto>(this.API_URL, product, { headers });
  }
}
