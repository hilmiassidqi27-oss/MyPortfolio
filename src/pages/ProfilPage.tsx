import React, { useRef, useState } from 'react';
import {
  ArrowLeft,
  Award,
  Briefcase,
  Download,
  Upload,
  FileCheck,
  RefreshCw,
  FileText,
  AlertCircle,
  Eye
} from 'lucide-react';
import { useStoredCv, saveUploadedCv, triggerCvDownload, formatCvFileSize } from '../utils/cvStorage';
import { CERTIFICATES_DATA, CertificateItem } from '../data/certificatesData';
import { CertificateModal } from '../components/CertificateModal';

interface ProfilPageProps {
  onBack: () => void;
  onOpenContact: () => void;
  onOpenCvModal: () => void;
}

export const ProfilPage: React.FC<ProfilPageProps> = ({ onBack, onOpenContact, onOpenCvModal }) => {
  const { cv } = useStoredCv();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [certFilter, setCertFilter] = useState<'all' | 'talent-acquisition' | 'hr-management' | 'tools-hris'>('all');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      setUploadError('Ukuran berkas melebihi batas 25 MB.');
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);
      await saveUploadedCv(file);
      setIsUploading(false);
    } catch {
      setIsUploading(false);
      setUploadError('Gagal memproses berkas.');
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      setUploadError('Ukuran berkas melebihi batas 25 MB.');
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);
      await saveUploadedCv(file);
      setIsUploading(false);
    } catch {
      setIsUploading(false);
      setUploadError('Gagal memproses berkas.');
    }
  };

  return (
    <div className="space-y-10 py-4">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="hidden"
        id="profile-cv-file-input"
      />

      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4 animate-fade-in-up">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-neutral-600 hover:text-neutral-950 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-150" />
          <span>Kembali ke Beranda</span>
        </button>
        <div className="flex items-center gap-3">
          {cv ? (
            <button
              type="button"
              onClick={() => triggerCvDownload(cv)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 active:scale-[0.98] text-white text-xs uppercase tracking-wider font-medium transition-all shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh Berkas CV</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenCvModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 active:scale-[0.98] text-white text-xs uppercase tracking-wider font-medium transition-all shadow-2xs"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Unggah CV Asli</span>
            </button>
          )}
          <span className="text-xs font-mono text-neutral-400">04 / KREDENSIAL & CV</span>
        </div>
      </div>

      {/* Title Header */}
      <div className="max-w-3xl space-y-3 animate-fade-in-up animation-delay-75">
        <span className="text-xs text-neutral-500 font-medium uppercase tracking-widest">
          Kurikulum Vitae & Kualifikasi Resmi
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-neutral-950 tracking-tight leading-tight">
          Rekam Jejak, Keahlian & Sertifikasi
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
          Penyelarasan antara latar belakang Sarjana Psikologi (S.Psi), pengalaman rekrutmen praktis di dunia industri, serta penguasaan alat bantu teknologi modern.
        </p>
      </div>

      {/* =========================================================================
          PROMINENT REAL CV ASSET CARD
      ========================================================================= */}
      <section className="bg-white rounded-xl p-6 sm:p-8 border border-neutral-200 shadow-2xs card-floating space-y-4 animate-fade-in-up animation-delay-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-neutral-800" />
              <span>Dokumen Curriculum Vitae (CV Asli)</span>
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5 font-light">
              Gunakan berkas CV asli Anda (PDF atau DOCX) sebagai dokumen unduhan resmi
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenCvModal}
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 inline-flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Format Teks / ATS</span>
            </button>
          </div>
        </div>

        {uploadError && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{uploadError}</span>
          </div>
        )}

        {cv ? (
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                    Berkas CV Asli Aktif
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    Diperbarui: {cv.updatedAt}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1 break-all">
                  {cv.name}
                </h3>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  Ukuran: {formatCvFileSize(cv.size)} · Format: {cv.name.split('.').pop()?.toUpperCase() || 'PDF'}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <button
                type="button"
                onClick={() => triggerCvDownload(cv)}
                className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs inline-flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Berkas CV</span>
              </button>
              <button
                type="button"
                onClick={onOpenCvModal}
                className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 text-xs font-medium transition-colors inline-flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-slate-600" />
                <span>Pratinjau</span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 text-xs font-medium transition-colors inline-flex items-center gap-1.5"
                title="Ganti dengan berkas CV baru"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
                <span>Ganti Berkas</span>
              </button>
            </div>
          </div>
        ) : (
          /* State: Default Verified Official CV + Optional Upload */
          <div className="space-y-4">
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                      Dokumen CV Resmi Siap Ditinjau
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      Hilmi Assidqi, S.Psi
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    Curriculum Vitae — Talent Acquisition & People Operations
                  </h3>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">
                    Format resmi bebas blokir peramban · Tampilan Langsung, Cetak PDF, dan Teks ATS
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <button
                  type="button"
                  onClick={onOpenCvModal}
                  className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs inline-flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Lihat CV Lengkap</span>
                </button>
                <button
                  type="button"
                  onClick={() => triggerCvDownload(null)}
                  className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 text-xs font-medium transition-colors inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span>Unduh Dokumen</span>
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-medium transition-colors inline-flex items-center gap-1.5"
                  title="Unggah berkas CV asli (PDF / DOCX)"
                >
                  <Upload className="w-3.5 h-3.5 text-slate-500" />
                  <span>Unggah PDF Sendiri</span>
                </button>
              </div>
            </div>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-4 sm:p-5 rounded-xl border border-dashed transition-all text-center cursor-pointer group flex flex-col sm:flex-row items-center justify-between gap-3 ${
                isDragging
                  ? 'border-slate-900 bg-slate-100'
                  : 'border-slate-200 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                  <Upload className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-800">
                    Ingin menggunakan berkas CV fisik Anda sendiri?
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Tarik berkas PDF/Word ke sini atau klik untuk mengunggah (Maks. 20 MB).
                  </div>
                </div>
              </div>

              <span className="text-xs font-medium text-slate-700 underline group-hover:text-slate-950">
                Pilih Berkas dari Perangkat &rarr;
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Experience Timeline Section */}
      <section className="space-y-6 animate-fade-in-up animation-delay-150">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-slate-700" />
          <span>Pengalaman Kerja & Kepemimpinan</span>
        </h2>

        <div className="space-y-4">
          {/* Role 1 */}
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs card-floating flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-900">Juni 2026 – sekarang</span>
                <span aria-hidden="true">/</span>
                <span>PT Dian Pandu Pratama</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Recruitment Staff</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                Menangani proses rekrutmen end-to-end: penyaringan berkas, koordinasi jadwal wawancara, fasilitasi FGD, skoring tes psikologi MBTI, verifikasi administrasi PKWT dan BPJS, hingga sambutan onboarding karyawan baru.
              </p>
            </div>
            <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded border border-emerald-200 self-start md:self-center">
              Posisi Aktif
            </div>
          </div>

          {/* Role 2 */}
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs card-floating flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-900">Sep – Des 2023</span>
                <span aria-hidden="true">/</span>
                <span>SMKN 11 Semarang</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Staf Administrasi (Magang)</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                Pengelolaan dokumen dan arsip kependidikan dengan akurasi 100%, pendataan logistik asesmen sekolah, serta koordinasi berkas legal institusi pendidikan.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-500 self-start md:self-center">
              Akurasi 100%
            </div>
          </div>

          {/* Role 3 */}
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs card-floating flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-900">Jan – Des 2023</span>
                <span aria-hidden="true">/</span>
                <span>Universitas AKI Semarang</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Ketua Himpunan Mahasiswa Psikologi</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                Memimpin 21 pengurus himpunan dalam merancang, mengeksekusi program kerja departemen, dan memoderasi dinamika kelompok kemahasiswaan.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-500 self-start md:self-center">
              Leadership
            </div>
          </div>

          {/* Role 4 */}
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs card-floating flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-900">2020 – 2024</span>
                <span aria-hidden="true">/</span>
                <span>Fakultas Psikologi</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">Sarjana Psikologi (S.Psi) • Universitas AKI Semarang</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                Peminatan Psikologi Industri & Organisasi (PIO). Judul Skripsi: <em>Hubungan Kohesivitas Kelompok dan Efikasi Diri dengan Social Loafing</em>.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-slate-900 self-start md:self-center">
              Gelar S.Psi
            </div>
          </div>
        </div>
      </section>

      {/* Skills Matrix */}
      <section className="space-y-6 animate-fade-in-up animation-delay-200">
        <h2 className="text-lg font-bold text-slate-900">Matriks Kapabilitas & Keahlian</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs card-floating flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
                Recruitment & People Operations
              </h3>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {[
                  'End-to-End Talent Acquisition',
                  'CV Screening & Shortlisting',
                  'Wawancara Kompetensi STAR',
                  'FGD Facilitation & Assessment',
                  'Asesmen Psikologi & MBTI',
                  'Onboarding & Employee Welcoming',
                  'Administrasi PKWT & Personalia'
                ].map((s, i) => (
                  <span key={i} className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:border-slate-300 transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-600">
              <span className="font-semibold text-slate-900">Kemampuan Bahasa:</span> Indonesia (Native), Inggris (B2 Intermediate), Mandarin (Dasar).
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs card-floating flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
                HR-Tech, Otomasi & Sistem Digital
              </h3>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {[
                  'React & TypeScript Workflow',
                  'Firebase Datastore',
                  'Vite & Vercel Deployment',
                  'Microsoft Excel / Google Sheets Lanjut',
                  'E-Recruitment Tracking System',
                  'Digital Psychometric Scoring'
                ].map((t, i) => (
                  <span key={i} className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:border-slate-300 transition-colors">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-600">
              <span className="font-semibold text-slate-900">Filosofi Teknis:</span> Membangun otomasi mandiri tanpa ketergantungan software berbayar mahal.
            </div>
          </div>
        </div>
      </section>

      {/* Official Certifications & Verified Credentials */}
      <section className="space-y-6 animate-fade-in-up animation-delay-250">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-neutral-200 pb-3 gap-2">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-950 flex items-center gap-2.5">
              <Award className="w-5 h-5 text-neutral-800" />
              <span>Sertifikasi & Kualifikasi Resmi</span>
            </h2>
            <p className="text-xs text-neutral-500 font-light mt-0.5">
              Klik pada masing-masing dokumen sertifikat untuk melihat lembar bukti asli, detail kompetensi, dan tautan unduhan PDF.
            </p>
          </div>
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider shrink-0">
            {CERTIFICATES_DATA.length} Kredensial Terverifikasi
          </span>
        </div>

        {/* Category Filters: Clean Classical Segmented Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-200/70 rounded-lg max-w-xl text-xs font-medium">
          {[
            { id: 'all', label: 'Semua (11)' },
            { id: 'talent-acquisition', label: 'Talent Acquisition (9)' },
            { id: 'hr-management', label: 'HR Management (1)' },
            { id: 'tools-hris', label: 'HRIS & Tools (1)' }
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setCertFilter(f.id as typeof certFilter)}
              className={`px-3 py-1.5 rounded transition-all uppercase tracking-wider text-[11px] ${
                certFilter === f.id
                  ? 'bg-white text-neutral-950 shadow-2xs font-semibold'
                  : 'text-neutral-600 hover:text-neutral-950'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Certificate Cards Grid: Interactive Clickable Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTIFICATES_DATA.filter((c) => certFilter === 'all' || c.category === certFilter).map((cert, idx) => (
            <div
              key={cert.id}
              tabIndex={0}
              role="button"
              onClick={() => setSelectedCert(cert)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedCert(cert)}
              className="group bg-white rounded-xl border border-neutral-200 p-5 shadow-2xs card-floating cursor-pointer flex flex-col justify-between active:scale-[0.99] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900"
            >
              <div>
                {/* Visual Thumbnail Preview Frame */}
                <div className="relative aspect-[16/9] bg-neutral-100 rounded border border-neutral-200 overflow-hidden mb-4 group-hover:border-neutral-300 transition-colors">
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="px-3 py-1.5 rounded bg-white text-neutral-950 text-[11px] font-semibold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat Sertifikat</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mb-1.5">
                  <span className="truncate max-w-[200px]">{cert.issuer}</span>
                  <span className="shrink-0">{cert.date}</span>
                </div>

                <h3 className="font-serif text-lg font-bold text-neutral-950 group-hover:text-neutral-900 leading-snug">
                  {cert.title}
                </h3>

                <p className="text-xs text-neutral-600 line-clamp-2 mt-2 font-light leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                  ID: {cert.credentialId ? cert.credentialId.slice(0, 16) + '...' : 'Terverifikasi'}
                </span>
                <span className="font-semibold text-neutral-950 inline-flex items-center gap-1 text-[11px] uppercase tracking-wider group-hover:underline">
                  <span>Buka Lembar</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Certificate Modal */}
      <CertificateModal
        certificate={selectedCert}
        isOpen={Boolean(selectedCert)}
        onClose={() => setSelectedCert(null)}
        onSelectCertificate={(cert) => setSelectedCert(cert)}
        allCertificates={CERTIFICATES_DATA}
      />

      {/* Footer Navigation CTA */}
      <div className="flex items-center justify-between pt-6 border-t border-neutral-200 animate-fade-in-up animation-delay-300">
        <button
          type="button"
          onClick={onBack}
          className="text-xs uppercase tracking-wider font-semibold text-neutral-600 hover:text-neutral-950 transition-colors group inline-flex items-center gap-1"
        >
          <span className="group-hover:-translate-x-1 inline-block transition-transform duration-150">&larr;</span>
          <span>Kembali ke Beranda</span>
        </button>
        <button
          type="button"
          onClick={onOpenContact}
          className="px-5 py-2.5 rounded bg-neutral-950 hover:bg-neutral-800 active:scale-[0.98] text-white text-xs uppercase tracking-wider font-medium transition-all shadow-2xs"
        >
          Undang Wawancara Kerja
        </button>
      </div>
    </div>
  );
};
