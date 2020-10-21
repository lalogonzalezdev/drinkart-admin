import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token: string = localStorage.getItem('token');
      if (req.url.includes("https://api-sepomex.hckdrk.mx/")) {
        return next.handle(req);
      }
      let request = req;

      if (token) {
        request = req.clone({
          setHeaders: {
            authorization: `${token}`
          }
        });
      }

      return next.handle(request);
    }
}
