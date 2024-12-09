import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = 'http://localhost:8080/api/auth/signin'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): void {
    this.http.post<any>(this.API_URL, { username, password }).subscribe(
      (response) => {
        console.log('Login exitoso:', response);
        console.log(response.token);
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl('shopusa');
      },
      (error) => {
        console.log('Error al login:', error);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('auth/login');
  }
}
