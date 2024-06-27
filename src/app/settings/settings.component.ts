import { Component, OnInit } from '@angular/core';
import { UserprofileService } from '../userprofile/userprofile.service';
import { LoginService } from '../login/login.service';
import { User } from '../mainblogpage/mainblogpage.interface';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NavlinkComponent } from '../navlink/navlink.component';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NavlinkComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  userName!: string | null;
  user = {} as User;

  editFormGroup: FormGroup | any;

  constructor(
    private userProfileService: UserprofileService,
    private loginService: LoginService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.userName = this.loginService.getUsername();
    console.log('', this.userName);
    if (this.userName) {
      this.userProfileService
        .getProfileInfo(this.userName)
        .subscribe((data) => (this.user = data));
      this.editFormGroup = new FormGroup({
        name: new FormControl(this.user.name),
        status: new FormControl(this.user.status),
        username: new FormControl(this.user.userName),
        email: new FormControl(this.user.email),
        education: new FormControl(this.user.education),
        birthday: new FormControl(this.user.birthDay),
        location: new FormControl(this.user.location),
        skills: new FormControl(this.user.skills),
        work: new FormControl(this.user.work),
      });
      console.log('', this.editFormGroup.get('name').value);
    }
  }

  onSubmit() {
    const updatedUser = {
      id: this.user.id,
      name: this.editFormGroup.get('name').value ?? this.user.name,
      status: this.editFormGroup.get('status').value ?? this.user.status,
      username: this.editFormGroup.get('username').value ?? this.user.userName,
      email: this.editFormGroup.get('email').value ?? this.user.email,
      education:
        this.editFormGroup.get('education').value ?? this.user.education,
      birthday: this.editFormGroup.get('birthday').value ?? this.user.birthDay,
      location: this.editFormGroup.get('location').value ?? this.user.location,
      skills: this.editFormGroup.get('skills').value ?? this.user.skills,
      work: this.editFormGroup.get('work').value ?? this.user.work,
    };

    this.settingsService
      .editPerson(
        updatedUser.id,
        updatedUser.name,
        updatedUser.status,
        updatedUser.username,
        updatedUser.email,
        updatedUser.education,
        updatedUser.birthday,
        updatedUser.location,
        updatedUser.skills,
        updatedUser.work
      )
      .subscribe({
        next: (response) => {
          console.log('Person edited:', response);
        },
        error: (error) => {
          console.error('Error editing person:', error);
        },
        complete: () => {
          console.log('Request complete');
        },
      });
  }
}
