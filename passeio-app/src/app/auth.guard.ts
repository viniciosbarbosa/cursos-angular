import { CanActivateFn, Router } from '@angular/router';
import { AuthgoogleService } from './authgoogle.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService: AuthgoogleService = inject(AuthgoogleService);

  const router: Router = inject(Router);

  const loggedProfile = loginService.getLoggedInProfile();
  if (loggedProfile) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};
