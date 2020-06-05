import { AuthService } from './../../services/auth/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    public router: Router,
    public authService: AuthService,
    public toastr: ToastrService
  ) {}

  login() {
    const { email, password } = this;
    if (email !== '' && password !== '') {
      if (this.authService.login({ email, password })) {
        this.router.navigate(['/dashboard']);
      } else {
        this.toastr.error('E-mail e/ou senha incorreto(s)');
      }
    } else {
      this.toastr.error('Preencha os campos corretamente');
    }
  }
}
