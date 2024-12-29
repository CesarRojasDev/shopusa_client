import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Producto } from '../../interfaces/producto.interface';
import { ProductResponse } from '../../interfaces/product-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = 'http://localhost:8080/api/productos'; // La URL del backend
  private token = localStorage.getItem('token'); // Obtener el token de autenticación
  
  constructor(private http: HttpClient) {}

  getProductsPaginados(page: number, size: number, sort: string): Observable<ProductResponse> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
  });
  const params = { page: page.toString(), size: size.toString(), sort };
  return this.http.get<ProductResponse>(`${this.API_URL}/paginados`, { headers, params });
}
getProducts(): Observable<Producto[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.get<Producto[]>(this.API_URL, { headers });
  }
getProductsByName(name: string): Observable<ProductResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.get<ProductResponse>(`${this.API_URL}/search?nombre=${name}`, { headers });
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
  updateProducto(product: Producto, id: string): Observable<Producto> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.put<Producto>(`${this.API_URL}/${id}`, product, {
      headers,
    });
  }
  deleteProduct(id: string): Observable<Producto> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.delete<Producto>(`${this.API_URL}/${id}`, { headers });
  }
  generateXlsx(){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.get<Blob>(`http://localhost:8080/api/excel/export/productos`, { headers,  responseType: 'blob' as 'json' });
  }
}
