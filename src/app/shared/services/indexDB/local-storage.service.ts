import { Injectable } from '@angular/core';
import { AngularIndexedDB } from './angular2-indexeddb';
import { Observable } from 'rxjs';
export const OFFLINE_DATA = 'offline_data';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  db;

  constructor() {
    this.db = new AngularIndexedDB('i-assignments', 1);
  }

  initiateStoreObjects() {
    return this.db.createStore(2, evt => {
      // Create data element table
      this.createStore(evt, OFFLINE_DATA, 'id');
    });
  }

  createStore(evt, key: string, index: string) {
    const objectStore = evt.currentTarget.result.createObjectStore(key, {
      keyPath: index
    });
    objectStore.createIndex(index, index, { unique: false });
  }
  add(table: string, value: any) {
    return Observable.create(observer => {
      this.initiateStoreObjects().then(() => {
        this.db.add(table, value).then(
          () => {
            observer.next(value);
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        );
      });
    });
  }

  update(table: string, value: any): Observable<any> {
    return Observable.create(observer => {
      this.initiateStoreObjects().then(() => {
        this.db.update(table, value).then(
          (index) => {
            observer.next(value);
            observer.complete();
          },
          error => {
            console.log(error);
          }
        );
      });
    });
  }

  getByIndex(
    table: string,
    index: string,
    index_value: string
  ): Observable<any> {
    return Observable.create(observer => {
      this.initiateStoreObjects().then(() => {
        this.db.getByIndex(table, index, index_value).then(
          item => {
            observer.next(item);
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        );
      });
    });
  }

  /**
   * get an item by key
   * @param table
   * @param key_value
   * @returns {any}
   */
  getByKey(table: string, key_value: any): Observable<any> {
    return Observable.create(observer => {
      this.initiateStoreObjects().then(() => {
        this.db.getByKey(table, key_value).then(
          item => {
            observer.next(item);
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        );
      });
    });
  }

  getByKeys(table: string, keys: Array<any>): Observable<any> {
    return Observable.create(observer => {
      this.initiateStoreObjects().then(() => {
        this.db.getByKeys(table, keys).then(
          items => {
            observer.next(items);
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        );
      });
    });
  }

  /**
   * get all items in a store
   * @param store_key
   * @returns {any}
   */
  getAll(store_key: string): Observable<any> {
    return Observable.create(observer => {
      this.initiateStoreObjects().then(() => {
        this.db.getAll(store_key).then(
          values => {
            observer.next(values);
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        );
      });
    });
  }

  /**
   * delete all items in a store
   * @param store_key
   * @returns {any}
   */
  clearAll(store_key: string): Observable<any> {
    return Observable.create(observer => {
      this.initiateStoreObjects().then(() => {
        this.db.clear(store_key).then(
          () => {
            observer.next('Values cleared');
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        );
      });
    });
  }

  /**
   * delete a single item in a store
   * @param store_key
   * @param index
   * @returns {any}
   */
  delete(store_key: string, index: string): Observable<any> {
    return Observable.create(observer => {
      this.initiateStoreObjects().then(() => {
        this.db.remove(store_key, index).then(
          () => {
            observer.next(index + 'Values cleared');
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        );
      });
    });
  }
}
