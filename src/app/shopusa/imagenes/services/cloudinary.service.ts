import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CloudinaryService {
  private API_URL = 'http://localhost:8080/api/cloudinary/upload'; // La URL del backend
  private token = localStorage.getItem('token'); // Obtener el token de autenticación
  constructor(private http: HttpClient) {}

  uploadImages(files: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los
    });
    return this.http.post(this.API_URL, files, { headers });
  }
}
