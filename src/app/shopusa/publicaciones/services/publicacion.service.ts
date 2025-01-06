import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Publicacion } from '../../interfaces/publicacion.interface';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PublicacionService {
  private API_URL = `${environment.apiUrl}/publicaciones`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  getPublicaciones(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(this.API_URL, {
      headers: this.getHeaders(),
    });
  }
  deletePublicacion(id: string): Observable<Publicacion> {
    return this.http.delete<Publicacion>(`${this.API_URL}/${id}`, {
      headers: this.getHeaders(),
    });
  }
  createPublicacion(publicacion: Publicacion): Observable<Publicacion> {
    return this.http.post<Publicacion>(this.API_URL, publicacion, {
      headers: this.getHeaders(),
    });
  }
  updatePublicacion(publicacion: Publicacion): Observable<Publicacion> {
    return this.http.put<Publicacion>(
      `${this.API_URL}/${publicacion.id}`,
      publicacion,
      { headers: this.getHeaders() }
    );
  }
  calcularPrecio(
    productoId: string,
    plataformaId: string
  ): Observable<Publicacion> {
    return this.http.get<any>(
      `${this.API_URL}/calcular-precio?productoId=${productoId}&plataformaId=${plataformaId}`,
      { headers: this.getHeaders() }
    );
  }
  generateXlsx() {
    return this.http.get<Blob>(`${this.API_URL}/export`, {
      headers: this.getHeaders(),
      responseType: 'blob' as 'json',
      observe: 'response'
    });
  }
}
