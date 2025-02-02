import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('auth_token');

  if (authToken) {
    const requestWithAuthorization = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken),
    });
    return next(requestWithAuthorization);
  } else {
    return next(req);
  }
};
