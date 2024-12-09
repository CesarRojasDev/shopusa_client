import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Categoria } from '../../interfaces/comision.interface';

@Injectable({providedIn: 'root'})
export class CategoriaService {
    
  private API_URL = 'http://localhost:8080/api/categorias'; // La URL del backend
  private token = localStorage.getItem('token'); // Obtener el token de autenticación
    
  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.get<Categoria[]>(this.API_URL, { headers });
  }

  getCategoriaById(id: string): Observable<Categoria> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.get<Categoria>(`${this.API_URL}/${id}`, { headers });
  }

  deleteCategoria(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.delete(`${this.API_URL}/${id}`, { headers });
  }

  createCategoria(categoria: Categoria): Observable<Categoria> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.post<any>(this.API_URL, categoria, { headers });
  }
  updateCategoria(categoria: Categoria, id: string): Observable<Categoria> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.put<any>(`${this.API_URL}/${id}`, categoria, { headers });
  }

}