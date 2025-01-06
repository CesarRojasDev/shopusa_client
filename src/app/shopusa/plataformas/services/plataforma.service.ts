import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Plataforma } from '../../interfaces/comision.interface';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PlataformaService {
  private API_URL = `${environment.apiUrl}/plataformas`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getPlataformas(): Observable<Plataforma[]> {
    return this.http.get<Plataforma[]>(this.API_URL, {
      headers: this.getHeaders(),
    });
  }
  getPlataformaById(id: string): Observable<Plataforma> {
    return this.http.get<Plataforma>(`${this.API_URL}/${id}`, {
      headers: this.getHeaders(),
    });
  }
  createPlataforma(plataforma: Plataforma): Observable<Plataforma> {
    return this.http.post<Plataforma>(this.API_URL, plataforma, {
      headers: this.getHeaders(),
    });
  }
  deletePlataforma(id: string): Observable<Plataforma> {
    return this.http.delete<Plataforma>(`${this.API_URL}/${id}`, {
      headers: this.getHeaders(),
    });
  }
  updatePlataforma(plataforma: Plataforma, id: string): Observable<Plataforma> {
    return this.http.put<Plataforma>(`${this.API_URL}/${id}`, plataforma, {
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
