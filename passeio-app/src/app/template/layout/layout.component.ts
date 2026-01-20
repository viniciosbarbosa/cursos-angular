import { Component, OnInit } from '@angular/core';
import { LayoutProps } from './layout.props';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthgoogleService } from '../../authgoogle.service';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  props: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loginService: AuthgoogleService,
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map(() => this.getPropsFromRoute()),
      )
      .subscribe((data) => (this.props = data));
  }

  logout() {
    this.loginService.logout();
  }

  isLoggedIn(): boolean {
    return !!this.loginService.getLoggedInProfile();
  }

  private getPropsFromRoute() {
    let route = this.activatedRoute;
    while (route.firstChild) route = route.firstChild;
    return route.snapshot.data;
  }
}
