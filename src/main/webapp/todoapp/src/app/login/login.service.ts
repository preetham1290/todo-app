import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  login(cred: any): Observable<Response> {
    return this.http.post('auth/login', cred).map((res: Response) => res)
      .catch((error: any) => { return Observable.throw(JSON.parse(error.error)); });
  }
}
