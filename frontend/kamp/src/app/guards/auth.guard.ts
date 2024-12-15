import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../common/services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async  (route, state) => {

  const authService = inject(AuthService); // AuthService'i inject et
  const router = inject(Router); // Router'ı inject et

  const isAuthenticated = await authService.isAuthenticated();

  if (isAuthenticated)  return true;   
  else {
   router.navigate(['/login']); // Giriş yapmamışsa login sayfasına yönlendir
    return false; // Erişim izni verme    
  }
};
