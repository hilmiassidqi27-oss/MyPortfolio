import React, { useState } from 'react';
import { MbtiQuestion } from '../types';
import { X, Check, FileText, ExternalLink } from 'lucide-react';

interface MbtiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_SCENARIOS: MbtiQuestion[] = [
  {
    id: 1,
    dimension: 'EI',
    dimensionName: 'Orientasi Energi (Ekstrovert vs Introvert)',
    scenario: 'Ketika terjadi kendala operasional mendesak di lini perakitan pabrik, bagaimana Anda biasanya memulai penyelesaian masalah?',
    optionA: {
      text: 'Langsung mengumpulkan anggota regu kerja di lantai operasional, berdiskusi terbuka dan bertukar ide secara verbal untuk merumuskan aksi cepat bersama.',
      trait: 'Ekstrovert (E)',
      letter: 'E'
    },
    optionB: {
      text: 'Menganalisis log data kerusakan dan urutan kejadian terlebih dahulu secara fokus dan mandiri sebelum membagikan rekomendasi solutif ke tim.',
      trait: 'Introvert (I)',
      letter: 'I'
    }
  },
  {
    id: 2,
    dimension: 'SN',
    dimensionName: 'Pengolahan Informasi (Sensing vs Intuition)',
    scenario: 'Dalam menyusun laporan evaluasi seleksi kandidat batch baru, data mana yang paling Anda prioritaskan?',
    optionA: {
      text: 'Data fakta terperinci, angka skor tes aktual, checklist dokumen kehadiran, dan rekam jejak kepatuhan presisi.',
      trait: 'Sensing (S)',
      letter: 'S'
    },
    optionB: {
      text: 'Pola potensi jangka panjang, kecenderungan motivasi kultural, dan prediksi kapabilitas adaptasi peran di masa depan.',
      trait: 'Intuition (N)',
      letter: 'N'
    }
  },
  {
    id: 3,
    dimension: 'TF',
    dimensionName: 'Pengambilan Keputusan (Thinking vs Feeling)',
    scenario: 'Seorang anggota tim menunjukkan penurunan performa namun memiliki komitmen personal yang tulus. Tindakan apa yang Anda ambil?',
    optionA: {
      text: 'Menegakkan standar Key Performance Indicator (KPI) secara konsisten dan objektif demi keadilan sistem seluruh tim.',
      trait: 'Thinking (T)',
      letter: 'T'
    },
    optionB: {
      text: 'Mengadakan sesi konseling empatik satu lawan satu untuk memahami beban situasionalnya sebelum menentukan penyesuaian target.',
      trait: 'Feeling (F)',
      letter: 'F'
    }
  },
  {
    id: 4,
    dimension: 'JP',
    dimensionName: 'Struktur Kerja (Judging vs Perceiving)',
    scenario: 'Bagaimana cara Anda mengelola alur kerja harian dan timeline proyek perekrutan?',
    optionA: {
      text: 'Menetapkan rundown terstruktur, checklist deadline harian ketat, dan menyelesaikan target tahap demi tahap sesuai jadwal.',
      trait: 'Judging (J)',
      letter: 'J'
    },
    optionB: {
      text: 'Menyediakan ruang fleksibilitas adaptif tinggi agar dapat merespons prioritas mendadak atau peluang talent tak terduga secara dinamis.',
      trait: 'Perceiving (P)',
      letter: 'P'
    }
  }
];

