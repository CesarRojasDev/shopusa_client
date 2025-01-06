import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Subcategoria } from '../../interfaces/subcategoria.interface';

import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SubcategoriaService {
  private API_URL = `${environment.apiUrl}/subcategorias`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  getSubCategorias(): Observable<Subcategoria[]> {
    return this.http.get<Subcategoria[]>(this.API_URL, {
      headers: this.getHeaders(),
    });
  }
  getSubcategoriaById(id: string): Observable<Subcategoria> {
    return this.http.get<Subcategoria>(`${this.API_URL}/${id}`, {
      headers: this.getHeaders(),
    });
  }
  deleteSubcategoria(id: string): Observable<Subcategoria> {
    return this.http.delete<Subcategoria>(`${this.API_URL}/${id}`, {
      headers: this.getHeaders(),
    });
  }
  createSubcategoria(subcategoria: Subcategoria): Observable<Subcategoria> {
    return this.http.post<Subcategoria>(this.API_URL, subcategoria, {
      headers: this.getHeaders(),
    });
  }
  updateSubcategoria(
    subcategoria: Subcategoria,
    id: string
  ): Observable<Subcategoria> {
    return this.http.put<Subcategoria>(`${this.API_URL}/${id}`, subcategoria, {
      headers: this.getHeaders(),
    });
  }
  generateXlsx() {
    return this.http.get<Blob>(`${this.API_URL}/export`, {
      headers: this.getHeaders(),
      responseType: 'blob' as 'json',
      observe: 'response'
    });
  }
}
