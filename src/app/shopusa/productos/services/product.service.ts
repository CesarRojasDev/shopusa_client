import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Producto } from '../../interfaces/producto.interface';
import { ProductResponse } from '../../interfaces/product-response.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private API_URL = `${environment.apiUrl}/productos`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getProductsPaginados(
    page: number,
    size: number,
    sort: string
  ): Observable<ProductResponse> {
    const params = { page: page.toString(), size: size.toString(), sort };
    return this.http.get<ProductResponse>(`${this.API_URL}/paginados`, {
      headers: this.getHeaders(),
      params,
    });
  }
  getProducts(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.API_URL, {
      headers: this.getHeaders(),
    });
  }
  getProductsByName(
    name: string,
    page: number,
    size: number,
    sort: string
  ): Observable<ProductResponse> {
    const params = { page: page.toString(), size: size.toString(), sort };
    return this.http.get<ProductResponse>(
      `${this.API_URL}/search?nombre=${name}`,
      { headers: this.getHeaders(), params }
    );
  }
  getProductById(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.API_URL}/${id}`, {
      headers: this.getHeaders(),
    });
  }
  getProductBySku(sku: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.API_URL}/sku/${sku}`, {
      headers: this.getHeaders(),
    });
  }
  getProductsBySubcategory(
    id: string,
    page: number,
    size: number,
    sort: string
  ): Observable<ProductResponse> {
    const params = { page: page.toString(), size: size.toString(), sort };
    return this.http.get<ProductResponse>(
      `${this.API_URL}/filter?subcategoria=${id}`,
      { headers: this.getHeaders(), params }
    );
  }
  createProduct(product: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.API_URL, product, {
      headers: this.getHeaders(),
    });
  }
  updateProducto(product: Producto, id: string): Observable<Producto> {
    return this.http.put<Producto>(`${this.API_URL}/${id}`, product, {
      headers: this.getHeaders(),
    });
  }
  deleteProduct(id: string): Observable<Producto> {
    return this.http.delete<Producto>(`${this.API_URL}/${id}`, {
      headers: this.getHeaders(),
    });
  }
  generateXlsx() {
    return this.http.get<Blob>(
      `http://localhost:8080/api/excel/export/productos`,
      { headers: this.getHeaders(), responseType: 'blob' as 'json' }
    );
  }
}
