import { useEffect, useState } from 'react';
import { Inbox } from '../types';

interface DBSchema {
  user: {
    name: string;
    image: string;
  };
  inbox: Inbox[];
  activeChat?: Inbox;
}

const DB_NAME = 'ChatAppDB';
const DB_VERSION = 1;

export const useIndexedDB = () => {
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      setError(new Error('Failed to open IndexedDB'));
      setIsLoading(false);
    };

    request.onsuccess = (event) => {
      setDb((event.target as IDBOpenDBRequest).result);
      setIsLoading(false);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      if (!db.objectStoreNames.contains('user')) {
        db.createObjectStore('user');
      }
      if (!db.objectStoreNames.contains('inbox')) {
        db.createObjectStore('inbox');
      }
      if (!db.objectStoreNames.contains('activeChat')) {
        db.createObjectStore('activeChat');
      }
    };
  }, []);

  const setData = async <K extends keyof DBSchema>(
    storeName: K,
    data: DBSchema[K]
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(data, storeName);

      request.onerror = () => reject(new Error('Failed to store data'));
      request.onsuccess = () => resolve();
    });
  };

  const getData = async <K extends keyof DBSchema>(
    storeName: K
  ): Promise<DBSchema[K] | null> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error('Database not initialized'));
        return;
      }

      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(storeName);

      request.onerror = () => reject(new Error('Failed to retrieve data'));
      request.onsuccess = () => resolve(request.result || null);
    });
  };

  return {
    isLoading,
    error,
    setData,
    getData,
  };
};