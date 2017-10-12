import { Injectable } from '@angular/core';
import { Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AuthService } from 'app/shared/auth/auth.service';
@Injectable()
export class GenericService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  export(url: string) {
    return Observable.create(observer => {
      let x = new XMLHttpRequest();
      const newUrl = url.startsWith('http://') ? url : environment.baseUri + url;
      x.open('POST', newUrl, true);
      x.responseType = 'blob';
      x.setRequestHeader('Authorization', 'Bearer ' + this.authService.getToken());
      x.onreadystatechange = (e) => {
        if (x.readyState === 4 && x.status === 200) {
          let a = document.createElement('a');
          a.href = window.URL.createObjectURL(x.response);
          console.log(x.getAllResponseHeaders());
          let filename = x.getResponseHeader('x-filename');
          a.download = filename;
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(a.href);
          observer.next({ 'message': 'file download successfully' });
          observer.complete();
        } else if (x.readyState === 4 && x.status !== 200) {
          console.log('failed to download');
          observer.error(x.response);
        }
      };
      x.send();
    });
  }
}
