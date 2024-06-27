import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainblogComponent } from './mainblog/mainblog.component';
import { RegistrationComponent } from './registration/registration.component';
import { MainblogpageComponent } from './mainblogpage/mainblogpage.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { authGuard } from './auth.guard';
import { SettingsComponent } from './settings/settings.component';
import { PostComponent } from './post/post.component';

export const routes: Routes = [
  {
    path: '',
    component: MainblogpageComponent,
    title: 'My Blog',
  },
  {
    path: 'blog/:id',
    component: MainblogComponent,
    title: 'My Blog',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Welcome - My Blog',
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    title: 'Welcome - My Blog',
  },
  {
    path: 'users/:userName',
    component: UserprofileComponent
  },
  {
    path: 'settings', component: SettingsComponent, canActivate: [authGuard]
  },
  {
    path: 'createPost', component: PostComponent, canActivate: [authGuard]
  }
];