export const MbtiModal: React.FC<MbtiModalProps> = ({ isOpen, onClose }) => {
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({
    1: 'A',
    2: 'B',
    3: 'B',
    4: 'A'
  });
  const [candidateName, setCandidateName] = useState('Hilmi Assidqi (Uji Sampel)');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'simulator' | 'screenshot'>('simulator');

  if (!isOpen) return null;

  const handleSelect = (questionId: number, choice: 'A' | 'B') => {
    setAnswers(prev => ({ ...prev, [questionId]: choice }));
  };

  // Calculate scores
  const eScore = answers[1] === 'A' ? 78 : 22;
  const iScore = 100 - eScore;

  const nScore = answers[2] === 'B' ? 65 : 35;
  const sScore = 100 - nScore;

  const fScore = answers[3] === 'B' ? 82 : 18;
  const tScore = 100 - fScore;

  const jScore = answers[4] === 'A' ? 74 : 26;
  const pScore = 100 - jScore;

  const mbtiCode = `${eScore > 50 ? 'E' : 'I'}${nScore > 50 ? 'N' : 'S'}${fScore > 50 ? 'F' : 'T'}${jScore > 50 ? 'J' : 'P'}`;

  const copyReport = () => {
    const reportText = `LAPORAN ASESMEN PSIKOLOGI MBTI - PT DIAN PANDU PRATAMA\n` +
      `Kandidat: ${candidateName}\n` +
      `Hasil Dimensi: ${mbtiCode} (The Mentor & Facilitator)\n` +
      `- Ekstrovert (E): ${eScore}% | Introvert (I): ${iScore}%\n` +
      `- Intuition (N): ${nScore}% | Sensing (S): ${sScore}%\n` +
      `- Feeling (F): ${fScore}% | Thinking (T): ${tScore}%\n` +
      `- Judging (J): ${jScore}% | Perceiving (P): ${pScore}%\n` +
      `Catatan HR: Memiliki kepemimpinan suportif, inisiatif komunikasi kelompok tinggi, cocok untuk peran People Operations & Team Leadership.`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mbti-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl border border-neutral-200 flex flex-col focus:outline-none"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-200">
          <div>
            <h2 id="mbti-dialog-title" className="font-serif text-xl sm:text-2xl font-bold text-neutral-950">
              Simulator Asesmen Kepribadian MBTI
            </h2>
            <p className="text-xs text-neutral-500 font-light">
              Instrumen 24 skenario situasi kerja industri • PT Dian Pandu Pratama
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Web App Banner */}
        <div className="mx-6 mt-4 p-4 rounded-lg bg-neutral-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white"></span>
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <span>Versi Produksi Live:</span>
                <span className="font-mono text-neutral-300">projectmbti2.vercel.app</span>
              </div>
              <div className="text-[11px] text-neutral-400 font-light">
                Uji langsung instrumen penuh 24 butir skenario lengkap dengan penyimpanan data kandidat.
              </div>
            </div>
          </div>
          <a
            href="https://projectmbti2.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white text-neutral-950 hover:bg-neutral-100 text-xs uppercase tracking-wider font-semibold transition-all shrink-0 shadow-2xs"
          >
            <span>Buka Web App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* View Switcher: Simulator vs Real App Screenshot */}
        <div className="mx-6 mt-4 flex p-1 bg-neutral-200/70 rounded-lg max-w-sm text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('simulator')}
            className={`flex-1 py-1.5 px-3 rounded text-[11px] uppercase tracking-wider transition-all ${
              activeTab === 'simulator'
                ? 'bg-white text-neutral-950 font-semibold shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-950'
            }`}
          >
            Simulator Interaktif
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('screenshot')}
            className={`flex-1 py-1.5 px-3 rounded text-[11px] uppercase tracking-wider transition-all ${
              activeTab === 'screenshot'
                ? 'bg-white text-neutral-950 font-semibold shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-950'
            }`}
          >
            Tangkapan Layar Asli
          </button>
        </div>

        {/* Content */}
        {activeTab === 'screenshot' ? (
          <div className="p-6 space-y-4 animate-fade-in">
            <div className="relative rounded-xl border border-neutral-200 overflow-hidden bg-neutral-100 shadow-md">
              <div className="p-3 bg-neutral-950 text-white flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span className="font-semibold">projectmbti2.vercel.app</span>
                </div>
                <a
                  href="https://projectmbti2.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-neutral-300 inline-flex items-center gap-1"
                >
                  <span>Buka Web Live</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <img
                src="/assets/aistudio/image_001793f7.png"
                alt="Antarmuka Asesmen Kepribadian MBTI PT Dian Pandu Pratama"
                className="w-full h-auto block select-none"
              />
            </div>
            <p className="text-xs text-neutral-600 font-light leading-relaxed">
              Tangkapan layar antarmuka formulir registrasi kandidat aplikasi asesmen kepribadian MBTI terkalibrasi berbasis 24 skenario industri PT Dian Pandu Pratama yang di-deploy secara publik di Vercel.
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
          {/* Candidate Profile Input */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <label htmlFor="candidate-name" className="text-xs font-semibold text-slate-600 block mb-1">
                Nama Kandidat / Sesi Uji
              </label>
              <input
                id="candidate-name"
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="font-medium text-xs sm:text-sm text-slate-900 bg-white border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:w-64 focus:ring-1 focus:ring-slate-900 focus:outline-none"
                placeholder="Masukkan nama kandidat"
              />
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[11px] font-mono text-slate-500 uppercase block">Hasil Skor Terkalkulasi</span>
              <span className="text-2xl font-bold font-mono text-slate-900">{mbtiCode}</span>
            </div>
          </div>

          {/* Question List */}
          <div className="space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Pilih Respon Tindakan pada Situasi Nyata
            </div>
            {SAMPLE_SCENARIOS.map((q) => (
              <fieldset key={q.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                <legend className="text-xs font-semibold text-slate-900 px-1">
                  Skenario 0{q.id}: {q.dimensionName}
                </legend>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {q.scenario}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => handleSelect(q.id, 'A')}
                    className={`text-left p-3 rounded-lg border text-xs leading-relaxed transition-all ${
                      answers[q.id] === 'A'
                        ? 'border-slate-900 bg-slate-50 text-slate-900 font-medium'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1 font-semibold">
                      <span>[A] {q.optionA.trait}</span>
                      {answers[q.id] === 'A' && <Check className="w-3.5 h-3.5 text-slate-900" />}
                    </div>
                    {q.optionA.text}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelect(q.id, 'B')}
                    className={`text-left p-3 rounded-lg border text-xs leading-relaxed transition-all ${
                      answers[q.id] === 'B'
                        ? 'border-slate-900 bg-slate-50 text-slate-900 font-medium'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1 font-semibold">
                      <span>[B] {q.optionB.trait}</span>
                      {answers[q.id] === 'B' && <Check className="w-3.5 h-3.5 text-slate-900" />}
                    </div>
                    {q.optionB.text}
                  </button>
                </div>
              </fieldset>
            ))}
          </div>

          {/* Real-time Dimension Breakdown */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">
                Distribusi 4 Dimensi Kepribadian
              </span>
              <span className="font-mono text-slate-500">
                Kalkulasi Otomatis Aktif
              </span>
            </div>

            {/* E vs I */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className={eScore >= 50 ? 'font-bold text-slate-900' : 'text-slate-500'}>
                  Ekstrovert (E) {eScore}%
                </span>
                <span className={iScore > 50 ? 'font-bold text-slate-900' : 'text-slate-500'}>
                  {iScore}% Introvert (I)
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                <div className="bg-slate-900 transition-all duration-300" style={{ width: `${eScore}%` }}></div>
                <div className="bg-slate-400 transition-all duration-300" style={{ width: `${iScore}%` }}></div>
              </div>
            </div>

            {/* N vs S */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className={sScore >= 50 ? 'font-bold text-slate-900' : 'text-slate-500'}>
                  Sensing (S) {sScore}%
                </span>
                <span className={nScore > 50 ? 'font-bold text-slate-900' : 'text-slate-500'}>
                  {nScore}% Intuition (N)
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                <div className="bg-slate-400 transition-all duration-300" style={{ width: `${sScore}%` }}></div>
                <div className="bg-slate-900 transition-all duration-300" style={{ width: `${nScore}%` }}></div>
              </div>
            </div>

            {/* T vs F */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className={tScore >= 50 ? 'font-bold text-slate-900' : 'text-slate-500'}>
                  Thinking (T) {tScore}%
                </span>
                <span className={fScore > 50 ? 'font-bold text-slate-900' : 'text-slate-500'}>
                  {fScore}% Feeling (F)
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                <div className="bg-slate-400 transition-all duration-300" style={{ width: `${tScore}%` }}></div>
                <div className="bg-slate-900 transition-all duration-300" style={{ width: `${fScore}%` }}></div>
              </div>
            </div>

            {/* J vs P */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className={jScore >= 50 ? 'font-bold text-slate-900' : 'text-slate-500'}>
                  Judging (J) {jScore}%
                </span>
                <span className={pScore > 50 ? 'font-bold text-slate-900' : 'text-slate-500'}>
                  {pScore}% Perceiving (P)
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                <div className="bg-slate-900 transition-all duration-300" style={{ width: `${jScore}%` }}></div>
                <div className="bg-slate-400 transition-all duration-300" style={{ width: `${pScore}%` }}></div>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Footer Actions */}
        <div className="sticky bottom-0 z-20 flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-slate-50 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={copyReport}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors shadow-sm"
            >
              <FileText className="w-4 h-4" />
              <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Rekapitulasi HR'}</span>
            </button>
            <a
              href="https://projectmbti2.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold transition-colors shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Buka Aplikasi Live (projectmbti2.vercel.app)</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            </a>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
