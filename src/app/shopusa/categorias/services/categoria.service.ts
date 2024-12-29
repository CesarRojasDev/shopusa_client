import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Categoria } from '../../interfaces/comision.interface';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoriaService {

  private API_URL = `${environment.apiUrl}/categorias`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.API_URL, {
      headers: this.getHeaders(),
    });
  }
  getCategoriaById(id: string): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.API_URL}/${id}`, {
      headers: this.getHeaders(),
    });
  }
  deleteCategoria(id: string): Observable<Categoria> {
    return this.http.delete<Categoria>(`${this.API_URL}/${id}`, {
      headers: this.getHeaders(),
    });
  }
  createCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.API_URL, categoria, {
      headers: this.getHeaders(),
    });
  }
  updateCategoria(categoria: Categoria, id: string): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.API_URL}/${id}`, categoria, {
      headers: this.getHeaders(),
    });
  }
  generateXlsx() {
    return this.http.get<Blob>(
      `http://localhost:8080/api/excel/export/categorias`,
      { headers: this.getHeaders(), responseType: 'blob' as 'json' }
    );
  }
}
