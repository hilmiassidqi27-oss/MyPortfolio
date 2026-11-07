import React, { useState } from 'react';
import {
  ArrowLeft,
  ExternalLink,
  Sliders,
  Layers,
  CheckCircle2,
  FileCheck,
  FileSpreadsheet,
  Award,
  Sparkles,
  ClipboardList,
  Eye,
  Check,
  Lock,
  ShieldCheck,
  Image as ImageIcon,
  Globe,
  Copy
} from 'lucide-react';
import { ASSESSMENT_FORMS_DATA } from '../data/assessmentFormsData';

interface ProyekPageProps {
  onBack: () => void;
  onOpenMbtiModal: () => void;
  onOpenPipelineModal: () => void;
  onOpenContact: () => void;
  onOpenAssessmentForm: (formId: 'user-interview' | 'hr-interview') => void;
}

export const ProyekPage: React.FC<ProyekPageProps> = ({
  onBack,
  onOpenMbtiModal,
  onOpenPipelineModal,
  onOpenContact,
  onOpenAssessmentForm
}) => {
  const [activeTab, setActiveTab] = useState<'digital' | 'documents'>('digital');
  const [copiedMbtiUrl, setCopiedMbtiUrl] = useState(false);

  const handleCopyMbtiUrl = () => {
    navigator.clipboard.writeText('https://projectmbti2.vercel.app/');
    setCopiedMbtiUrl(true);
    setTimeout(() => setCopiedMbtiUrl(false), 2500);
  };

  const userForm = ASSESSMENT_FORMS_DATA.find((f) => f.id === 'user-interview');
  const hrForm = ASSESSMENT_FORMS_DATA.find((f) => f.id === 'hr-interview');

  return (
    <div className="space-y-10 py-4">
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
        <span className="text-xs font-mono text-neutral-400">02 / PROYEK & INSTRUMEN</span>
      </div>

      {/* Title Header */}
      <div className="max-w-3xl space-y-3 animate-fade-in-up animation-delay-75">
        <span className="text-xs text-neutral-500 font-medium uppercase tracking-widest">
          Portofolio Karya & Standarisasi Rekrutmen
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-neutral-950 tracking-tight leading-tight">
          Alat Bantu Digital & Dokumen Instrumen Seleksi
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
          Kombinasi antara pengembangan perangkat lunak mandiri untuk mengotomasi proses rekrutmen dan standarisasi instrumen evaluasi wawancara resmi yang saya terapkan di PT Dian Pandu Pratama.
        </p>
      </div>

      {/* Main Sub-Tab Switcher: Classical Segmented Control */}
      <div
        role="tablist"
        aria-label="Pilihan Kategori Portofolio"
        className="flex p-1 bg-neutral-200/70 rounded-lg max-w-md text-xs font-medium"
      >
        <button
          type="button"
          role="tab"
          id="tab-digital"
          aria-selected={activeTab === 'digital'}
          aria-controls="panel-digital"
          onClick={() => setActiveTab('digital')}
          className={`flex-1 py-2 px-4 rounded transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-[11px] ${
            activeTab === 'digital'
              ? 'bg-white text-neutral-950 shadow-2xs font-semibold'
              : 'text-neutral-600 hover:text-neutral-950'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Aplikasi Digital</span>
        </button>
        <button
          type="button"
          role="tab"
          id="tab-documents"
          aria-selected={activeTab === 'documents'}
          aria-controls="panel-documents"
          onClick={() => setActiveTab('documents')}
          className={`flex-1 py-2 px-4 rounded transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-[11px] ${
            activeTab === 'documents'
              ? 'bg-white text-neutral-950 shadow-2xs font-semibold'
              : 'text-neutral-600 hover:text-neutral-950'
          }`}
        >
          <ClipboardList className="w-3.5 h-3.5" />
          <span>Dokumen Kerja (2 Form)</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: DIGITAL APPLICATIONS & TOOLS
      ========================================================================= */}
      {activeTab === 'digital' && (
        <div id="panel-digital" role="tabpanel" aria-labelledby="tab-digital" className="space-y-10 animate-fade-in">
          {/* Project 1: Asesmen MBTI */}
          <section className="bg-white rounded-xl border border-neutral-200 p-8 sm:p-10 shadow-2xs card-floating space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-neutral-900 uppercase tracking-widest text-[11px]">01 / APLIKASI UNGGULAN</span>
                <span className="text-xs text-neutral-300">/</span>
                <span className="text-xs text-neutral-500">PT Dian Pandu Pratama</span>
                <span className="text-[11px] font-mono text-neutral-900 border-b border-neutral-900">
                  Live Vercel
                </span>
              </div>
              <a
                href="https://projectmbti2.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-900 hover:underline transition-colors"
              >
                <span>projectmbti2.vercel.app</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-snug">
                  Asesmen Kepribadian MBTI Berbasis 24 Skenario Industri
                </h2>
                <p className="text-sm text-neutral-600 leading-relaxed font-light">
                  Sebelumnya, kandidat mengisi lembar soal kertas yang menuntut rekruter menghitung poin jawaban satu per satu secara manual. Saya mengembangkan aplikasi web responsif ini sehingga peserta dapat mengisi tes dari smartphone atau laptop, dan tim HR langsung menerima hasil 4 dimensi kepribadian secara instan.
                </p>

                {/* Direct Live App Access Card */}
                <div className="p-5 rounded-lg bg-[#FBFBFA] border border-neutral-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs uppercase tracking-wider font-semibold text-neutral-900 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-neutral-700" />
                      <span>Tautan Resmi Aplikasi Publik</span>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-900 font-semibold bg-neutral-200/60 px-2 py-0.5 rounded">
                      projectmbti2.vercel.app
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Aplikasi live siap diuji oleh tim talent acquisition / hiring manager dengan 24 skenario operasional terstandar dan arsitektur responsif multi-device.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <a
                      href="https://projectmbti2.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-xs font-semibold transition-all shadow-xs"
                    >
                      <span>Buka Aplikasi di projectmbti2.vercel.app</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyMbtiUrl}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 active:scale-[0.98] text-slate-700 text-xs font-medium transition-all shadow-2xs"
                    >
                      {copiedMbtiUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                      <span>{copiedMbtiUrl ? 'Tautan Tersalin!' : 'Salin Link'}</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2 pt-1 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                    <span><strong>Formulir Skenario Kontekstual:</strong> Menggunakan 24 kasus situasi operasional nyata, bukan pertanyaan abstrak yang mudah dimanipulasi.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                    <span><strong>Dashboard Admin Terpusat:</strong> Memantau nama pelamar, waktu pengerjaan, skor per dimensi, dan interpretasi kepribadian.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                    <span><strong>Ekspor Laporan Cepat:</strong> Data dapat diunduh ke Excel, CSV, atau dicetak ke PDF untuk evaluasi user manager.</span>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-500 font-mono">
                  Tech Stack: React · TypeScript · Tailwind CSS · Firebase Datastore · Vercel
                </div>
              </div>

              {/* Candidate Workspace Preview Card with Real App Screenshot */}
              <div className="lg:col-span-5 space-y-4">
                {/* Real Live App Screenshot Frame */}
                <div
                  tabIndex={0}
                  role="button"
                  onClick={onOpenMbtiModal}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenMbtiModal()}
                  className="relative rounded-xl border border-neutral-200 overflow-hidden bg-neutral-100 shadow-2xs hover:border-neutral-400 transition-colors cursor-pointer group/preview"
                >
                  <img
                    src="/assets/aistudio/image_001793f7.png"
                    alt="Antarmuka Resmi Asesmen Kepribadian MBTI PT Dian Pandu Pratama"
                    className="w-full h-auto object-cover object-top group-hover/preview:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-neutral-950/0 group-hover/preview:bg-neutral-950/20 transition-colors flex items-center justify-center opacity-0 group-hover/preview:opacity-100">
                    <span className="px-3.5 py-1.5 rounded bg-white text-neutral-950 text-xs font-semibold uppercase tracking-wider shadow-md flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Buka Pratinjau & Simulator</span>
                    </span>
                  </div>
                  <div className="p-2.5 bg-neutral-950 text-white flex items-center justify-between text-[11px] font-mono">
                    <span className="truncate">projectmbti2.vercel.app</span>
                    <span className="text-neutral-400 text-[10px] uppercase tracking-wider">Antarmuka Asli</span>
                  </div>
                </div>

                {/* Candidate Dimension Result Box */}
                <div className="bg-[#FBFBFA] rounded-xl p-4 border border-neutral-200 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200 text-xs">
                    <span className="font-semibold text-neutral-900">Hasil Skoring Terkalibrasi #204</span>
                    <span className="font-mono font-bold text-neutral-900">MBTI: ENFJ</span>
                  </div>

                  <div className="space-y-2.5">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1 font-mono">
                        <span className="font-medium text-neutral-900">Ekstrovert (E)</span>
                        <span className="text-neutral-500">78% | Introvert (I) 22%</span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-neutral-900 h-1.5 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1 font-mono">
                        <span className="font-medium text-neutral-900">Intuition (N)</span>
                        <span className="text-neutral-500">65% | Sensing (S) 35%</span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-neutral-700 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1 font-mono">
                        <span className="font-medium text-neutral-900">Feeling (F)</span>
                        <span className="text-neutral-500">82% | Thinking (T) 18%</span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-neutral-900 h-1.5 rounded-full" style={{ width: '82%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1 font-mono">
                        <span className="font-medium text-neutral-900">Judging (J)</span>
                        <span className="text-neutral-500">74% | Perceiving (P) 26%</span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-neutral-700 h-1.5 rounded-full" style={{ width: '74%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <a
                      href="https://projectmbti2.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 active:scale-[0.98] text-white text-xs font-semibold transition-all shadow-xs inline-flex items-center justify-center gap-1.5"
                    >
                      <span>Web Live</span>
                      <ExternalLink className="w-3.5 h-3.5 text-neutral-300" />
                    </a>
                    <button
                      type="button"
                      onClick={onOpenMbtiModal}
                      className="py-2 px-3 rounded-lg bg-white border border-neutral-300 hover:bg-neutral-100 active:scale-[0.98] text-neutral-800 text-xs font-semibold transition-all shadow-2xs inline-flex items-center justify-center gap-1.5"
                    >
                      <Sliders className="w-3.5 h-3.5 text-neutral-600" />
                      <span>Simulator</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Project 2: Dashboard E-Recruitment */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs card-floating space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-semibold text-slate-900">Sistem Pelacak Kandidat</span>
                <span className="text-xs text-slate-400 mx-2">/</span>
                <span className="text-xs text-slate-600">Otomasi Rekrutmen Harian</span>
              </div>
              <span className="text-xs font-mono text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                Operasional Aktif
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Dashboard E-Recruitment & Applicant Tracking System
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Menyederhanakan pengelolaan kandidat yang masuk dari berbagai sumber (LinkedIn, job portal, bursa kerja, dan referensi internal) ke dalam satu alur terpadu. Memungkinkan tim rekrutmen melacak status kandidat di setiap tahapan, mencatat catatan asesor wawancara, dan mengotomasi pemberitahuan seleksi.
                </p>

                <div className="space-y-2 pt-1 text-xs text-slate-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                    <span><strong>Pemantauan Pelamar Terpadu:</strong> Melihat berapa kandidat yang berada di tahap screening, interview, asesmen, atau onboarding.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                    <span><strong>Manajemen Catatan Asesor:</strong> Hasil observasi wawancara STAR dan FGD tersimpan rapi pada profil masing-masing kandidat.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                    <span><strong>Pemberitahuan Transparan:</strong> Menjamin transparansi status kandidat sehingga meminimalkan pertanyaan susulan.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
                <div className="text-xs font-semibold text-slate-900 pb-2 border-b border-slate-200">
                  Ringkasan Fitur Dashboard
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-200/80">
                    <span className="text-slate-600">Integrasi Multi-Channel</span>
                    <span className="font-semibold text-slate-900">Aktif</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/80">
                    <span className="text-slate-600">Manajemen Status Seleksi</span>
                    <span className="font-semibold text-slate-900">Drag & Update</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/80">
                    <span className="text-slate-600">Sinkronisasi Jadwal Interview</span>
                    <span className="font-semibold text-slate-900">Terintegrasi</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenPipelineModal}
                  className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-xs font-semibold transition-all shadow-xs inline-flex items-center justify-center gap-2"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Buka Demo Interaktif Dashboard Pelamar</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* =========================================================================
          TAB 2: DOKUMEN & INSTRUMEN KERJA HR (STANDARISASI PENILAIAN PT DPP)
      ========================================================================= */}
      {activeTab === 'documents' && (
        <div id="panel-documents" role="tabpanel" aria-labelledby="tab-documents" className="space-y-8 animate-fade-in">
          {/* Section Introduction */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <ClipboardList className="w-4 h-4 text-slate-900" />
                <span>Standarisasi Instrumen Rekrutmen Operasional · PT Dian Pandu Pratama</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                <Lock className="w-3 h-3" />
                <span>Dokumen Konfidensial Terproteksi</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Untuk mengeliminasi bias penilaian subjektif dalam seleksi kerja, saya merumuskan dan menerapkan dua formulir evaluasi wawancara terstandar: instrumen khusus <strong>User Manager</strong> (fokus kompetensi teknis) dan instrumen <strong>HR Recruiter</strong> (fokus perilaku berbasis metode STAR). Keduanya dilengkapi rubrik skoring berskala Likert 1-5 dan ambang batas rekomendasi yang terukur.
            </p>
            <div className="pt-2 flex items-start gap-2 text-xs text-amber-800 bg-amber-50/60 p-3 rounded-xl border border-amber-200/80">
              <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                <strong>Catatan Kerahasiaan Perusahaan:</strong> Sesuai kode etik kepatuhan PT Dian Pandu Pratama, dokumen asli bersifat tertutup/confidential dan tidak disebarluaskan tautan eksternalnya. Portofolio ini menyediakan <strong>foto contoh lembar kerja resmi tersanitasi</strong> dan <strong>simulator skoring interaktif</strong> untuk demonstrasi kompetensi.
              </span>
            </div>
          </div>

          {/* Two Main Instrument Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Form 1: Form Penilaian Interview User */}
            {userForm && (
              <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs card-floating flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <span className="text-[11px] font-mono font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {userForm.code}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500">
                      <Lock className="w-3 h-3 text-slate-400" />
                      <span>{userForm.organization}</span>
                    </span>
                  </div>

                  {/* Real Screenshot Preview Frame */}
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={() => onOpenAssessmentForm('user-interview')}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenAssessmentForm('user-interview')}
                    className="relative aspect-[16/10] bg-neutral-100 rounded-xl border border-slate-200 overflow-hidden cursor-pointer group/thumb shadow-2xs hover:border-slate-400 transition-colors"
                  >
                    <img
                      src="/assets/aistudio/image_bcdba23c.png"
                      alt="Formulir Penilaian Interview User & Teknis"
                      className="w-full h-full object-cover object-top group-hover/thumb:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-950/0 group-hover/thumb:bg-slate-950/20 transition-colors flex items-center justify-center opacity-0 group-hover/thumb:opacity-100">
                      <span className="px-3 py-1.5 rounded bg-white text-slate-900 text-[11px] font-semibold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Lihat Lembar Asli & Skoring</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Asesor: {userForm.assessorRole}
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      {userForm.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {userForm.description}
                    </p>
                  </div>

                  {/* Key Rubric Highlights */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs">
                    <div className="font-semibold text-slate-900">5 Dimensi Asesmen Teknis:</div>
                    <div className="space-y-1.5 text-slate-700">
                      {userForm.criteria.map((c) => (
                        <div key={c.id} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                          <span><strong>{c.name}:</strong> {c.description.slice(0, 75)}...</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scoring Formula */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1">
                    <span className="text-slate-500">Skor Maksimal: <strong className="text-slate-900">25 Poin</strong></span>
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Lolos: ≥ 20 Poin
                    </span>
                  </div>
                </div>

                {/* Actions: View Photo Sample & Open Interactive Simulator */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => onOpenAssessmentForm('user-interview')}
                    className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-xs font-semibold transition-all shadow-xs inline-flex items-center justify-center gap-2"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Lihat Foto Contoh & Template Terproteksi</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenAssessmentForm('user-interview')}
                    className="w-full py-2 px-3 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-medium transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <Sliders className="w-3.5 h-3.5 text-slate-500" />
                    <span>Uji Coba Simulator Skoring Likert 1-5</span>
                  </button>
                </div>
              </article>
            )}

            {/* Form 2: Form Penilaian Interview HR */}
            {hrForm && (
              <article className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs card-floating flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <span className="text-[11px] font-mono font-semibold text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      {hrForm.code}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500">
                      <Lock className="w-3 h-3 text-slate-400" />
                      <span>{hrForm.organization}</span>
                    </span>
                  </div>

                  {/* Real Screenshot Preview Frame */}
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={() => onOpenAssessmentForm('hr-interview')}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpenAssessmentForm('hr-interview')}
                    className="relative aspect-[16/10] bg-neutral-100 rounded-xl border border-slate-200 overflow-hidden cursor-pointer group/thumb shadow-2xs hover:border-slate-400 transition-colors"
                  >
                    <img
                      src="/assets/aistudio/image_03cc9a2c.png"
                      alt="Form Penilaian Wawancara HR (Metode STAR)"
                      className="w-full h-full object-cover object-top group-hover/thumb:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-950/0 group-hover/thumb:bg-slate-950/20 transition-colors flex items-center justify-center opacity-0 group-hover/thumb:opacity-100">
                      <span className="px-3 py-1.5 rounded bg-white text-slate-900 text-[11px] font-semibold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Lihat Lembar Asli & Skoring</span>
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Asesor: {hrForm.assessorRole}
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      {hrForm.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {hrForm.description}
                    </p>
                  </div>

                  {/* Key Rubric Highlights */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs">
                    <div className="font-semibold text-slate-900">6 Dimensi Evaluasi Perilaku & STAR:</div>
                    <div className="space-y-1.5 text-slate-700">
                      {hrForm.criteria.map((c) => (
                        <div key={c.id} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                          <span><strong>{c.name}:</strong> {c.description.slice(0, 75)}...</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scoring Formula */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1">
                    <span className="text-slate-500">Skor Maksimal: <strong className="text-slate-900">30 Poin</strong></span>
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Lanjut User: ≥ 24 Poin
                    </span>
                  </div>
                </div>

                {/* Actions: View Photo Sample & Open Interactive Simulator */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => onOpenAssessmentForm('hr-interview')}
                    className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-xs font-semibold transition-all shadow-xs inline-flex items-center justify-center gap-2"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Lihat Foto Contoh & Template Terproteksi</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenAssessmentForm('hr-interview')}
                    className="w-full py-2 px-3 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-medium transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <Sliders className="w-3.5 h-3.5 text-slate-500" />
                    <span>Uji Coba Simulator Skoring Likert 1-5</span>
                  </button>
                </div>
              </article>
            )}
          </div>

          {/* Process Synergy Section */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Sinergi Alur Evaluasi: Wawancara HR vs Wawancara User
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  1. Peran Wawancara HR (Tahap Awal)
                </h4>
                <p>
                  Memastikan kandidat memiliki integritas kepribadian, stabilitas emosi, komitmen jangka panjang, serta motivasi kerja yang tulus. Menjadi penyaring awal untuk memastikan waktu User Manager tidak terbuang oleh kandidat yang tidak cocok secara kultural.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  2. Peran Wawancara User (Tahap Lanjutan)
                </h4>
                <p>
                  Mengevaluasi penguasaan teknis operasional, logika troubleshooting di lapangan kerja, serta kecocokan kandidat terhadap ritme dan target kerja divisi. User menggunakan lembar penilaian teknis terstruktur agar penilaian tidak hanya bertumpu pada kesan instan.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation CTA */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200 animate-fade-in-up animation-delay-200">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors group"
        >
          <span className="group-hover:-translate-x-1 inline-block transition-transform duration-150">←</span> Kembali ke Dashboard
        </button>
        <button
          type="button"
          onClick={onOpenContact}
          className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-xs font-medium transition-all shadow-xs"
        >
          Undang Wawancara Kerja
        </button>
      </div>
    </div>
  );
};
