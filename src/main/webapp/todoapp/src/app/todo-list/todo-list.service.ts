import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TodoListService {

  constructor(private http: HttpClient) { }

  create(cred: any): Observable<Response> {
    return this.http.post('todo', cred).map((res: Response) => res)
      .catch((error: any) => { return Observable.throw(JSON.parse(error.error)); });
  }

  update(cred: any): Observable<Response> {
    return this.http.put('todo', cred).map((res: Response) => res)
      .catch((error: any) => { return Observable.throw(JSON.parse(error.error)); });
  }

  delete(id: string): Observable<Response> {
    return this.http.delete('todo/' + id).map((res: Response) => res)
      .catch((error: any) => { return Observable.throw(JSON.parse(error.error)); });
  }
}
