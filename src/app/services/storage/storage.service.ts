import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  get<T>(key: string): T {
    try {
      const localStorageValue = localStorage.getItem(key);
      if (localStorageValue !== null) {
        return JSON.parse(localStorageValue);
      }
      return undefined;
    } catch {
      console.error('Falha ao recuperar do storage');
    }
  }

  set<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Falha ao salvar no storage');
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Falha ao remover do storage');
    }
  }
}
