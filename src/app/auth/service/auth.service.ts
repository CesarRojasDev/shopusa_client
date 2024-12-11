import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UsuarioResponse } from '../../shopusa/interfaces/usuario-response.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = 'http://localhost:8080/api/auth/signin';
  private currentUserSubject = new BehaviorSubject<any>(null); // Mantener usuario actual en memoria

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): void {
    this.http.post<UsuarioResponse>(this.API_URL, { username, password }).subscribe(
      (response) => {
        console.log('Login exitoso:', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.usuario)); // Guardar usuario en almacenamiento local
        this.currentUserSubject.next(response.usuario); // Actualizar usuario actual
        this.router.navigateByUrl('shopusa');
      },
      (error) => {
        console.log('Error al login:', error);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null); // Limpiar usuario actual
    this.router.navigateByUrl('auth/login');
  }

  getCurrentUser() {
    // Intentar recuperar usuario del almacenamiento local
    if (!this.currentUserSubject.value) {
      const user = localStorage.getItem('user');
      if (user) {
        this.currentUserSubject.next(JSON.parse(user));
      }
    }
    return this.currentUserSubject.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  isAdmin(): boolean {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.role === 'ADMIN'; // Cambia 'ADMIN' según el rol que utilices
    }
    return false;
  }
}
