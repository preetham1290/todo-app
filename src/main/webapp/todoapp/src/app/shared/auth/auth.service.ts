import { Injectable } from '@angular/core';
import { StorageService, StorageType } from 'app/shared/storage/storage.service';
@Injectable()
export class AuthService {

  private token: string = null;

  constructor(private storageService: StorageService) {
    let token = storageService.getByKey('token', StorageType.LOCALSTORAGE);
    if (token !== null) {
      this.token = token;
    }
  }

  setToken(token: string) {
    this.token = token;
    this.storageService.put('token', token, StorageType.LOCALSTORAGE);
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return this.token !== null;
  }

}
