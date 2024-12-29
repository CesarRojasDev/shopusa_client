import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Comision } from '../../interfaces/comision.interface';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ComisionService {

  private API_URL = `${environment.apiUrl}/comisiones`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  getComisiones(): Observable<Comision[]> {
    return this.http.get<Comision[]>(this.API_URL, {
      headers: this.getHeaders(),
    });
  }
  getComisionById(id: string): Observable<Comision> {
    return this.http.get<Comision>(`${this.API_URL}/${id}`, {
      headers: this.getHeaders(),
    });
  }
  createComision(comision: Comision): Observable<Comision> {
    return this.http.post<Comision>(this.API_URL, comision, {
      headers: this.getHeaders(),
    });
  }
  updateComision(comision: Comision, id: string): Observable<Comision> {
    return this.http.put<Comision>(`${this.API_URL}/${id}`, comision, {
      headers: this.getHeaders(),
    });
  }
  deleteComision(id: string): Observable<Comision> {
    return this.http.delete<Comision>(`${this.API_URL}/${id}`, {
      headers: this.getHeaders(),
    });
  }
  generateXlsx() {
    return this.http.get<Blob>(
      `http://localhost:8080/api/excel/export/comisiones`,
      { headers: this.getHeaders(), responseType: 'blob' as 'json' }
    );
  }
}
