import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavlinkComponent } from './navlink/navlink.component';
import { MainblogComponent } from './mainblog/mainblog.component';
import { AuthorinfoComponent } from './authorinfo/authorinfo.component';
import { HttpClient } from '@angular/common/http';
import { AppService } from './app.service';
import { LoginService } from './login/login.service';
import { Post, User } from './mainblogpage/mainblogpage.interface';
import { NavlinkService } from './navlink.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavlinkComponent,
    MainblogComponent,
    AuthorinfoComponent,
    MatIconModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'blog-app';

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
