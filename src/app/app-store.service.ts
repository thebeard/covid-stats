import { Params } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {
  private readonly storeKey = 'c19store';
  private store: Params;

  constructor() {
    this.store = JSON.parse(sessionStorage.getItem(this.storeKey)) || {};
  }

  clearAll() {
    sessionStorage.removeItem(this.storeKey);
    this.store = undefined;
  }

  get(key: string): any {
    return this.store ? this.store[key] : undefined;
  }

  set(keyValuePairs: Params) {
    this.store = { ...this.store, ...keyValuePairs };
    sessionStorage.setItem(this.storeKey, JSON.stringify(this.store));
  }
}
