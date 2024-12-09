import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subcategoria } from '../interfaces/subcategoria.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SubCategoriaService {
  private API_URL = 'http://localhost:8080/api/subcategorias'; // La URL del backend
  private token = localStorage.getItem('token'); // Obtener el token de autenticación

  constructor(private http: HttpClient) {}

  getSubCategorias(): Observable<Subcategoria[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.get<Subcategoria[]>(this.API_URL, { headers });
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
  updateSubcategoria(subcategoria: Subcategoria): Observable<Subcategoria> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.put<any>(`${this.API_URL}/${subcategoria.id}`, subcategoria, { headers });
  }
}
