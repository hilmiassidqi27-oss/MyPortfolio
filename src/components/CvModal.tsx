import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Upload,
  Download,
  FileCheck,
  Trash2,
  Printer,
  Copy,
  Check,
  RefreshCw,
  FileText,
  AlertCircle,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  MapPin,
  Calendar,
  CheckCircle2,
  Info
} from 'lucide-react';
import {
  StoredCv,
  getStoredCv,
  saveUploadedCv,
  removeStoredCv,
  triggerCvDownload,
  getBlobUrl,
  formatCvFileSize
} from '../utils/cvStorage';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const [storedCv, setStoredCv] = useState<StoredCv | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'document' | 'file' | 'ats'>('document');
  const [copied, setCopied] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load stored CV and prepare safe blob URL
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setErrorMessage(null);
      getStoredCv()
        .then((cv) => {
          setStoredCv(cv);
          if (cv?.dataUrl) {
            setBlobUrl(getBlobUrl(cv.dataUrl));
          } else {
            setBlobUrl(null);
          }
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen]);

  // Clean up blob URL on unmount or file change
  useEffect(() => {
    return () => {
      if (blobUrl && blobUrl.startsWith('blob:')) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [blobUrl]);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      setErrorMessage('Ukuran berkas melebihi batas maksimum 20 MB.');
      return;
    }

    try {
      setIsUploading(true);
      setErrorMessage(null);
      const saved = await saveUploadedCv(file);
      setStoredCv(saved);
      if (saved.dataUrl) {
        setBlobUrl(getBlobUrl(saved.dataUrl));
      }
      setIsUploading(false);
      setUploadSuccess(true);
      // Switch to file tab to show the uploaded file immediately
      setActiveTab('file');
      setTimeout(() => setUploadSuccess(false), 3500);
    } catch {
      setIsUploading(false);
      setErrorMessage('Gagal memproses berkas. Pastikan format berkas berupa PDF atau Word.');
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      setErrorMessage('Ukuran berkas melebihi batas maksimum 20 MB.');
      return;
    }

    try {
      setIsUploading(true);
      setErrorMessage(null);
      const saved = await saveUploadedCv(file);
      setStoredCv(saved);
      if (saved.dataUrl) {
        setBlobUrl(getBlobUrl(saved.dataUrl));
      }
      setIsUploading(false);
      setUploadSuccess(true);
      setActiveTab('file');
      setTimeout(() => setUploadSuccess(false), 3500);
    } catch {
      setIsUploading(false);
      setErrorMessage('Gagal memproses berkas.');
    }
  };

  const handleDeleteCv = async () => {
    if (window.confirm('Hapus berkas CV tersimpan dan kembalikan ke profil default?')) {
      await removeStoredCv();
      setStoredCv(null);
      setBlobUrl(null);
      setActiveTab('document');
    }
  };

  const handleCopyText = () => {
    const text = document.getElementById('printable-cv')?.innerText || '';
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/75 backdrop-blur-sm overflow-y-auto"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col focus:outline-none"
        tabIndex={-1}
      >
        {/* Sticky Action Bar (Hidden on print) */}
        <div className="no-print sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <h2 id="cv-dialog-title" className="text-base font-bold text-slate-900">
                Curriculum Vitae — Hilmi Assidqi, S.Psi
              </h2>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Open to Work
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Dokumen resmi lamaran kerja & rekam jejak profesional
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Tab Switcher */}
            <div className="flex bg-slate-200/80 p-0.5 rounded-lg text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveTab('document')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  activeTab === 'document'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Dokumen CV (Tampilan Langsung)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('file')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  activeTab === 'file'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Berkas Asli {storedCv ? `(${storedCv.name.split('.').pop()?.toUpperCase() || 'PDF'})` : '(Unggah)'}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('ats')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  activeTab === 'ats'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Format ATS
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors ml-1"
              aria-label="Tutup jendela CV"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-8 space-y-6">
          {/* Notification Messages */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {uploadSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Berkas CV asli berhasil diunggah dan tersimpan aman di peramban Anda!</span>
            </div>
          )}

          {/* =========================================================================
              TAB 1: UNBLOCKABLE NATIVE DOCUMENT VIEW (TAMPILAN LANGSUNG)
              - 100% Native HTML, immune to iframe/plugin blocking and CSP issues
              - Beautiful executive typography & complete information
          ========================================================================= */}
          {activeTab === 'document' && (
            <div className="space-y-6">
              {/* Document Action Strip */}
              <div className="no-print p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Dokumen CV Siap Tinjau</strong> · Tidak terblokir oleh peramban atau pembatas iframe.
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => triggerCvDownload(storedCv)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{storedCv ? 'Unduh Berkas CV Asli' : 'Unduh Berkas CV'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-600" />
                    <span>Cetak ke PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                    <span>{copied ? 'Tersalin' : 'Salin Teks'}</span>
                  </button>
                </div>
              </div>

              {/* High-Fidelity Executive Paper CV */}
              <article
                id="printable-cv"
                className="bg-white border border-slate-200 rounded-2xl shadow-xs p-6 sm:p-10 space-y-8 text-slate-800 font-sans"
              >
                {/* Header Profile */}
                <header className="border-b-2 border-slate-900 pb-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Hilmi Assidqi, S.Psi
                      </h1>
                      <p className="text-base font-semibold text-slate-700 mt-1">
                        Recruitment & People Operations Specialist
                      </p>
                      <div className="inline-flex items-center gap-2 mt-2 px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                        <span>Sarjana Psikologi (S.Psi)</span>
                        <span aria-hidden="true" className="text-slate-300">•</span>
                        <span>Peminatan Psikologi Industri & Organisasi (PIO)</span>
                      </div>
                    </div>

                    <div className="sm:text-right space-y-1.5 text-xs text-slate-600 font-mono">
                      <div className="flex sm:justify-end items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <a href="mailto:hilmiassidqi27@gmail.com" className="hover:text-slate-900 underline decoration-slate-300">
                          hilmiassidqi27@gmail.com
                        </a>
                      </div>
                      <div className="flex sm:justify-end items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>Semarang, Jawa Tengah, Indonesia</span>
                      </div>
                      <div className="flex sm:justify-end items-center gap-1.5">
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                        <a
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-slate-900 underline decoration-slate-300"
                        >
                          linkedin.com/in/hilmiassidqi
                        </a>
                      </div>
                    </div>
                  </div>
                </header>

                {/* Section: Ringkasan Eksekutif */}
                <section className="space-y-2">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-slate-700" />
                    <span>Ringkasan Profesional & Nilai Tambah Kandidat</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                    Praktisi Talent Acquisition dan People Operations berlatar belakang Sarjana Psikologi (S.Psi) Universitas AKI Semarang dengan fokus Psikologi Industri & Organisasi (PIO). Saat ini aktif sebagai Recruitment Staff di PT Dian Pandu Pratama dengan keahlian komprehensif mengelola rekrutmen <em>end-to-end</em>: penapisan kualifikasi berkas terarah (SLA respons kandidat &lt; 24 jam), wawancara berbasis kompetensi (STAR/BEI), koordinasi wawancara teknis user, serta pengadministrasian alat tes psikometri (MBTI, DISC, CFIT). Mampu menjembatani aspek psikologis manusia dengan efisiensi teknologi melalui pengembangan otomasi web asesmen mandiri yang memangkas beban kerja administratif skoring. Siap berkontribusi optimal pada posisi Talent Acquisition / HR Generalist / People Operations.
                  </p>
                </section>

                {/* Section: Pengalaman Kerja */}
                <section className="space-y-4">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-700" />
                    <span>Pengalaman Kerja Profesional</span>
                  </h2>

                  <div className="space-y-5">
                    {/* Role 1 */}
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">
                            Recruitment Staff · PT Dian Pandu Pratama
                          </h3>
                          <p className="text-xs text-slate-600 font-medium">
                            Departemen Human Resources / Talent Acquisition
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500 font-mono mt-0.5 sm:mt-0">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>Juni 2026 – Sekarang | Semarang</span>
                        </div>
                      </div>

                      <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs sm:text-sm text-slate-700">
                        <li>
                          <strong>End-to-End Talent Acquisition</strong>: Memimpin siklus perekrutan mulai dari <em>hiring manager requisition intake</em>, publikasi lowongan kerja multi-kanal, penapisan awal, koordinasi jadwal wawancara, hingga negosiasi penawaran (<em>offering</em>).
                        </li>
                        <li>
                          <strong>Penapisan Kualifikasi Berkas & SLA Respons</strong>: Menapis berkas pelamar secara teliti berbasis kesesuaian kualifikasi dan kompetensi posisi, serta mempertahankan komitmen respons komunikasi kandidat di bawah 24 jam.
                        </li>
                        <li>
                          <strong>Inisiatif Focus Group Discussion (FGD)</strong>: Merancang dan memfasilitasi skenario diskusi kelompok terarah untuk seleksi <em>batch hiring</em> guna mengamati dinamika kepemimpinan, komunikasi persuasif, dan kerja tim secara obyektif.
                        </li>
                        <li>
                          <strong>Inovasi Otomasi Web Asesmen MBTI</strong>: Mengembangkan aplikasi web psikometri mandiri dengan 24 butir instrumen terkalibrasi yang mengeliminasi kalkulasi manual dan menghemat sekitar 50% waktu kerja skoring rekruter.
                        </li>
                        <li>
                          <strong>Kepatuhan Hukum & Onboarding Day-1</strong>: Mengelola administrasi perjanjian kerja (PKWT/PKWTT), pendaftaran kepesertaan BPJS Ketenagakerjaan dan Kesehatan, serta memandu program orientasi kandidat baru agar langsung siap bekerja.
                        </li>
                      </ul>
                    </div>

                    {/* Role 2 */}
                    <div className="space-y-2 border-t border-slate-100 pt-4">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">
                            Staf Administrasi & Kependidikan (Magang) · SMKN 11 Semarang
                          </h3>
                          <p className="text-xs text-slate-600 font-medium">
                            Divisi Tata Usaha & Kesiswaan
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500 font-mono mt-0.5 sm:mt-0">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>Sep – Des 2023 | Semarang</span>
                        </div>
                      </div>

                      <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs sm:text-sm text-slate-700">
                        <li>
                          Mengelola sistem pengarsipan berkas kependidikan, rekapitulasi data siswa, dan korespondensi resmi dengan akurasi 100%.
                        </li>
                        <li>
                          Mendukung penyiapan logistik administrasi asesmen dan akreditasi sekolah secara tertib waktu.
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section: Pendidikan Formal */}
                <section className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-700" />
                    <span>Pendidikan Formal</span>
                  </h2>

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Sarjana Psikologi (S.Psi) · Universitas AKI Semarang
                      </h3>
                      <p className="text-xs text-slate-700 mt-0.5">
                        Peminatan Psikologi Industri & Organisasi (PIO)
                      </p>
                      <p className="text-xs text-slate-500 italic mt-0.5">
                        Skripsi: "Hubungan Kohesivitas Kelompok dan Efikasi Diri dengan Social Loafing pada Tim Kerja."
                      </p>
                    </div>
                    <div className="text-xs font-mono text-slate-500 mt-1 sm:mt-0">
                      2020 – 2024
                    </div>
                  </div>
                </section>

                {/* Section: Keahlian & Sertifikasi */}
                <section className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-slate-700" />
                    <span>Kompetensi Teknis, Metodologi & Alat Bantu</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                      <div className="font-bold text-slate-900">Metodologi Rekrutmen & Asesmen</div>
                      <p className="text-slate-600">
                        Behavioral Event Interview (BEI), STAR Method, Focus Group Discussion (FGD), Talent Sourcing, Job Analysis.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                      <div className="font-bold text-slate-900">Psikometri & Evaluasi Psikologi</div>
                      <p className="text-slate-600">
                        MBTI 16 Kepribadian, DISC, CFIT, Papikostick, Tes Intelegensi & Sikap Kerja, Culture-Fit Assessment.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                      <div className="font-bold text-slate-900">Operasional HR & Legal Ketenagakerjaan</div>
                      <p className="text-slate-600">
                        Kontrak Kerja PKWT/PKWTT, BPJS Ketenagakerjaan (JKK, JKM, JHT, JP), BPJS Kesehatan, Onboarding Checklist.
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                      <div className="font-bold text-slate-900">Perangkat Lunak & Otomasi</div>
                      <p className="text-slate-600">
                        ATS Platform, Google Workspace, Spreadsheet Analytics (VLOOKUP, Pivot), Notion, Web Tool Automation.
                      </p>
                    </div>
                  </div>
                </section>
              </article>
            </div>
          )}

          {/* =========================================================================
              TAB 2: UPLOADED REAL FILE (PDF / WORD)
              - If uploaded, provides safe Open in New Tab link + in-app viewer with sandbox warning
              - If not uploaded, provides drag-and-drop file upload
          ========================================================================= */}
          {activeTab === 'file' && (
            <div className="space-y-6">
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="cv-file-upload-input"
              />

              {storedCv ? (
                <div className="space-y-5">
                  {/* File Metadata & Direct Action Strip */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                        <FileCheck className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded w-fit mb-1 border border-emerald-200/50">
                          Berkas CV Asli Aktif
                        </div>
                        <h3 className="text-base font-bold text-slate-900 break-all">{storedCv.name}</h3>
                        <div className="text-xs text-slate-500 font-mono mt-0.5">
                          Ukuran: {formatCvFileSize(storedCv.size)} · Diperbarui: {storedCv.updatedAt}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                      {/* CRITICAL: Safe "Open in New Tab" Link using Blob URL */}
                      {blobUrl && (storedCv.type.includes('pdf') || storedCv.name.toLowerCase().endsWith('.pdf')) && (
                        <a
                          href={blobUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors shadow-xs inline-flex items-center gap-1.5"
                          title="Buka berkas di tab peramban baru agar bebas dari pemblokiran iframe"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Buka di Tab Baru</span>
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => triggerCvDownload(storedCv)}
                        className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-sm inline-flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Unduh Berkas</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 text-xs font-medium transition-colors inline-flex items-center justify-center gap-1.5"
                        title="Unggah berkas CV baru untuk menggantikan berkas ini"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
                        <span>Ganti Berkas</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleDeleteCv}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
                        title="Hapus berkas CV tersimpan"
                        aria-label="Hapus berkas"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Browser Sandbox Advisory Banner */}
                  <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-semibold text-amber-950">
                        Solusi jika pratinjau terblokir oleh peramban:
                      </p>
                      <p className="text-amber-800 leading-relaxed">
                        Kebijakan keamanan peramban modern (seperti Chrome & Firefox) kerap memblokir plugin penampil PDF internal di dalam jendela sematan (*iframe sandbox*). Jika jendela di bawah menampilkan pesan <em>"terblokir"</em>, gunakan tombol hijau <strong>"Buka di Tab Baru"</strong> di atas atau lihat tab <strong>"Dokumen CV (Tampilan Langsung)"</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Embedded PDF Viewer if PDF */}
                  {storedCv.type.includes('pdf') || storedCv.name.toLowerCase().endsWith('.pdf') ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-semibold text-slate-900 uppercase tracking-wider">
                          Jendela Dokumen PDF
                        </span>
                        <span>Scrollable</span>
                      </div>
                      <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-100 shadow-inner">
                        <object
                          data={blobUrl || storedCv.dataUrl}
                          type="application/pdf"
                          className="w-full h-[520px] rounded-2xl bg-white"
                        >
                          <div className="p-8 text-center space-y-4 bg-white h-full flex flex-col items-center justify-center">
                            <AlertCircle className="w-10 h-10 text-amber-600" />
                            <div className="space-y-1 max-w-md">
                              <h4 className="font-bold text-slate-900 text-sm">
                                Plugin PDF Dinonaktifkan oleh Peramban
                              </h4>
                              <p className="text-xs text-slate-600 leading-relaxed">
                                Peramban Anda membatasi plugin penampil PDF di dalam jendela sematan. Anda tetap dapat membuka atau mengunduh dokumen secara langsung:
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {blobUrl && (
                                <a
                                  href={blobUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold inline-flex items-center gap-1.5"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  <span>Buka di Tab Baru</span>
                                </a>
                              )}
                              <button
                                type="button"
                                onClick={() => triggerCvDownload(storedCv)}
                                className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold inline-flex items-center gap-1.5"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>Unduh Berkas</span>
                              </button>
                            </div>
                          </div>
                        </object>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-3">
                      <FileText className="w-10 h-10 text-slate-400 mx-auto" />
                      <div className="text-sm font-semibold text-slate-800">
                        Berkas Dokumen Word (.docx/.doc) Tersimpan
                      </div>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Format berkas Word tidak dapat dipratinjau langsung di dalam browser web. Klik tombol "Unduh Berkas" di atas untuk membuka dokumen pada aplikasi Microsoft Word Anda.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* State: No file uploaded yet, show upload dropzone */
                <div className="space-y-6">
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="p-8 sm:p-12 rounded-2xl border-2 border-dashed border-slate-300 hover:border-slate-800 bg-slate-50/60 hover:bg-slate-50 transition-all text-center cursor-pointer group space-y-4"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white text-slate-800 border border-slate-200 flex items-center justify-center mx-auto shadow-sm group-hover:scale-105 transition-transform">
                      <Upload className="w-7 h-7 text-slate-700" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {isUploading ? 'Sedang Memproses Berkas...' : 'Unggah Berkas CV Asli Anda (PDF / DOCX)'}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                        Tarik & lepas berkas CV asli Anda ke area ini, atau klik untuk memilih berkas dari komputer/smartphone Anda.
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        disabled={isUploading}
                        className="px-5 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm inline-flex items-center gap-2"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Pilih Berkas dari Komputer</span>
                      </button>
                    </div>

                    <div className="text-[11px] font-mono text-slate-400">
                      Mendukung PDF, DOC, DOCX (Maksimal 20 MB) · Tersimpan permanen di peramban
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
                    <FileText className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Catatan: Berkas yang Anda unggah akan menjadi berkas unduhan utama saat peninjau mengklik tombol <strong>"Unduh CV"</strong> di navigasi atas maupun halaman beranda.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              TAB 3: ATS TEXT FORMAT
              - Raw text copy-paste for candidate application portals
          ========================================================================= */}
          {activeTab === 'ats' && (
            <div className="space-y-6">
              <div className="no-print p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-slate-600">
                  Format teks digital ATS-friendly. Cocok untuk disalin ke formulir lamaran kerja perusahaan.
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyText}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors shadow-xs"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-300" />}
                    <span>{copied ? 'Tersalin!' : 'Salin Semua Teks'}</span>
                  </button>
                </div>
              </div>

              <pre className="p-6 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap select-all">
                {`===================================================================
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
- Alat & Teknologi: ATS Management, Google Workspace, Notion, Spreadsheet, Web Automation`}
              </pre>
            </div>
          )}
        </div>

        {/* Footer info (hidden on print) */}
        <div className="no-print px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-3">
          <span>
            {storedCv
              ? `Berkas asli terpasang: ${storedCv.name} (${formatCvFileSize(storedCv.size)})`
              : 'Profil CV Resmi Hilmi Assidqi, S.Psi siap diunduh & ditinjau.'}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => triggerCvDownload(storedCv)}
              className="text-slate-900 font-semibold hover:underline inline-flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Berkas</span>
            </button>
            <span aria-hidden="true" className="text-slate-300">|</span>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-700 font-medium hover:text-slate-900"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
