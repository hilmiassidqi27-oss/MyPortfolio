import React from 'react';
import { ArrowLeft, GraduationCap, Users, UserCheck, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

interface FgdPageProps {
  onBack: () => void;
  onOpenContact: () => void;
}

export const FgdPage: React.FC<FgdPageProps> = ({ onBack, onOpenContact }) => {
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
        <span className="text-xs font-mono text-neutral-400">03 / METODOLOGI ASESMEN</span>
      </div>

      {/* Title Header */}
      <div className="max-w-3xl space-y-3 animate-fade-in-up animation-delay-75">
        <span className="text-xs text-neutral-500 font-medium uppercase tracking-widest">
          Inisiatif Strategis Asesmen Kandidat
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-neutral-950 tracking-tight leading-tight">
          FGD sebagai Pilihan Wawancara Dinamis
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
          Menilai kandidat secara komprehensif dengan membandingkan sudut pandang wawancara individual terhadap interaksi kelompok langsung dalam simulasi studi kasus kerja nyata.
        </p>
      </div>

      {/* Deep Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up animation-delay-100">
        {/* Method 1: 1-on-1 STAR */}
        <div className="bg-white rounded-xl p-8 border border-neutral-200 shadow-2xs card-floating flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">Metode Evaluasi 01</span>
              <span className="text-xs font-semibold text-neutral-900 border-b border-neutral-900">Kedalaman Personal</span>
            </div>

            <h2 className="font-serif text-2xl font-bold text-neutral-950">
              Wawancara Satu Lawan Satu (STAR)
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Wawancara mendalam yang berfokus pada eksplorasi narasi personal, kejujuran riwayat kerja, dan keselarasan nilai etika kerja kandidat secara privat.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-700">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-1">Validasi Rekam Jejak STAR</div>
                <div className="text-slate-600 leading-relaxed">
                  Menguji kebenaran klaim di resume: situasi riil (Situation), tugas tanggung jawab (Task), tindakan konkret (Action), dan hasil terukur (Result).
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-1">Penggalian Kesesuaian Budaya</div>
                <div className="text-slate-600 leading-relaxed">
                  Memahami motivasi karir jangka panjang, integritas personal, dan ekspektasi kompensasi kandidat.
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
            <strong>Optimal Untuk:</strong> Peran spesialis teknis, level manajerial/eksekutif, dan klarifikasi resume mendalam.
          </div>
        </div>

        {/* Method 2: Focus Group Discussion (Inisiatif) */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-300 shadow-xs card-floating flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-mono text-xs text-slate-900 font-semibold uppercase">Inisiatif Terapan</span>
              <span className="text-xs font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">Dinamika Kelompok</span>
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Focus Group Discussion (FGD)
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Simulasi masalah kerja nyata di meja diskusi dalam kelompok 5–7 kandidat untuk mengamati kepemimpinan situasional tanpa skenario jawaban yang dihafal.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-700">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-1">Interaksi Alami & Kepemimpinan Nyata</div>
                <div className="text-slate-600 leading-relaxed">
                  Terlihat jelas kandidat mana yang mampu mendengarkan rekan bicara, memoderasi perbedaan sudut pandang, dan merumuskan solusi win-win.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-semibold text-slate-900 mb-1">Deteksi Social Loafing (Penumpang Nama)</div>
                <div className="text-slate-600 leading-relaxed">
                  Mengidentifikasi kandidat yang pasif, enggan berkontribusi saat bekerja tim, atau hanya menonjolkan diri sendiri tanpa menghargai rekan lain.
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-900 font-medium">
            <strong>Optimal Untuk:</strong> Peran operasional kolaboratif, staf lintas departemen, dan seleksi kandidat batch besar.
          </div>
        </div>
      </div>

      {/* Psychology Academic Theoretical Grounding */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs card-floating space-y-4 animate-fade-in-up animation-delay-150">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Landasan Teori Psikologi: Riset Skripsi Sarjana Psikologi (S.Psi)
            </h2>
            <p className="text-xs text-slate-500">Universitas AKI Semarang • Peminatan Psikologi Industri & Organisasi</p>
          </div>
        </div>

        <blockquote className="p-4 rounded-xl bg-slate-50 border-l-4 border-slate-900 text-slate-800 text-sm italic font-medium leading-relaxed">
          "Skripsi saya membahas kohesivitas kelompok dan efikasi diri dengan social loafing—topik yang identik dengan perilaku nyata yang diobservasi saat kandidat berdiskusi dalam FGD."
        </blockquote>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Dalam psikologi organisasi, <em>social loafing</em> adalah kecenderungan individu untuk mengeluarkan usaha yang lebih sedikit ketika bekerja secara kelompok dibanding saat bekerja sendirian. Melalui inisiatif simulasi FGD di PT Dian Pandu Pratama, teori akademis ini diterjemahkan menjadi rubrik observasi praktis bagi rekruter untuk memastikan kandidat yang direkrut memiliki etos kerja kolaboratif yang sehat.
        </p>

        {/* 4 Rubric Elements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs hover:border-slate-300 transition-colors">
            <div className="font-bold text-slate-900 mb-0.5">1. Active Listening</div>
            <div className="text-slate-600">Menghargai giliran bicara dan tidak memotong penjelasan rekan.</div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs hover:border-slate-300 transition-colors">
            <div className="font-bold text-slate-900 mb-0.5">2. Problem Solving</div>
            <div className="text-slate-600">Menawarkan solusi berbasis data dan logika operasional.</div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs hover:border-slate-300 transition-colors">
            <div className="font-bold text-slate-900 mb-0.5">3. Consensus Building</div>
            <div className="text-slate-600">Mampu menyatukan silang pendapat menuju satu keputusan tim.</div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs hover:border-slate-300 transition-colors">
            <div className="font-bold text-slate-900 mb-0.5">4. Emotional Maturity</div>
            <div className="text-slate-600">Tetap tenang dan konstruktif saat gagasannya dikritik.</div>
          </div>
        </div>
      </section>

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
