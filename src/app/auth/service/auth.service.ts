import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map, Observable, tap } from 'rxjs';

import { AuthStatus } from '../interfaces/auth-status.enum';
import { environment } from '../../../environments/environment';
import { LoginResponse } from '../interfaces/login-response.interface';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = `${environment.apiUrl}/auth`;

  private http = inject(HttpClient);
  private router = inject(Router);

  private _currentUser = signal<Usuario | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  login(username: string, password: string): Observable<boolean> {
    const url = `${this.API_URL}/signin`;

    return this.http.post<LoginResponse>(url, { username, password }).pipe(
      tap(({ usuario, token }) => {
        this._currentUser.set(usuario);
        this._authStatus.set(AuthStatus.authenticated);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(usuario));
        this.router.navigateByUrl('shopusa');
      }),
      map(() => true)
    );
  }

  logout(): void {
    this.router.navigateByUrl('login');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'ADMIN';
  }
}
