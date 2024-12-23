import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImagenesService {
  private API_URL = 'http://localhost:8080/api/imagenes'; // La URL del backend
  private token = localStorage.getItem('token'); // Obtener el token de autenticación
  constructor(private http: HttpClient) {}

  asociarImagen(imagenDTO: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`, // Agregar el token a los
    });
    return this.http.post(this.API_URL, imagenDTO, { headers }); // Enviamos el objeto imagenDTO al backend
  }
}
