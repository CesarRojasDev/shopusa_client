import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comision } from '../../interfaces/comision.interface';

@Injectable({ providedIn: 'root' })
export class ComisionService {
  private API_URL = 'http://localhost:8080/api/comisiones'; // La URL del backend
  private token = localStorage.getItem('token'); // Obtener el token de autenticación

  constructor(private http: HttpClient) {}

  getComisiones(): Observable<Comision[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.get<Comision[]>(this.API_URL, { headers });
  }

  getComisionById(id: string): Observable<Comision> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.get<Comision>(`${this.API_URL}/${id}`, { headers });
  }

  createComision(comision: Comision): Observable<Comision> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.post<Comision>(this.API_URL, comision, { headers });
  }
  updateComision(comision: Comision, id: string): Observable<Comision> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.put<Comision>(`${this.API_URL}/${id}`, comision, {
      headers,
    });
  }
  deleteComision(id: string): Observable<Comision> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los encabezados
    });
    return this.http.delete<Comision>(`${this.API_URL}/${id}`, { headers });
  }
}
