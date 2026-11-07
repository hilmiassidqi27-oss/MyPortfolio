import React, { useState } from 'react';
import { PipelineStageId } from '../types';
import { ArrowLeft, ExternalLink, Image as ImageIcon, Lock, ClipboardList, CheckCircle2, FileText, UserCheck, Users, Brain, ShieldCheck } from 'lucide-react';

interface AlurKerjaPageProps {
  onBack: () => void;
  onOpenContact: () => void;
  onOpenAssessmentForm?: (formId: 'user-interview' | 'hr-interview') => void;
}

export const AlurKerjaPage: React.FC<AlurKerjaPageProps> = ({
  onBack,
  onOpenContact,
  onOpenAssessmentForm
}) => {
  const [activeStage, setActiveStage] = useState<PipelineStageId>(0);

  const stageTabs = [
    { id: 0 as PipelineStageId, number: '01', title: 'Screening Berkas' },
    { id: 1 as PipelineStageId, number: '02', title: 'Wawancara HR' },
    { id: 2 as PipelineStageId, number: '03', title: 'Asesmen MBTI' },
    { id: 3 as PipelineStageId, number: '04', title: 'Wawancara User' },
    { id: 4 as PipelineStageId, number: '05', title: 'Offering & Onboarding' }
  ];

  return (
    <div className="space-y-10 py-4">
      {/* Page Navigation Breadcrumb */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4 animate-fade-in-up">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-neutral-600 hover:text-neutral-950 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-150" />
          <span>Kembali ke Beranda</span>
        </button>
        <span className="text-xs font-mono text-neutral-400">01 / ALUR KERJA REKRUTMEN</span>
      </div>

      {/* Page Title Header */}
      <div className="max-w-3xl space-y-3 animate-fade-in-up animation-delay-75">
        <span className="text-xs text-neutral-500 font-medium uppercase tracking-widest">
          Standar Operasional Prosedur (SOP) Rekrutmen · PT Dian Pandu Pratama
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-neutral-950 tracking-tight leading-tight">
          Tahapan Seleksi dari Berkas Masuk Sampai Hari Pertama Kerja
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
          Rangkaian proses seleksi terstandarisasi yang dijalankan secara obyektif, terukur, dan empatik untuk menemukan kandidat yang kompeten secara teknis serta selaras dengan budaya perusahaan.
        </p>
      </div>

      {/* Main Workstation Container */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-2xs card-floating overflow-hidden animate-fade-in-up animation-delay-100">
        {/* Interactive Segmented Tab Switcher */}
        <div
          role="tablist"
          aria-label="Tahapan Seleksi Rekrutmen"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-b border-neutral-200 bg-[#FBFBFA]"
        >
          {stageTabs.map(stg => {
            const isActive = activeStage === stg.id;
            return (
              <button
                key={stg.id}
                role="tab"
                id={`stage-tab-${stg.id}`}
                aria-controls={`stage-panel-${stg.id}`}
                aria-selected={isActive}
                onClick={() => setActiveStage(stg.id)}
                className={`p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900 ${
                  isActive
                    ? 'bg-white border-b-2 border-neutral-950 text-neutral-950 shadow-2xs'
                    : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/60'
                }`}
              >
                <div className="text-[11px] font-mono text-neutral-400 font-medium mb-1">
                  Tahap {stg.number}
                </div>
                <div className={`text-xs sm:text-sm font-semibold truncate ${isActive ? 'text-neutral-950' : 'text-neutral-600'}`}>
                  {stg.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Stage Content */}
        <div className="p-6 sm:p-8">
          {/* Stage 0: Screening Berkas */}
          {activeStage === 0 && (
            <div role="tabpanel" id="stage-panel-0" aria-labelledby="stage-tab-0" className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <div className="text-xs text-neutral-500 font-medium">
                    <span className="font-semibold text-neutral-950">Tahap 01:</span> Penapisan Kualifikasi Berkas & Kelengkapan Administrasi
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 font-serif">
                    Screening Berkas & Komunikasi Terarah
                  </h2>
                  <p className="text-sm text-neutral-600 leading-relaxed font-light">
                    Menyaring berkas pelamar secara teliti berdasarkan spesifikasi jabatan, kesesuaian latar belakang pendidikan, portofolio kerja nyata, serta komitmen respons komunikasi kandidat yang tertib.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                      <div className="font-semibold text-sm text-neutral-950 mb-1">1. Validasi Kompetensi & Persyaratan Jabatan</div>
                      <p className="text-xs text-neutral-600 leading-relaxed font-light">
                        Memeriksa relevansi pengalaman praktis, portofolio kerja, keabsahan dokumen pendukung (ijazah/sertifikasi), serta rekam jejak stabilitas kerja kandidat.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                      <div className="font-semibold text-sm text-neutral-950 mb-1">2. Standarisasi Komunikasi & SLA Respons</div>
                      <p className="text-xs text-neutral-600 leading-relaxed font-light">
                        Menghubungi kandidat yang lolos penapisan berkas dalam waktu respons di bawah 24 jam via email korporat resmi dan WhatsApp koordinasi dengan instruksi jadwal yang transparan.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                      <div className="font-semibold text-sm text-neutral-950 mb-1">3. Pengarsipan Pipeline & Notifikasi Resmi</div>
                      <p className="text-xs text-neutral-600 leading-relaxed font-light">
                        Mendata pelamar ke sistem database kandidat secara rapi. Pelamar yang belum sesuai kualifikasi tetap diberikan konfirmasi status secara sopan demi menjaga reputasi perusahaan.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-neutral-50 rounded-xl p-6 border border-neutral-200 space-y-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono">
                    Standar Operasional Tahap 01
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between items-center py-2.5 px-3.5 bg-white rounded-lg border border-neutral-200">
                      <span className="text-neutral-600">Fokus Penapisan</span>
                      <span className="font-medium text-neutral-900">Kesesuaian Job Specs</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 px-3.5 bg-white rounded-lg border border-neutral-200">
                      <span className="text-neutral-600">Target SLA Komunikasi</span>
                      <span className="font-mono font-bold text-neutral-950">&lt; 24 Jam</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 px-3.5 bg-white rounded-lg border border-neutral-200">
                      <span className="text-neutral-600">Verifikasi Dokumen</span>
                      <span className="font-medium text-neutral-900">Ijazah, CV & Sertifikat</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 px-3.5 bg-white rounded-lg border border-neutral-200">
                      <span className="text-neutral-600">Metode Notifikasi</span>
                      <span className="font-mono text-neutral-900">Email & WA Korporat</span>
                    </div>
                  </div>

                  <div className="pt-2 text-xs text-neutral-500 border-t border-neutral-200 leading-relaxed font-light">
                    Proses penapisan mengutamakan ketelitian dan integritas data agar kandidat yang diteruskan ke tahap wawancara benar-benar memenuhi kualifikasi dasar posisi yang dibutuhkan.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stage 1: Wawancara HR */}
          {activeStage === 1 && (
            <div role="tabpanel" id="stage-panel-1" aria-labelledby="stage-tab-1" className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <div className="text-xs text-neutral-500 font-medium">
                    <span className="font-semibold text-neutral-950">Tahap 02:</span> Behavioral Interview & Evaluasi Keselarasan Budaya
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 font-serif">
                    Wawancara HR (Metode STAR & Standar Form DPP)
                  </h2>
                  <p className="text-sm text-neutral-600 leading-relaxed font-light">
                    Wawancara mendalam oleh tim HR menggunakan panduan terstruktur berbasis metode STAR (Situation, Task, Action, Result) untuk menggali kompetensi perilaku, stabilitas emosi, motivasi kerja, serta integritas kandidat.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                      <div className="font-semibold text-sm text-neutral-950 mb-1">1. Penggalian Perilaku Nyata (STAR Approach)</div>
                      <p className="text-xs text-neutral-600 leading-relaxed font-light">
                        Mengevaluasi tindakan konkrit kandidat dalam mengatasi tantangan kerja lampau, inisiatif pribadi, serta kemampuan bekerja sama di bawah tekanan.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                      <div className="font-semibold text-sm text-neutral-950 mb-1">2. Standarisasi Formulir Evaluasi HR DPP</div>
                      <p className="text-xs text-neutral-600 leading-relaxed font-light">
                        Mendokumentasikan hasil penilaian pada form terstandar PT Dian Pandu Pratama yang mencakup 6 dimensi utama perilaku dan kesiapan kerja.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                      <div className="font-semibold text-sm text-neutral-950 mb-1">3. Catatan Inisiatif: Simulasi Kasus & FGD (Opsi Batch)</div>
                      <p className="text-xs text-neutral-600 leading-relaxed font-light">
                        Untuk seleksi kelompok massal (misalnya program magang atau rekrutmen serentak), inisiatif simulasi kasus Focus Group Discussion (FGD) dapat difasilitasi guna mengamati dinamika tim dan interaksi sosial kandidat secara langsung.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-neutral-50 rounded-xl p-6 border border-neutral-200 space-y-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono">
                    Instrumen Terstandar Tahap 02
                  </div>

                  {/* Form HR Card */}
                  <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
                        DPP/HR/FRM-INT-HR/2026
                      </span>
                      <span className="text-xs text-neutral-500">Asesor HR</span>
                    </div>

                    {/* Thumbnail Preview */}
                    <div
                      onClick={() => onOpenAssessmentForm && onOpenAssessmentForm('hr-interview')}
                      className="relative aspect-[16/9] bg-neutral-100 rounded-lg border border-neutral-200 overflow-hidden cursor-pointer group/thumb mb-2.5 shadow-2xs"
                    >
                      <img
                        src="/assets/aistudio/image_03cc9a2c.png"
                        alt="Form Penilaian Wawancara HR"
                        className="w-full h-full object-cover object-top group-hover/thumb:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-neutral-950/0 group-hover/thumb:bg-neutral-950/20 transition-colors flex items-center justify-center opacity-0 group-hover/thumb:opacity-100">
                        <span className="px-2.5 py-1 rounded bg-white text-neutral-950 text-[10px] font-semibold uppercase tracking-wider shadow-xs">
                          Lihat Lembar Asli
                        </span>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-neutral-950">
                      Form Penilaian Wawancara HR
                    </h4>
                    <p className="text-xs text-neutral-600 leading-relaxed font-light">
                      SOP & standarisasi evaluasi kompetensi perilaku, motivasi, integritas, dan budaya kerja.
                    </p>

                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                      {onOpenAssessmentForm && (
                        <button
                          type="button"
                          onClick={() => onOpenAssessmentForm('hr-interview')}
                          className="py-1.5 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Buka Form & Skoring</span>
                        </button>
                      )}
                      <span className="inline-flex items-center gap-1 text-[10px] text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
                        <Lock className="w-2.5 h-2.5" />
                        <span>SOP Resmi</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stage 2: Asesmen MBTI */}
          {activeStage === 2 && (
            <div role="tabpanel" id="stage-panel-2" aria-labelledby="stage-tab-2" className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <div className="text-xs text-neutral-500 font-medium">
                    <span className="font-semibold text-neutral-950">Tahap 03:</span> Tes Psikologi & Pemetaan Preferensi Kepribadian
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 font-serif">
                    Asesmen Kepribadian MBTI Mandiri Berbasis Web
                  </h2>
                  <p className="text-sm text-neutral-600 leading-relaxed font-light">
                    Kandidat yang direkomendasikan pada wawancara HR mengikuti asesmen kepribadian digital melalui aplikasi web MBTI mandiri yang saya bangun khusus untuk PT Dian Pandu Pratama.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                      <div className="font-semibold text-sm text-neutral-950 mb-1">1. 24 Skenario Nyata Konteks Kerja</div>
                      <p className="text-xs text-neutral-600 leading-relaxed font-light">
                        Soal dirancang berbasis stimulus situasi nyata dunia industri dan kerja operasional, membantu mengukur kecenderungan respon kandidat secara alami.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                      <div className="font-semibold text-sm text-neutral-950 mb-1">2. 4 Polaritas Dimensi Kepribadian</div>
                      <p className="text-xs text-neutral-600 leading-relaxed font-light">
                        Memetakan preferensi kandidat dalam interaksi (E/I), pengolahan informasi (S/N), pengambilan keputusan (T/F), dan orientasi keteraturan kerja (J/P).
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                      <div className="font-semibold text-sm text-neutral-950 mb-1">3. Skoring Terkomputasi Instan & Beban Manual Terpangkas</div>
                      <p className="text-xs text-neutral-600 leading-relaxed font-light">
                        Hasil dikalkulasi secara otomatis saat submit, meniadakan proses koreksi kertas manual dan mempercepat penyusunan ringkasan profil kandidat untuk user manager.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-neutral-50 rounded-xl p-6 border border-neutral-200 space-y-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono">
                    Platform MBTI PT Dian Pandu Pratama
                  </div>

                  {/* MBTI Web App Preview Card */}
                  <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-2xs space-y-3">
                    <div className="relative aspect-[16/9] bg-neutral-100 rounded-lg border border-neutral-200 overflow-hidden shadow-2xs">
                      <img
                        src="/assets/aistudio/image_001793f7.png"
                        alt="Aplikasi MBTI PT Dian Pandu Pratama"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <h4 className="text-sm font-bold text-neutral-950">
                      Aplikasi Web Asesmen Kepribadian MBTI
                    </h4>
                    <p className="text-xs text-neutral-600 leading-relaxed font-light">
                      Platform asesmen digital mandiri yang dikembangkan dengan React, TypeScript, dan Firebase.
                    </p>

                    <div className="pt-2">
                      <a
                        href="https://projectmbti2.vercel.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-all shadow-xs inline-flex items-center justify-center gap-2"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span>Akses projectmbti2.vercel.app</span>
                        <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stage 3: Wawancara User */}
          {activeStage === 3 && (
            <div role="tabpanel" id="stage-panel-3" aria-labelledby="stage-tab-3" className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <div className="text-xs text-neutral-500 font-medium">
                    <span className="font-semibold text-neutral-950">Tahap 04:</span> Evaluasi Kemampuan Teknis & Keselarasan Unit Kerja
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 font-serif">
                    Wawancara User & Evaluasi Teknis Departemen
                  </h2>
                  <p className="text-sm text-neutral-600 leading-relaxed font-light">
                    Kandidat diwawancarai langsung oleh User Manager atau Kepala Departemen terkait didampingi HR untuk memvalidasi keahlian teknis operasional, penalaran pemecahan masalah, dan kesiapan ritme kerja spesifik.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                      <div className="font-semibold text-sm text-neutral-950 mb-1">1. Pengujian Keterampilan Teknis & Portofolio</div>
                      <p className="text-xs text-neutral-600 leading-relaxed font-light">
                        Mengeksplorasi penguasaan peralatan, tools kerja, standar operasional lapangan, serta pengujian studi kasus teknis sesuai bidang penempatan.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                      <div className="font-semibold text-sm text-neutral-950 mb-1">2. Formulir Penilaian Interview User & Teknis DPP</div>
                      <p className="text-xs text-neutral-600 leading-relaxed font-light">
                        User manager mendokumentasikan nilai pada instrumen resmi evaluasi teknis, memastikan penilaian obyektif dan terukur.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                      <div className="font-semibold text-sm text-neutral-950 mb-1">3. Sinkronisasi Keputusan Hiring (User & HR)</div>
                      <p className="text-xs text-neutral-600 leading-relaxed font-light">
                        Konsolidasi hasil antara catatan kepribadian HR dan evaluasi teknis User guna menetapkan rekomendasi final bagi kandidat terbaik.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-neutral-50 rounded-xl p-6 border border-neutral-200 space-y-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono">
                    Instrumen Terstandar Tahap 04
                  </div>

                  {/* Form User Card */}
                  <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
                        DPP/HR/FRM-INT-USR/2026
                      </span>
                      <span className="text-xs text-neutral-500">Asesor User</span>
                    </div>

                    {/* Thumbnail Preview */}
                    <div
                      onClick={() => onOpenAssessmentForm && onOpenAssessmentForm('user-interview')}
                      className="relative aspect-[16/9] bg-neutral-100 rounded-lg border border-neutral-200 overflow-hidden cursor-pointer group/thumb mb-2.5 shadow-2xs"
                    >
                      <img
                        src="/assets/aistudio/image_bcdba23c.png"
                        alt="Form Penilaian Interview User"
                        className="w-full h-full object-cover object-top group-hover/thumb:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-neutral-950/0 group-hover/thumb:bg-neutral-950/20 transition-colors flex items-center justify-center opacity-0 group-hover/thumb:opacity-100">
                        <span className="px-2.5 py-1 rounded bg-white text-neutral-950 text-[10px] font-semibold uppercase tracking-wider shadow-xs">
                          Lihat Lembar Asli
                        </span>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-neutral-950">
                      Formulir Penilaian Interview User & Teknis
                    </h4>
                    <p className="text-xs text-neutral-600 leading-relaxed font-light">
                      Instrumen evaluasi keterampilan praktis, problem-solving lapangan, dan rekomendasi user manager.
                    </p>

                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                      {onOpenAssessmentForm && (
                        <button
                          type="button"
                          onClick={() => onOpenAssessmentForm('user-interview')}
                          className="py-1.5 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Buka Form & Skoring</span>
                        </button>
                      )}
                      <span className="inline-flex items-center gap-1 text-[10px] text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
                        <Lock className="w-2.5 h-2.5" />
                        <span>SOP Resmi</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stage 4: Offering Letter & Onboarding */}
          {activeStage === 4 && (
            <div role="tabpanel" id="stage-panel-4" aria-labelledby="stage-tab-4" className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <div className="text-xs text-neutral-500 font-medium">
                    <span className="font-semibold text-neutral-950">Tahap 05:</span> Kepatuhan Hukum Ketenagakerjaan & Orientasi Karyawan Baru
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 font-serif">
                    Offering Letter, Legalitas Kontrak, & Onboarding
                  </h2>
                  <p className="text-sm text-neutral-600 leading-relaxed font-light">
                    Memastikan masa transisi kandidat terpilih menuju hari pertama kerja berjalan tertib, jelas, dan mematuhi regulasi ketenagakerjaan secara utuh.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                      <div className="font-semibold text-sm text-neutral-950 mb-1">1. Penerbitan Offering Letter & Negosiasi Penawaran</div>
                      <p className="text-xs text-neutral-600 leading-relaxed font-light">
                        Menjelaskan struktur kompensasi, paket benefit, masa percobaan/kontrak, dan tanggal mulai kerja secara transparan kepada kandidat terpilih.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                      <div className="font-semibold text-sm text-neutral-950 mb-1">2. Perjanjian Kerja (PKWT/PKWTT) & Kepatuhan BPJS</div>
                      <p className="text-xs text-neutral-600 leading-relaxed font-light">
                        Penandatanganan dokumen legal perjanjian kerja, pemenuhan berkas administrasi karyawan baru, serta pendaftaran kepesertaan BPJS Ketenagakerjaan dan Kesehatan.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                      <div className="font-semibold text-sm text-neutral-950 mb-1">3. Kesiapan Workstation & Induksi Hari Pertama (Day-1)</div>
                      <p className="text-xs text-neutral-600 leading-relaxed font-light">
                        Memastikan fasilitas kerja (ID card, seragam, akun internal, peralatan kerja) siap sebelum karyawan tiba, dilanjutkan pengenalan budaya perusahaan dan rekan kerja.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-neutral-50 rounded-xl p-6 border border-neutral-200 space-y-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono">
                    Tolok Ukur Kepatuhan Tahap 05
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between items-center py-2.5 px-3.5 bg-white rounded-lg border border-neutral-200">
                      <span className="text-neutral-600">Dokumen Legal PKWT/PKWTT</span>
                      <span className="font-mono font-bold text-neutral-950">100% Tertib</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 px-3.5 bg-white rounded-lg border border-neutral-200">
                      <span className="text-neutral-600">Pendaftaran BPJS</span>
                      <span className="font-medium text-neutral-950">Tepat Waktu</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 px-3.5 bg-white rounded-lg border border-neutral-200">
                      <span className="text-neutral-600">Kesiapan Fasilitas Day-1</span>
                      <span className="font-medium text-neutral-950">Lengkap H-1</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 px-3.5 bg-white rounded-lg border border-neutral-200">
                      <span className="text-neutral-600">Orientasi & Budaya Perusahaan</span>
                      <span className="font-medium text-neutral-950">Terstruktur</span>
                    </div>
                  </div>

                  <div className="pt-2 text-xs text-neutral-500 border-t border-neutral-200 leading-relaxed font-light">
                    Penyambutan karyawan baru yang tertib dan hangat menciptakan rasa aman psikologis dan mempercepat kesiapan mereka dalam berkontribusi.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Navigation CTA */}
      <div className="flex items-center justify-between pt-6 border-t border-neutral-200 animate-fade-in-up animation-delay-150">
        <button
          type="button"
          onClick={onBack}
          className="text-xs uppercase tracking-wider font-semibold text-neutral-600 hover:text-neutral-950 transition-colors group inline-flex items-center gap-1.5"
        >
          <span className="group-hover:-translate-x-1 inline-block transition-transform duration-150">&larr;</span> Kembali ke Beranda
        </button>
        <button
          type="button"
          onClick={onOpenContact}
          className="px-5 py-2.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 active:scale-[0.98] text-white text-xs uppercase tracking-wider font-medium transition-all shadow-2xs"
        >
          Undang Wawancara Kerja
        </button>
      </div>
    </div>
  );
};
