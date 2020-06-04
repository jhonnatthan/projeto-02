import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  accept = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  public registerUser() {
    const { name, email, password, accept } = this;

    if (name !== '' && email !== '' && password !== '') {
      this.authService.register({ name, email, password });
    } else {
      this.toastr.error('Preencha os campos corretamente!');
    }
  }
}
