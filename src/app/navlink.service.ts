import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavlinkService {

  constructor(private router: Router) {

  }

  goToMainPage() {
    this.router.navigate([""])
  }

  goToLoginForm() {
   this.router.navigate(["/login"])
  }

  goToRegistrationPage() {
    this.router.navigate(["/registration"])
  }

  goToCreatePost() {
    this.router.navigate(['/createPost'])
  }

  goToSettings() {
    this.router.navigate(['/settings'])
  }
}
