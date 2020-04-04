import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppInterceptor implements HttpInterceptor {
  private static readonly interceptUrl = 'restdb.io';

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes(AppInterceptor.interceptUrl)) {
      request = request.clone({
        setHeaders: {
          'x-apikey': `${environment.apiKey}`,
        },
      });
    }
    return next.handle(request);
  }
}
