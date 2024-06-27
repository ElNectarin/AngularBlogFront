import { Component, OnInit } from '@angular/core';
import { NavlinkComponent } from '../navlink/navlink.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavlinkService } from '../navlink.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Post, User } from './mainblogpage.interface';
import { AppService } from '../app.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-mainblogpage',
  standalone: true,
  imports: [
    NavlinkComponent,
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './mainblogpage.component.html',
  styleUrl: './mainblogpage.component.css',
})
export class MainblogpageComponent implements OnInit {
  posts: Post[] = [];
  users: User[] = [];
  isLoggin: boolean = false;
  constructor(
    private navlinkService: NavlinkService,
    private http: HttpClient,
    private appService: AppService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    try {
      this.appService.getAllPosts().subscribe((data) => {
        this.posts = data;
        this.posts.forEach((post) => {
          post.user.profilePhoto =
            'data:image/jpeg;base64,' + post.user.profilePhoto;
        });
        console.log(this.posts);
      });

      this.appService.getAllUser().subscribe((data) => {
        this.users = data;
      });

      this.isLoggin = this.loginService.isAuthenticated();
    } catch (error) {
      console.log('network error', error);
    }
  }

  goToLoginPage() {
    this.navlinkService.goToLoginForm();
  }

  goToRegistrationPage() {
    this.navlinkService.goToRegistrationPage();
  }
}
