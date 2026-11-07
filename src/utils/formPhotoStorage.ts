import { useState, useEffect, useCallback } from 'react';

export interface StoredFormPhoto {
  formId: 'user-interview' | 'hr-interview';
  fileName: string;
  fileSize: number;
  fileType: string;
  dataUrl: string;
  uploadedAt: string;
}

const DB_NAME = 'HilmiAssessmentPhotoDB';
const STORE_NAME = 'form_photos';
const PHOTO_EVENT = 'dpp-form-photo-updated';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function notifyUpdate(formId: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(PHOTO_EVENT, { detail: { formId } }));
  }
}

export async function saveFormPhoto(
  formId: 'user-interview' | 'hr-interview',
  file: File
): Promise<StoredFormPhoto> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const photoData: StoredFormPhoto = {
        formId,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type || 'image/png',
        dataUrl,
        uploadedAt: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      try {
        const db = await openDatabase();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put(photoData, formId);
        tx.oncomplete = () => {
          notifyUpdate(formId);
          resolve(photoData);
        };
        tx.onerror = () => {
          try {
            localStorage.setItem(`hpp_form_photo_${formId}`, JSON.stringify(photoData));
            notifyUpdate(formId);
            resolve(photoData);
          } catch (e) {
            reject(e);
          }
        };
      } catch {
        try {
          localStorage.setItem(`hpp_form_photo_${formId}`, JSON.stringify(photoData));
          notifyUpdate(formId);
          resolve(photoData);
        } catch (e) {
          reject(e);
        }
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export async function getFormPhoto(
  formId: 'user-interview' | 'hr-interview'
): Promise<StoredFormPhoto | null> {
  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(formId);
      req.onsuccess = () => {
        if (req.result) {
          resolve(req.result as StoredFormPhoto);
        } else {
          const raw = localStorage.getItem(`hpp_form_photo_${formId}`);
          if (raw) {
            try {
              resolve(JSON.parse(raw));
            } catch {
              resolve(null);
            }
          } else {
            resolve(null);
          }
        }
      };
      req.onerror = () => {
        const raw = localStorage.getItem(`hpp_form_photo_${formId}`);
        if (raw) {
          try {
            resolve(JSON.parse(raw));
          } catch {
            resolve(null);
          }
        } else {
          resolve(null);
        }
      };
    });
  } catch {
    const raw = localStorage.getItem(`hpp_form_photo_${formId}`);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
    return null;
  }
}

export async function removeFormPhoto(formId: 'user-interview' | 'hr-interview'): Promise<void> {
  try {
    const db = await openDatabase();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.delete(formId);
  } catch {
    // ignore
  }
  try {
    localStorage.removeItem(`hpp_form_photo_${formId}`);
  } catch {
    // ignore
  }
  notifyUpdate(formId);
}

export function formatPhotoSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// React Hook to query photo and subscribe to updates
export function useFormPhoto(formId: 'user-interview' | 'hr-interview' | null | undefined) {
  const [photo, setPhoto] = useState<StoredFormPhoto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(() => {
    if (!formId) {
      setPhoto(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    getFormPhoto(formId)
      .then((data) => {
        setPhoto(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [formId]);

  useEffect(() => {
    refresh();
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ formId?: string }>;
      if (!customEvent.detail || customEvent.detail.formId === formId) {
        refresh();
      }
    };
    window.addEventListener(PHOTO_EVENT, handler);
    return () => window.removeEventListener(PHOTO_EVENT, handler);
  }, [formId, refresh]);

  return { photo, isLoading, refresh };
}
