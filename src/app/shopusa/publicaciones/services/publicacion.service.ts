import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Publicacion } from '../../interfaces/publicacion.interface';

@Injectable({ providedIn: 'root' })
export class PublicacionService {
  private API_URL = 'http://localhost:8080/api/publicaciones'; // La URL del backend
  private token = localStorage.getItem('token'); // Obtener el token de autenticación

  constructor(private http: HttpClient) {}

  getPublicaciones(): Observable<Publicacion[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.get<Publicacion[]>(this.API_URL, { headers });
  }
  deletePublicacion(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.delete(`${this.API_URL}/${id}`, { headers });
  }

  createPublicacion(publicacion: Publicacion): Observable<Publicacion> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.post<any>(this.API_URL, publicacion, { headers });
  }
  updatePublicacion(publicacion: Publicacion): Observable<Publicacion> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.put<any>(
      `${this.API_URL}/${publicacion.id}`,
      publicacion,
      { headers }
    );
  }
  calcularPrecio(
    productoId: string,
    plataformaId: string
  ): Observable<Publicacion> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.get<any>(
      `${this.API_URL}/calcular-precio?productoId=${productoId}&plataformaId=${plataformaId}`,
      { headers }
    );
  }
  generateXlsx() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.get<Blob>(
      `http://localhost:8080/api/excel/export/publicaciones`,
      { headers, responseType: 'blob' as 'json' }
    );
  }
}
