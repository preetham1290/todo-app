import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpErrorResponse, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Rx';
import { environment } from 'environments/environment';
import { SpinnerService } from 'app/shared/spinner/spinner.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private spinnerService: SpinnerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    const url = req.url.startsWith('http://') ? req.url : environment.baseUri + req.url;
    this.spinnerService.startSpinner();
    if (token !== null) {
      const authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token), url: url });
      return next.handle(authReq).do(event => {
        if (event instanceof HttpResponse) {
          this.spinnerService.stopSpinner();
          if (event.status == 401) {
            console.log('invalid session');
          }
        }
      }, (error: HttpErrorResponse) => {
        this.spinnerService.stopSpinner();
      });
    }
    const authReq = req.clone({ url: url });
    return next.handle(authReq).do(event => {
      if (event instanceof HttpResponse) {
        this.spinnerService.stopSpinner();
      }
    }, (error: HttpErrorResponse) => {
      this.spinnerService.stopSpinner();
    });
  }
}

export const APP_HTTP_INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppHttpInterceptor,
  multi: true,
};