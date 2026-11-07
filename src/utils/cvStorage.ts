import { useState, useEffect, useCallback } from 'react';

// Utility to persist and retrieve the user's uploaded real CV file using IndexedDB and LocalStorage
export interface StoredCv {
  name: string;
  size: number;
  type: string;
  dataUrl: string;
  updatedAt: string;
}

const DB_NAME = 'HilmiCvDB';
const STORE_NAME = 'cv_store';
const KEY = 'uploaded_cv';
const CV_EVENT = 'hilmi-cv-updated';

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

function notifyUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CV_EVENT));
  }
}

/**
 * Converts a base64 data URL to a binary Blob
 */
export function dataUrlToBlob(dataUrl: string): Blob {
  try {
    const parts = dataUrl.split(';base64,');
    const contentType = parts[0].split(':')[1] || 'application/pdf';
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  } catch (e) {
    return new Blob([dataUrl], { type: 'text/plain' });
  }
}

/**
 * Creates a safe object URL for viewing or opening in a new tab without sandbox blocking
 */
export function getBlobUrl(dataUrl: string): string {
  try {
    const blob = dataUrlToBlob(dataUrl);
    return URL.createObjectURL(blob);
  } catch {
    return dataUrl;
  }
}

export async function saveUploadedCv(file: File): Promise<StoredCv> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const cvData: StoredCv = {
        name: file.name,
        size: file.size,
        type: file.type || (file.name.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'application/octet-stream'),
        dataUrl,
        updatedAt: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      };

      try {
        const db = await openDatabase();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put(cvData, KEY);
        tx.oncomplete = () => {
          notifyUpdate();
          resolve(cvData);
        };
        tx.onerror = () => {
          // Fallback to localStorage if IndexedDB transaction fails
          try {
            localStorage.setItem(KEY, JSON.stringify(cvData));
            notifyUpdate();
            resolve(cvData);
          } catch (e) {
            reject(e);
          }
        };
      } catch {
        // Fallback to localStorage
        try {
          localStorage.setItem(KEY, JSON.stringify(cvData));
          notifyUpdate();
          resolve(cvData);
        } catch (e) {
          reject(e);
        }
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export async function getStoredCv(): Promise<StoredCv | null> {
  try {
    const db = await openDatabase();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(KEY);
      req.onsuccess = () => {
        if (req.result) {
          resolve(req.result as StoredCv);
        } else {
          // Check localStorage fallback
          const raw = localStorage.getItem(KEY);
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
        const raw = localStorage.getItem(KEY);
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
    const raw = localStorage.getItem(KEY);
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

export async function removeStoredCv(): Promise<void> {
  try {
    const db = await openDatabase();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.delete(KEY);
  } catch {
    // ignore
  }
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
  notifyUpdate();
}

const DEFAULT_ATS_TEXT = `===================================================================
CURRICULUM VITAE — HILMI ASSIDQI, S.Psi
Recruitment & People Operations Specialist | Open to Work
Email: hilmiassidqi27@gmail.com | Lokasi: Semarang, Jawa Tengah
LinkedIn: linkedin.com/in/hilmiassidqi
===================================================================

RINGKASAN EKSEKUTIF
Sarjana Psikologi (S.Psi) dari Universitas AKI Semarang dengan fokus Psikologi Industri & Organisasi (PIO). Saat ini menjabat sebagai Recruitment Staff di PT Dian Pandu Pratama dengan keahlian terbukti dalam talent acquisition end-to-end, penapisan kualifikasi berkas terarah, wawancara berbasis kompetensi (STAR/BEI), koordinasi wawancara teknis user, administrasi psikometri MBTI, hingga kepatuhan hukum ketenagakerjaan (PKWT/BPJS). Berpengalaman mengembangkan instrumen evaluasi dan otomasi web rekrutmen mandiri yang memangkas waktu kerja administratif skoring.

PENGALAMAN KERJA
1. Recruitment Staff — PT Dian Pandu Pratama (Juni 2026 – Sekarang | Semarang)
   - Mengelola rekrutmen end-to-end mulai dari requisition intake, job posting multi-channel, screening, assessment, hingga offering & onboarding.
   - Melakukan penapisan berkas pelamar secara teliti sesuai standar kompetensi posisi dengan target respons komunikasi kandidat di bawah 24 jam.
   - Mengembangkan dan memfasilitasi Focus Group Discussion (FGD) untuk seleksi kandidat batch staf operasional dan profesional.
   - Mengembangkan aplikasi Asesmen MBTI mandiri (24 skenario terkalibrasi) yang mengotomasi skoring psikometri dan menghemat 50% waktu kerja.
   - Memastikan 100% kepatuhan administrasi PKWT/PKWTT, kepesertaan BPJS Ketenagakerjaan & Kesehatan, serta program induksi Day-1.

2. Staf Administrasi & Kependidikan (Magang) — SMKN 11 Semarang (Sep – Des 2023 | Semarang)
   - Mengelola sistem pengarsipan berkas kependidikan dan database siswa/staf dengan akurasi 100%.
   - Mendukung penyiapan logistik administrasi asesmen dan akreditasi sekolah.

PENDIDIKAN FORMAL
- Sarjana Psikologi (S.Psi) — Universitas AKI Semarang (2020 – 2024)
  Peminatan: Psikologi Industri & Organisasi (PIO)
  Skripsi: Hubungan Kohesivitas Kelompok dan Efikasi Diri dengan Social Loafing.

KEAHLIAN & KOMPETENSI INTI
- Rekrutmen & Seleksi: End-to-End Talent Acquisition, Screening CV, STAR Interview, FGD Facilitation
- Asesmen Psikometri: MBTI, DISC, CFIT, Papikostick, Culture Fit Evaluation
- Hubungan Industrial: PKWT/PKWTT, BPJS Ketenagakerjaan & Kesehatan, Employee Onboarding
- Alat & Teknologi: ATS Management, Google Workspace, Notion, Spreadsheet, Web Automation`;

export function triggerCvDownload(cv?: StoredCv | null) {
  if (cv && cv.dataUrl) {
    try {
      const blob = dataUrlToBlob(cv.dataUrl);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = cv.name || 'CV_Hilmi_Assidqi_SPsi.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 4000);
      return;
    } catch {
      // fallback to dataUrl
      const link = document.createElement('a');
      link.href = cv.dataUrl;
      link.download = cv.name || 'CV_Hilmi_Assidqi_SPsi.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
  }

  // If no file uploaded, download formatted text CV directly
  const blob = new Blob([DEFAULT_ATS_TEXT], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'CV_Hilmi_Assidqi_SPsi_Recruitment.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export function formatCvFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// React Hook to access and listen to stored CV changes
export function useStoredCv() {
  const [cv, setCv] = useState<StoredCv | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(() => {
    setIsLoading(true);
    getStoredCv()
      .then((data) => {
        setCv(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    refresh();
    const handler = () => {
      refresh();
    };
    window.addEventListener(CV_EVENT, handler);
    return () => window.removeEventListener(CV_EVENT, handler);
  }, [refresh]);

  return { cv, isLoading, refresh };
}
