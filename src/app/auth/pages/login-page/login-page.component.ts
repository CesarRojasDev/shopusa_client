import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'; 

import { AuthService } from '../../service/auth.service';

export class AppModule {}
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``,
})
export class LoginPageComponent implements OnInit {
  public isPasswordVisible = false;
  public myForm: FormGroup;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigateByUrl('shopusa');
    }
  }

  togglePassword(): void {
    const togglePassword = document.getElementById('togglePassword') as HTMLInputElement;
    if (togglePassword.type === 'password') {
      togglePassword.type = 'text';
      this.isPasswordVisible = true;
    } else {
      togglePassword.type = 'password';
      this.isPasswordVisible = false;
    }
  } 

  onLogin(): void {
    this.authService
      .login(this.myForm.value.username, this.myForm.value.password)
      .subscribe({
        next: () => {
          console.log('Login exitoso');
        },
        error: () => {
          Swal.fire({
            title: 'Error!',
            text: 'Usuario o contraseña incorrectos',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        },
      });
  }
}
