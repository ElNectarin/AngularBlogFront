import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { NavlinkService } from '../navlink.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormField,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup | any;
  constructor(
    private router: Router,
    private navlinkService: NavlinkService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      profilePhoto: [''],
      name: [''],
      userName: [''],
      email: [''],
      password: [''],
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registerForm.get('profilePhoto')?.setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append(
      'profilePhoto',
      this.registerForm.get('profilePhoto').value
    );
    formData.append('name', this.registerForm.get('name').value);
    formData.append('userName', this.registerForm.get('userName').value);
    formData.append('email', this.registerForm.get('email').value);
    formData.append('password', this.registerForm.get('password').value);

    this.registrationService
      .registration(formData)
      .subscribe(() => this.router.navigate(['/login']));
  }

  goToLoginPaige() {
    this.navlinkService.goToLoginForm();
  }
}
