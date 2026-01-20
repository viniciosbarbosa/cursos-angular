import { Component, OnInit } from '@angular/core';
import { Profile } from './profile.model';
import { Router } from '@angular/router';
import { AuthgoogleService } from '../authgoogle.service';

@Component({
  selector: 'app-landing-page',
  standalone: false,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  profile: Profile | undefined;

  constructor(
    private router: Router,
    private loginService: AuthgoogleService,
  ) {}

  navegar() {
    this.router.navigate(['/paginas/galeria']);
  }

  logarComGoogle() {
    this.loginService.login();
  }

  isLoggedIn(): boolean {
    this.profile = this.loginService.getLoggedInProfile();
    console.log(this.profile);
    return !!this.profile;
  }

  ngOnInit(): void {}
}
