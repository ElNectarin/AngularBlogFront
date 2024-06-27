import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NavlinkComponent } from '../navlink/navlink.component';
import { HttpClient } from '@angular/common/http';
import { User } from '../mainblogpage/mainblogpage.interface';
import { NavlinkService } from '../navlink.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserprofileService } from './userprofile.service';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [CommonModule, MatIconModule, NavlinkComponent, RouterModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css',
})
export class UserprofileComponent implements OnInit {
  noPhoto = 'assets/unnamed.jpg'
  userName!: string;
  user = {} as User;
  constructor(
    private route: ActivatedRoute,
    private userProfileService: UserprofileService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userName = params['userName'];
    });
    this.userProfileService
      .getProfileInfo(this.userName)
      .subscribe((data: User | any) => {
        this.user = data;
        this.user.profilePhoto =
          'data:image/jpeg;base64,' + this.user.profilePhoto;
        console.log(this.user);
      });
  }
}
