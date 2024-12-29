import { Injectable } from '@angular/core';
import { Subcategoria } from '../../interfaces/subcategoria.interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SubcategoriaService {
  private API_URL = 'http://localhost:8080/api/subcategorias'; // La URL del backend
  private token = localStorage.getItem('token'); // Obtener el token de autenticación

  constructor(private http: HttpClient) {}

  getSubCategorias(): Observable<Subcategoria[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.get<Subcategoria[]>(this.API_URL, { headers });
  }
  getSubcategoriaById(id: string): Observable<Subcategoria> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.get<Subcategoria>(`${this.API_URL}/${id}`, { headers });
  }
  deleteSubcategoria(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.delete(`${this.API_URL}/${id}`, { headers });
  }

  createSubcategoria(subcategoria: Subcategoria): Observable<Subcategoria> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.post<any>(this.API_URL, subcategoria, { headers });
  }
  updateSubcategoria(
    subcategoria: Subcategoria,
    id: string
  ): Observable<Subcategoria> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.put<any>(`${this.API_URL}/${id}`, subcategoria, {
      headers,
    });
  }
  generateXlsx() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.get<Blob>(
      `http://localhost:8080/api/excel/export/subcategorias`,
      { headers, responseType: 'blob' as 'json' }
    );
  }
}
