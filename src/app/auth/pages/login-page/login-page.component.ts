import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent implements OnInit {

  public myForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
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

  onLogin(): void {
    this.authService.login(this.myForm.value.username, this.myForm.value.password);
  }

}
