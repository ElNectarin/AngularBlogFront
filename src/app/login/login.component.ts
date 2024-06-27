import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { NavlinkService } from '../navlink.service';
import {
  ReactiveFormsModule,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { AppService } from '../app.service';
import { User } from '../mainblogpage/mainblogpage.interface';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from './login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormField,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  users: User[] = [];
  errorMessage = '';
  hide = true;
  loginForm: FormGroup | any;
  constructor(
    private navlinkService: NavlinkService,
    private appService: AppService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.appService.getAllUser().subscribe((data) => {
      this.users = data;
    });
  }

  goToMainPage() {
    this.navlinkService.goToMainPage();
  }

  goToRegisterPaige() {
    this.navlinkService.goToRegistrationPage();
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  updateUsernameErrorMessage() {
    if (this.loginForm.get('username').hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else {
      this.errorMessage = '';
    }
  }

  updatePasswordErrorMessage() {
    if (this.loginForm.get('password').hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else {
      this.errorMessage = '';
    }
  }

  onSubmit() {
    this.loginService
      .login(
        this.loginForm.get('username').value,
        this.loginForm.get('password').value
      )
      .subscribe((data) => {
        this.loginService.setToken(
          data.access_token,
          this.loginForm.get('username').value
        );
        this.router.navigate(['/']);
      });
  }
}
