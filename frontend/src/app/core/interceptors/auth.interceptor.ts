import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const sesion = authService.obtenerSesion();

  if (!sesion?.token) {
    return next(req);
  }

  const requestClonada = req.clone({
    setHeaders: {
      Authorization: `Bearer ${sesion.token}`,
    },
  });

  return next(requestClonada);
};