import { AuthService } from './../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

type User = {
  login: string;
  avatar_url: string;
  html_url: string;
  bio: string;
};

type Repository = {
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  updated_at: string;
  language: string;
};

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent implements OnInit {
  userData: User;
  userLoading = false;

  reposData: Repository[] = [];
  reposLoading = false;

  constructor(private authService: AuthService, private http: HttpClient) {}

  getUser() {
    this.userLoading = true;
    this.http
      .get<User>(`https://api.github.com/users/jhonnatthan`)
      .subscribe((data) => {
        this.userData = data;
        this.userLoading = false;
      });
  }

  getRepos() {
    this.reposLoading = true;
    this.http
      .get<Repository[]>(`https://api.github.com/users/jhonnatthan/repos`)
      .subscribe((data) => {
        this.reposData = data;
        this.reposLoading = false;
      });
  }

  ngOnInit(): void {
    this.getUser();
    this.getRepos();
  }
}
