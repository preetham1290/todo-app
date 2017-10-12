import { Injectable } from '@angular/core';
import { IStorage } from './storage';
import { StorageType } from './storage-type.enum';

export { IStorage } from './storage';
export { StorageType } from './storage-type.enum';

@Injectable()
export class StorageService implements IStorage {

  storageKeyPrefix: string = 'todoapp-';
  prefixLength: number = this.storageKeyPrefix.length;
  localStorageSupport: boolean = false;
  sessionStorageSupport: boolean = false;
  webLocalStorageStorage: Storage = null;
  webSessionStorageStorage: Storage = null;

  constructor() {
    this.checkStorageSupport();
  }
  private checkStorageSupport() {
    try {
      this.localStorageSupport = 'localStorage' in window
        && window['localStorage'] !== null;
      if (this.localStorageSupport) {
        this.webLocalStorageStorage = window['localStorage'];
        let key = this.deriveKey(`__${Math.round(Math.random() * 1e7)}`);
        this.webLocalStorageStorage.setItem(key, '');
        this.webLocalStorageStorage.removeItem(key);
      }
    } catch (e) {
      this.localStorageSupport = false;
      this.webLocalStorageStorage = null;
      return;
    }
    try {
      this.sessionStorageSupport = 'sessionStorage' in window
        && window['sessionStorage'] !== null;
      if (this.sessionStorageSupport) {
        this.webSessionStorageStorage = window['sessionStorage'];
        let key = this.deriveKey(`__${Math.round(Math.random() * 1e7)}`);
        this.webSessionStorageStorage.setItem(key, '');
        this.webSessionStorageStorage.removeItem(key);
      }
    } catch (e) {
      this.webSessionStorageStorage = null;
      this.sessionStorageSupport = false;
      return;
    }
  }

  private deriveKey(key: string): string {
    return `${this.storageKeyPrefix}${key}`;
  }

  private validateKey(key: string): boolean {
    return key !== null && key !== undefined && key.length !== 0 ? true : false;
  }

  getByKey(key: string, storageType: StorageType) {
    if (!this.validateKey(key)) {
      return null;
    }
    let item = null;
    if (storageType === StorageType.LOCALSTORAGE) {
      item = this.localStorageSupport && this.webLocalStorageStorage !== null ? this.webLocalStorageStorage.getItem(this.deriveKey(key)) : null;
    } else if (storageType === StorageType.SESSIONSTORAGE) {
      item = this.sessionStorageSupport && this.webSessionStorageStorage !== null ? this.webSessionStorageStorage.getItem(this.deriveKey(key)) : null;
    } else if (storageType === StorageType.COOKIESTORAGE) {

    }
    try {
      return item !== null ? JSON.parse(item) : null;
    } catch (e) {
      return null;
    }
  }

  put(key: string, object: Object, storageType: StorageType) {
    if (!this.validateKey(key)) {
      return;
    }
    let item = null;
    if (object !== null && object !== undefined) {
      item = JSON.stringify(object);
    }
    if (storageType === StorageType.LOCALSTORAGE) {
      this.localStorageSupport && this.webLocalStorageStorage !== null ? this.webLocalStorageStorage.setItem(this.deriveKey(key), item) : null;
    } else if (storageType === StorageType.SESSIONSTORAGE) {
      this.sessionStorageSupport && this.webSessionStorageStorage !== null ? this.webSessionStorageStorage.setItem(this.deriveKey(key), item) : null;
    } else if (storageType === StorageType.COOKIESTORAGE) {

    }
  }

  removeByKey(key: string, storageType: StorageType) {
    if (!this.validateKey(key)) {
      return;
    }
    if (storageType === StorageType.LOCALSTORAGE) {
      this.localStorageSupport && this.webLocalStorageStorage !== null ? this.webLocalStorageStorage.removeItem(this.deriveKey(key)) : null;
    } else if (storageType === StorageType.SESSIONSTORAGE) {
      this.sessionStorageSupport && this.webSessionStorageStorage !== null ? this.webSessionStorageStorage.removeItem(this.deriveKey(key)) : null;
    } else if (storageType === StorageType.COOKIESTORAGE) {

    }
  }

  removeAll(storageType: StorageType) {
    if (storageType === StorageType.LOCALSTORAGE) {
      if (this.localStorageSupport && this.webLocalStorageStorage !== null) {
        for (let key in this.webLocalStorageStorage) {
          if (key.substr(0, this.prefixLength).toString() === this.storageKeyPrefix) {
            this.webLocalStorageStorage.removeItem(key);
          }
        }
      }
    } else if (storageType === StorageType.SESSIONSTORAGE) {
      if (this.sessionStorageSupport && this.webSessionStorageStorage !== null) {
        for (let key in this.webSessionStorageStorage) {
          if (key.substr(0, this.prefixLength).toString() === this.storageKeyPrefix) {
            this.webSessionStorageStorage.removeItem(key);
          }
        }
      }
    } else if (storageType === StorageType.COOKIESTORAGE) {

    }
  }

  extractByKey(key: string, storageType: StorageType) {
    if (!this.validateKey(key)) {
      return null;
    }
    let item = null
    if (storageType === StorageType.LOCALSTORAGE) {
      item = this.getByKey(key, storageType);
      this.removeByKey(key, storageType);
    } else if (storageType === StorageType.SESSIONSTORAGE) {
      item = this.getByKey(key, storageType);
      this.removeByKey(key, storageType);
    } else if (storageType === StorageType.COOKIESTORAGE) {

    }
    return item;
  }
}