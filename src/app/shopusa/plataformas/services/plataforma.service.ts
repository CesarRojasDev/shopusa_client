import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Plataforma } from '../../interfaces/comision.interface';

@Injectable({ providedIn: 'root' })
export class PlataformaService {
  private API_URL = 'http://localhost:8080/api/plataformas'; // La URL del backend
  private token = localStorage.getItem('token'); // Obtener el token de autenticación

  constructor(private http: HttpClient) {}

  getPlataformas(): Observable<Plataforma[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.get<Plataforma[]>(this.API_URL, { headers });
  }
  getPlataformaById(id: string): Observable<Plataforma> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.get<Plataforma>(`${this.API_URL}/${id}`, { headers });
  }

  createPlataforma(plataforma: Plataforma): Observable<Plataforma> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.post<Plataforma>(this.API_URL, plataforma, { headers });
  }

  deletePlataforma(id: string): Observable<Plataforma> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.delete<Plataforma>(`${this.API_URL}/${id}`, { headers });
  }

  updatePlataforma(plataforma: Plataforma, id: string): Observable<Plataforma> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.put<Plataforma>(`${this.API_URL}/${id}`, plataforma, {
      headers,
    });
  }
}
