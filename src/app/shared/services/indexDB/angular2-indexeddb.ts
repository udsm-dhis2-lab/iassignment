export class AngularIndexedDB {
  private utils: Utils;
  private dbWrapper: DbWrapper;

  constructor(dbName: string, version: number) {
    this.utils = new Utils();
    this.dbWrapper = new DbWrapper(dbName, version);
  }

  createStore(version: number, upgradeCallback: Function) {
    const self = this,
      promise = new Promise<any>((resolve, reject) => {
        this.dbWrapper.dbVersion = version;
        const request = this.utils.indexedDB.open(this.dbWrapper.dbName, version);
        request.onsuccess = function (e) {
          self.dbWrapper.db = request.result;
          resolve();
        };

        request.onerror = function (e) {
          reject('IndexedDB error: ' + (<any>e.target).errorCode);
        };

        request.onupgradeneeded = function (e) {
          upgradeCallback(e, self.dbWrapper.db);
        };
      });

    return promise;
  }

  getByKey(storeName: string, key: any) {
    const self = this;
    const promise = new Promise<any>((resolve, reject) => {
      self.dbWrapper.validateBeforeTransaction(storeName, reject);

      const transaction = self.dbWrapper.createTransaction({
          storeName: storeName,
          dbMode: self.utils.dbMode.readOnly,
          error: (e: Event) => {
            reject(e);
          },
          complete: (e: Event) => {
          }
        }),
        objectStore = transaction.objectStore(storeName),
        request: IDBRequest = objectStore.get(key);
      request.onsuccess = function (event: Event) {
        resolve((<any>event.target).result);
      }
    });

    return promise;
  }

  getByKeys(storeName: string, keys: Array<any>) {
    const self = this;
    const promise = new Promise<any>((resolve, reject) => {
      self.dbWrapper.validateBeforeTransaction(storeName, reject);

      const transaction = self.dbWrapper.createTransaction({
          storeName: storeName,
          dbMode: self.utils.dbMode.readOnly,
          error: (e: Event) => {
            reject(e);
          },
          complete: (e: Event) => {
          }
        }),
        objectStore = transaction.objectStore(storeName);
      const keyStatus = {};
      keys.forEach((key) => {
        keyStatus[key] = false;
      });
      const items = [];
      keys.forEach(this.fetchKey(objectStore, (result, key) => {
        keyStatus[key] = true;
        items.push(result);
        let finished = true;
        keys.forEach((key1) => {
          if (!keyStatus[key1]) {
            finished = false;
          }
        });
        if (finished) {
          resolve(items);
        }
      }));
      let finished1 = true;
      keys.forEach((key) => {
        if (!keyStatus[key]) {
          finished1 = false;
        }
      });
      if (finished1) {
        resolve(items);
      }
    });

    return promise;
  }

  fetchKey(objectStore, callback) {
    return (key) => {
      const request = objectStore.get(key);
      request.onsuccess = function (event: Event) {
        callback((<any>event.target).result, key);
      }
    }
  }

  getAll(storeName: string, keyRange?: IDBKeyRange, indexDetails?: IndexDetails) {
    const self = this;
    const promise = new Promise<any>((resolve, reject) => {
      self.dbWrapper.validateBeforeTransaction(storeName, reject);

      const transaction = self.dbWrapper.createTransaction({
          storeName: storeName,
          dbMode: self.utils.dbMode.readOnly,
          error: (e: Event) => {
            reject(e);
          },
          complete: (e: Event) => {
          }
        }),
        objectStore = transaction.objectStore(storeName);
        const result: Array<any> = [];
        let request: IDBRequest;
      if (indexDetails) {
        const index = objectStore.index(indexDetails.indexName),
          order = (indexDetails.order === 'desc') ? 'prev' : 'next';
        request = index.openCursor(keyRange, order);
      } else {
        request = objectStore.openCursor(keyRange);
      }

      request.onerror = function (e) {
        reject(e);
      };

      request.onsuccess = function (evt: Event) {
        const cursor = (<IDBOpenDBRequest>evt.target).result;
        if (cursor) {
          result.push(cursor.value);
          cursor['continue']();
        } else {
          resolve(result);
        }
      };
    });

    return promise;
  }

  add(storeName: string, value: any, key?: any) {
    const self = this;
    const promise = new Promise<any>((resolve, reject) => {
      self.dbWrapper.validateBeforeTransaction(storeName, reject);

      const transaction = self.dbWrapper.createTransaction({
          storeName: storeName,
          dbMode: self.utils.dbMode.readWrite,
          error: (e: Event) => {
            reject(e);
          },
          complete: (e: Event) => {
            resolve({key: key, value: value});
          }
        }),
        objectStore = transaction.objectStore(storeName);

      objectStore.add(value, key);
    });

    return promise;
  }

  update(storeName: string, value: any, key?: any) {
    const self = this;
    const promise = new Promise<any>((resolve, reject) => {
      self.dbWrapper.validateBeforeTransaction(storeName, reject);

      const transaction = self.dbWrapper.createTransaction({
          storeName: storeName,
          dbMode: self.utils.dbMode.readWrite,
          error: (e: Event) => {
            reject(e);
          },
          complete: (e: Event) => {
            resolve(value);
          },
          abort: (e: Event) => {
            reject(e);
          }
        }),
        objectStore = transaction.objectStore(storeName);

      objectStore.put(value, key);
    });

    return promise;
  }

  delete(storeName: string, key: any) {
    const self = this;
    const promise = new Promise<any>((resolve, reject) => {
      self.dbWrapper.validateBeforeTransaction(storeName, reject);

      const transaction = self.dbWrapper.createTransaction({
          storeName: storeName,
          dbMode: self.utils.dbMode.readWrite,
          error: (e: Event) => {
            reject(e);
          },
          complete: (e: Event) => {
            resolve();
          },
          abort: (e: Event) => {
            reject(e);
          }
        }),
        objectStore = transaction.objectStore(storeName);

      objectStore['delete'](key);
    });

    return promise;
  }

  openCursor(storeName: string, cursorCallback: (evt: Event) => void, keyRange?: IDBKeyRange) {
    const self = this;
    const promise = new Promise<any>((resolve, reject) => {
      self.dbWrapper.validateBeforeTransaction(storeName, reject);

      const transaction = self.dbWrapper.createTransaction({
          storeName: storeName,
          dbMode: self.utils.dbMode.readOnly,
          error: (e: Event) => {
            reject(e);
          },
          complete: (e: Event) => {
            resolve();
          },
          abort: (e: Event) => {
            reject(e);
          }
        }),
        objectStore = transaction.objectStore(storeName),
        request = objectStore.openCursor(keyRange);

      request.onsuccess = (evt: Event) => {
        cursorCallback(evt);
        resolve();
      };
    });

    return promise;
  }

  clear(storeName: string) {
    const self = this;
    const promise = new Promise<any>((resolve, reject) => {
      self.dbWrapper.validateBeforeTransaction(storeName, reject);

      const transaction = self.dbWrapper.createTransaction({
          storeName: storeName,
          dbMode: self.utils.dbMode.readWrite,
          error: (e: Event) => {
            reject(e);
          },
          complete: (e: Event) => {
            resolve();
          },
          abort: (e: Event) => {
            reject(e);
          }
        }),
        objectStore = transaction.objectStore(storeName);
      objectStore.clear();
      resolve();
    });

    return promise;
  }

  getByIndex(storeName: string, indexName: string, key: any) {
    const self = this;
    const promise = new Promise<any>((resolve, reject) => {
      self.dbWrapper.validateBeforeTransaction(storeName, reject);

      const transaction = self.dbWrapper.createTransaction({
          storeName: storeName,
          dbMode: self.utils.dbMode.readOnly,
          error: (e: Event) => {
            reject(e);
          },
          abort: (e: Event) => {
            reject(e);
          },
          complete: (e: Event) => {
          }
        }),
        objectStore = transaction.objectStore(storeName),
        index = objectStore.index(indexName),
        request = index.get(key);

      request.onsuccess = (event) => {
        resolve((<IDBOpenDBRequest>event.target).result);
      };
    });

    return promise;
  }
}

