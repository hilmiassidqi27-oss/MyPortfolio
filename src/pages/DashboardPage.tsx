import React, { useState, useRef } from 'react';
import { PageId } from '../types';
import {
  ArrowRight,
  Mail,
  Check,
  ExternalLink,
  GitBranch,
  Layers,
  Users,
  Award,
  Upload,
  Download,
  FileCheck,
  RefreshCw,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useStoredCv, saveUploadedCv, triggerCvDownload, formatCvFileSize } from '../utils/cvStorage';

interface DashboardPageProps {
  onNavigate: (page: PageId) => void;
  onOpenContact: () => void;
  onOpenMbtiModal: () => void;
  onOpenCvModal: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigate,
  onOpenContact,
  onOpenMbtiModal,
  onOpenCvModal
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { cv } = useStoredCv();
  const email = 'hilmiassidqi27@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

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
      setUploadError('Gagal menyimpan berkas CV.');
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
      setUploadError('Gagal menyimpan berkas CV.');
    }
  };

  return (
    <div className="space-y-10 md:space-y-14 py-4">
      {/* Hidden Global File Input for quick upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="hidden"
        id="dashboard-cv-file-input"
      />

      {/* =========================================================================
          HERO OVERVIEW: Classical Monochrome Editorial
      ========================================================================= */}
      <section className="bg-white rounded-xl p-8 sm:p-12 border border-neutral-200/90 shadow-2xs card-floating animate-fade-in-up">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-6">
            {/* Metadata Badging (Unboxed, classical uppercase) */}
            <div className="flex flex-wrap items-center gap-2 text-xs tracking-wider uppercase text-neutral-500 font-medium">
              <span className="text-neutral-900 font-semibold">Hilmi Assidqi, S.Psi</span>
              <span aria-hidden="true" className="text-neutral-300">/</span>
              <span>Talent Acquisition & People Operations</span>
              <span aria-hidden="true" className="text-neutral-300">/</span>
              <span>PT Dian Pandu Pratama</span>
              <span aria-hidden="true" className="text-neutral-300">/</span>
              <span className="text-neutral-900 font-semibold tracking-widest text-[11px]">
                Open to Opportunities
              </span>
            </div>

            {/* Impact Headline with Cormorant Garamond Serif */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-medium text-neutral-950 tracking-tight leading-[1.12] text-balance">
              Menemukan orang yang tepat, lalu menyambut mereka dengan baik.
            </h1>

            {/* Brief Introduction */}
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl font-light">
              Recruitment Staff dengan latar belakang Sarjana Psikologi (S.Psi) yang siap berkontribusi langsung pada tim Talent Acquisition & People Operations perusahaan Anda. Berpengalaman menangani rekrutmen end-to-end: penapisan kualifikasi berkas terstruktur, wawancara kompetensi STAR, asesmen psikometri MBTI, wawancara teknis user, hingga kepatuhan onboarding hari pertama—serta mampu membangun instrumen evaluasi dan otomasi web mandiri.
            </p>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenContact}
                className="px-6 py-3 rounded bg-neutral-950 hover:bg-neutral-800 active:scale-[0.98] text-white text-xs uppercase tracking-wider font-medium transition-all shadow-2xs"
              >
                Undang Wawancara
              </button>

              {cv ? (
                <div className="inline-flex rounded shadow-2xs border border-neutral-300 overflow-hidden hover:border-neutral-900 transition-colors">
                  <button
                    type="button"
                    onClick={() => triggerCvDownload(cv)}
                    className="px-4 py-2.5 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-neutral-800 text-xs uppercase tracking-wider font-medium transition-colors inline-flex items-center gap-2"
                    title={`Unduh berkas CV asli (${cv.name})`}
                  >
                    <Download className="w-3.5 h-3.5 text-neutral-800" />
                    <span>Unduh CV ({cv.name.split('.').pop()?.toUpperCase() || 'PDF'})</span>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenCvModal}
                    className="px-2.5 py-2.5 bg-neutral-50 hover:bg-neutral-100 active:bg-neutral-200 text-neutral-700 border-l border-neutral-200 transition-colors"
                    title="Buka Pratinjau Dokumen CV"
                  >
                    <FileText className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={onOpenCvModal}
                  className="px-5 py-2.5 rounded bg-white hover:bg-neutral-50 active:scale-[0.98] text-neutral-800 text-xs uppercase tracking-wider font-medium border border-neutral-300 hover:border-neutral-900 transition-all shadow-2xs inline-flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-neutral-700" />
                  <span>Lihat CV Lengkap</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onNavigate('alur-kerja')}
                className="px-5 py-2.5 rounded bg-neutral-100 hover:bg-neutral-200 active:scale-[0.98] text-neutral-800 text-xs uppercase tracking-wider font-medium border border-neutral-200 transition-all inline-flex items-center gap-1.5 group"
              >
                <span>Lihat Alur Kerja</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:translate-x-1 transition-transform duration-150" />
              </button>
            </div>
          </div>

          {/* Recruiter Badge Box: Editorial Minimalist Frame */}
          <div className="lg:col-span-4 bg-[#FBFBFA] rounded-xl p-6 border border-neutral-200 space-y-5 card-floating">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-lg bg-neutral-900 text-white font-serif font-bold text-xl flex items-center justify-center shadow-2xs">
                HA
              </div>
              <div>
                <div className="font-serif text-lg font-bold text-neutral-900">Hilmi Assidqi</div>
                <div className="text-xs uppercase tracking-wider text-neutral-500 text-[11px]">People Operations & TA</div>
              </div>
            </div>

            <p className="font-serif italic text-sm text-neutral-700 leading-relaxed border-t border-neutral-200 pt-4">
              "Pendekatan rekrutmen berbasis objektivitas data psikometri dengan empati komunikasi manusiawi."
            </p>

            <div className="pt-1 flex flex-col gap-2 text-xs text-neutral-600">
              <button
                type="button"
                onClick={copyEmail}
                className="text-left hover:text-neutral-900 transition-colors inline-flex items-center gap-2 font-mono group"
              >
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-neutral-900 animate-fade-in" />
                ) : (
                  <Mail className="w-3.5 h-3.5 text-neutral-700 group-hover:text-neutral-900 transition-colors" />
                )}
                <span className={copiedEmail ? 'text-neutral-900 font-semibold' : ''}>
                  {copiedEmail ? 'Email tersalin!' : email}
                </span>
              </button>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-neutral-900 transition-colors inline-flex items-center gap-2 group"
              >
                <ExternalLink className="w-3.5 h-3.5 text-neutral-700 group-hover:text-neutral-900 transition-colors" />
                <span>Profil LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CV MANAGEMENT & STATUS CARD (Real CV Upload & Download Hub)
      ========================================================================= */}
      <section className="bg-white rounded-xl p-6 sm:p-8 border border-neutral-200 shadow-2xs card-floating space-y-4 animate-fade-in-up animation-delay-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-neutral-800" />
              <span>Berkas Resmi Curriculum Vitae (CV)</span>
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5 font-light">
              Kelola dokumen asli Anda agar siap diunduh langsung oleh peninjau profil
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenCvModal}
            className="text-xs uppercase tracking-wider font-semibold text-neutral-700 hover:text-neutral-950 inline-flex items-center gap-1 group transition-colors"
          >
            <span>Buka Pratinjau & Pengelola CV</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-150" />
          </button>
        </div>

        {uploadError && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{uploadError}</span>
          </div>
        )}

        {cv ? (
          /* State 1: Real CV is uploaded */
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 transition-colors duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-slate-900 text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                    Berkas Asli Aktif
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Diperbarui: {cv.updatedAt}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1 break-all">
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
                className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-xs font-semibold transition-all shadow-xs inline-flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Berkas CV</span>
              </button>
              <button
                type="button"
                onClick={onOpenCvModal}
                className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 active:scale-[0.98] text-xs font-medium transition-all inline-flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-slate-600" />
                <span>Pratinjau Dokumen</span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 active:scale-[0.98] text-xs font-medium transition-all inline-flex items-center gap-1.5"
                title="Ganti dengan berkas CV baru"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
                <span>Ganti Berkas</span>
              </button>
            </div>
          </div>
        ) : (
          /* State 2: Default Official CV Ready Card + Optional Upload */
          <div className="space-y-4">
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50/90 border border-slate-200 hover:border-slate-300 transition-colors duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-lg bg-slate-900 text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                      Profil CV Resmi Aktif
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      Hilmi Assidqi, S.Psi · Siap Ditinjau
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                    Curriculum Vitae — Recruitment & People Operations Specialist
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Dokumen digital resmi bebas blokir · Tersedia format Tampilan Langsung, Cetak PDF, dan Teks ATS
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <button
                  type="button"
                  onClick={onOpenCvModal}
                  className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-xs font-semibold transition-all shadow-xs inline-flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Lihat Dokumen CV</span>
                </button>
                <button
                  type="button"
                  onClick={() => triggerCvDownload(null)}
                  className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 active:scale-[0.98] text-xs font-medium transition-all inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span>Unduh Dokumen</span>
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 active:scale-[0.98] text-xs font-medium transition-all inline-flex items-center gap-1.5"
                  title="Unggah berkas CV asli fisik (PDF/DOCX) jika Anda memiliki berkas rancangan sendiri"
                >
                  <Upload className="w-3.5 h-3.5 text-slate-500" />
                  <span>Unggah Berkas PDF</span>
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
              className={`p-4 sm:p-5 rounded-xl border border-dashed transition-all duration-200 text-center cursor-pointer group flex flex-col sm:flex-row items-center justify-between gap-3 ${
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
                    Punya berkas PDF/Word sendiri?
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Tarik berkas ke sini atau klik untuk mengunggah (Maks. 20 MB).
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

      {/* =========================================================================
          KEY STATS: 4 Clean Editorial Metric Tiles
      ========================================================================= */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-fade-in-up animation-delay-150">
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-2xs card-floating group">
          <div className="flex items-baseline justify-between mb-2">
            <span className="font-serif text-3xl sm:text-4xl font-semibold text-neutral-950 tracking-tight tabular-nums">
              50%
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500">
              Efisiensi
            </span>
          </div>
          <div className="text-xs uppercase tracking-wider font-semibold text-neutral-900">Skoring Manual Terpangkas</div>
          <p className="text-xs text-neutral-500 mt-1 leading-relaxed font-light">
            Dari rekapitulasi kertas menjadi kalkulasi instan terkomputasi.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-2xs card-floating group">
          <div className="flex items-baseline justify-between mb-2">
            <span className="font-serif text-3xl sm:text-4xl font-semibold text-neutral-950 tracking-tight tabular-nums">
              &lt; 24 Jam
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500">SLA Komunikasi</span>
          </div>
          <div className="text-xs uppercase tracking-wider font-semibold text-neutral-900">Respons & Penapisan</div>
          <p className="text-xs text-neutral-500 mt-1 leading-relaxed font-light">
            Penyaringan berkas pelamar teliti sesuai kualifikasi dengan komunikasi responsif.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-2xs card-floating group flex flex-col justify-between">
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="font-serif text-3xl sm:text-4xl font-semibold text-neutral-950 tracking-tight tabular-nums">
                24
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-900 border-b border-neutral-900">
                Live Vercel
              </span>
            </div>
            <div className="text-xs uppercase tracking-wider font-semibold text-neutral-900">Instrumen Asesmen MBTI</div>
            <p className="text-xs text-neutral-500 mt-1 leading-relaxed font-light">
              Soal kontekstual berbasis situasi kerja manufaktur nyata.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px]">
            <a
              href="https://projectmbti2.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-neutral-900 hover:underline inline-flex items-center gap-1"
            >
              <span>projectmbti2.vercel.app</span>
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>
            <button
              type="button"
              onClick={onOpenMbtiModal}
              className="text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Simulator &rarr;
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-2xs card-floating group">
          <div className="flex items-baseline justify-between mb-2">
            <span className="font-serif text-3xl sm:text-4xl font-semibold text-neutral-950 tracking-tight tabular-nums">
              100%
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500">
              Kepatuhan
            </span>
          </div>
          <div className="text-xs uppercase tracking-wider font-semibold text-neutral-900">Onboarding Hari Pertama</div>
          <p className="text-xs text-neutral-500 mt-1 leading-relaxed font-light">
            Kontrak PKWT tuntas, pendaftaran BPJS, & workstation siap.
          </p>
        </div>
      </section>

      {/* =========================================================================
          SECTION TILES: Simple Overview of Other Pages
      {/* =========================================================================
          SECTION TILES: Classical Monochrome Editorial Modules
      ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-neutral-200 pb-3 animate-fade-in-up animation-delay-200 gap-1">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-neutral-950 tracking-tight">
            Kurasi Modul & Instrumen Rekrutmen
          </h2>
          <span className="text-xs uppercase tracking-wider text-neutral-500 font-light">
            Eksplorasi portofolio terstruktur
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Alur Kerja */}
          <div
            onClick={() => onNavigate('alur-kerja')}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate('alur-kerja')}
            tabIndex={0}
            role="button"
            className="p-8 rounded-xl bg-white border border-neutral-200 shadow-2xs card-floating cursor-pointer group flex flex-col justify-between active:scale-[0.99] animate-fade-in-up animation-delay-200"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">01 / PIPELINE</span>
                <GitBranch className="w-4 h-4 text-neutral-600 group-hover:text-neutral-950 transition-colors" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-neutral-950 mt-4 group-hover:text-neutral-900 transition-colors">
                Alur Kerja Rekrutmen Terstruktur
              </h3>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed font-light">
                Panduan operasional 5 tahapan rekrutmen di PT Dian Pandu Pratama: <em>Screening Berkas</em>, <em>Wawancara HR</em>, <em>Asesmen MBTI</em>, <em>Wawancara User</em>, dan <em>Onboarding Karyawan</em>.
              </p>
            </div>
            <div className="mt-8 pt-3 border-t border-neutral-100 text-xs uppercase tracking-wider font-semibold text-neutral-900 inline-flex items-center gap-1.5">
              <span>Buka Alur Kerja</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:translate-x-1.5 transition-transform duration-150" />
            </div>
          </div>

          {/* Card 2: Proyek & Alat Bantu */}
          <div
            onClick={() => onNavigate('proyek')}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate('proyek')}
            tabIndex={0}
            role="button"
            className="p-8 rounded-xl bg-white border border-neutral-200 shadow-2xs card-floating cursor-pointer group flex flex-col justify-between active:scale-[0.99] animate-fade-in-up animation-delay-250"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">02 / INSTRUMEN</span>
                <Layers className="w-4 h-4 text-neutral-600 group-hover:text-neutral-950 transition-colors" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-neutral-950 mt-4 group-hover:text-neutral-900 transition-colors">
                Proyek & Instrumen Kerja HR
              </h3>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed font-light">
                Aplikasi Web Asesmen Kepribadian MBTI PT DPP (live di <em>projectmbti2.vercel.app</em>), Dashboard ATS pelamar, serta 2 Formulir Penilaian Wawancara Terstandar (User & HR) berbasis metode STAR.
              </p>
            </div>
            <div className="mt-8 pt-3 border-t border-neutral-100 text-xs uppercase tracking-wider font-semibold text-neutral-900 inline-flex items-center gap-1.5">
              <span>Buka Proyek & Instrumen</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:translate-x-1.5 transition-transform duration-150" />
            </div>
          </div>

          {/* Card 3: Inisiatif FGD */}
          <div
            onClick={() => onNavigate('fgd')}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate('fgd')}
            tabIndex={0}
            role="button"
            className="p-8 rounded-xl bg-white border border-neutral-200 shadow-2xs card-floating cursor-pointer group flex flex-col justify-between active:scale-[0.99] animate-fade-in-up animation-delay-300"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">03 / METODOLOGI</span>
                <Users className="w-4 h-4 text-neutral-600 group-hover:text-neutral-950 transition-colors" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-neutral-950 mt-4 group-hover:text-neutral-900 transition-colors">
                Inisiatif Focus Group Discussion (FGD)
              </h3>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed font-light">
                Perbandingan metodologis antara wawancara 1-on-1 metode STAR dengan dinamika kelompok FGD, didukung landasan riset skripsi psikologi tentang mitigasi <em>social loafing</em>.
              </p>
            </div>
            <div className="mt-8 pt-3 border-t border-neutral-100 text-xs uppercase tracking-wider font-semibold text-neutral-900 inline-flex items-center gap-1.5">
              <span>Buka FGD & Metodologi</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:translate-x-1.5 transition-transform duration-150" />
            </div>
          </div>

          {/* Card 4: Profil & Rekam Jejak */}
          <div
            onClick={() => onNavigate('profil')}
            onKeyDown={(e) => e.key === 'Enter' && onNavigate('profil')}
            tabIndex={0}
            role="button"
            className="p-8 rounded-xl bg-white border border-neutral-200 shadow-2xs card-floating cursor-pointer group flex flex-col justify-between active:scale-[0.99] animate-fade-in-up animation-delay-350"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">04 / KREDENSIAL</span>
                <Award className="w-4 h-4 text-neutral-600 group-hover:text-neutral-950 transition-colors" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-neutral-950 mt-4 group-hover:text-neutral-900 transition-colors">
                Rekam Jejak, Keahlian & Sertifikasi
              </h3>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed font-light">
                Kronologi pengalaman profesional korporat, kepemimpinan organisasi, matriks kapabilitas People Operations & HR-Tech, serta sertifikasi resmi terverifikasi.
              </p>
            </div>
            <div className="mt-8 pt-3 border-t border-neutral-100 text-xs uppercase tracking-wider font-semibold text-neutral-900 inline-flex items-center gap-1.5">
              <span>Buka Profil & Keahlian</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:translate-x-1.5 transition-transform duration-150" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HIRING INVITATION CTA: Refined Monochrome
      ========================================================================= */}
      <section className="bg-neutral-950 text-white rounded-xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xs card-floating animate-fade-in-up animation-delay-400">
        <div className="space-y-1.5">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
            Mencari Staf Rekrutmen atau Talent Acquisition Specialist?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl font-light">
            Saya siap bergabung dan membawa efisiensi operasional seleksi, wawancara kompetensi STAR, simulasi FGD, serta digitalisasi HR ke tim perusahaan Anda.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenContact}
          className="px-6 py-3 rounded bg-white hover:bg-neutral-100 active:scale-[0.98] text-neutral-950 font-medium text-xs uppercase tracking-wider transition-all shrink-0 shadow-2xs"
        >
          Undang Wawancara Kerja
        </button>
      </section>
    </div>
  );
};
