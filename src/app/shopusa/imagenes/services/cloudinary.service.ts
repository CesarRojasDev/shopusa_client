import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CloudinaryService {

  private API_URL = `${environment.apiUrl}/cloudinary/upload`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  uploadImages(files: FormData): Observable<any> {
    return this.http.post(this.API_URL, files, { headers: this.getHeaders() });
  }
}