class Utils {
  dbMode: DbMode;
  indexedDB: IDBFactory;

  constructor() {
    this.indexedDB = window.indexedDB || (<any>window).mozIndexedDB || (<any>window).webkitIndexedDB || (<any>window).msIndexedDB;
    this.dbMode = {
      readOnly: 'readonly',
      readWrite: 'readwrite'
    };
  }
}

export interface IndexDetails {
  indexName: string;
  order: string;
}

interface DbMode {
  readOnly: string;
  readWrite: string;
}

class DbWrapper {
  dbName: string;
  dbVersion: number;
  db: IDBDatabase;

  constructor(dbName: string, version: number) {
    this.dbName = dbName;
    this.dbVersion = version || 1;
    this.db = null;
  }

  validateStoreName(storeName: string) {
    return this.db.objectStoreNames.contains(storeName);
  };

  validateBeforeTransaction(storeName: string, reject: Function) {
    if (!this.db) {
      reject('You need to use the createStore function to create a database before you query it!');
    }
    if (!this.validateStoreName(storeName)) {
      reject(('objectStore does not exists: ' + storeName));
    }
  }

  createTransaction(options: { storeName: string, dbMode: any,
    error: (e: Event) => any, complete: (e: Event) => any,
    abort?: (e: Event) => any }): IDBTransaction {
    const trans: IDBTransaction = this.db.transaction(options.storeName, options.dbMode);
    trans.onerror = options.error;
    trans.oncomplete = options.complete;
    trans.onabort = options.abort;
    return trans;
  }
}
