import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login/login.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { User } from '../mainblogpage/mainblogpage.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NavlinkService } from '../navlink.service';

@Component({
  selector: 'app-navlink',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormField,
    MatButtonModule,
    MatDividerModule,
    CommonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
  ],
  templateUrl: './navlink.component.html',
  styleUrl: './navlink.component.css',
})
export class NavlinkComponent implements OnInit {
  isLoggin = false;
  userName!: string | null;
  user: User = {} as User;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private http: HttpClient,
    private navLinkService : NavlinkService
  ) {}

  ngOnInit(): void {
    this.isLoggin = this.loginService.isAuthenticated();
    this.userName = this.loginService.getUsername();
    if (this.isLoggin) {
      this.http
        .get(`http://localhost:3000/users/${this.userName}`)
        .subscribe((data: User | any) => {
          this.user = data;
          this.user.profilePhoto =
            'data:image/jpeg;base64,' + this.user.profilePhoto;
        });
    }
  }

  goToMainPage() {
    this.navLinkService.goToMainPage();
  }

  goToLoginForm() {
    this.navLinkService.goToLoginForm();
  }

  goToRegistrationPage() {
    this.navLinkService.goToRegistrationPage();
  }

  goToCreatePost() {
    this.navLinkService.goToCreatePost();
  }

  goToSettings() {
    this.navLinkService.goToSettings()
  }

  logOut() {
    this.loginService.removeToken();
  }

  imageLupa = 'assets/lupa.png';
  noPhoto = 'assets/unnamed.jpg'
}
