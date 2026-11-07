import React, { useState } from 'react';
import { Candidate } from '../types';
import { X, Check, UserCheck, ArrowRight, ExternalLink } from 'lucide-react';

interface PipelineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'C-101',
    name: 'Bima Pratama',
    position: 'Staff Logistik & Warehouse',
    source: 'LinkedIn Inbound',
    status: 'screening',
    score: 92,
    date: '30 Sep 2026',
    notes: 'Kualifikasi relevan di pergudangan industri, CV rapi dan kualifikasi terverifikasi.'
  },
  {
    id: 'C-102',
    name: 'Anisa Rahmawati',
    position: 'Operator Assembly Line',
    source: 'Jobstreet',
    status: 'hr-interview',
    score: 88,
    date: '29 Sep 2026',
    notes: 'Wawancara HR berbasis STAR selesai. Evaluasi motivasi kerja dan integritas sangat baik.'
  },
  {
    id: 'C-103',
    name: 'Rizky Fadillah',
    position: 'Teknisi Maintenance',
    source: 'Internal Referral',
    status: 'assessment',
    score: 95,
    mbti: 'ISTJ',
    date: '28 Sep 2026',
    notes: 'Hasil asesmen 24 skenario menunjukkan ketelitian operasional dan stabilitas tinggi.'
  },
  {
    id: 'C-104',
    name: 'Hendro Wijaya',
    position: 'Kepala Regu Produksi',
    source: 'Jobstreet',
    status: 'user-interview',
    score: 91,
    date: '28 Sep 2026',
    notes: 'Wawancara teknis bersama user manager selesai. Pemahaman trouble-shooting mesin solid.'
  },
  {
    id: 'C-105',
    name: 'Dewi Lestari',
    position: 'Staf Administrasi HR',
    source: 'Campus Career Fair',
    status: 'onboarding',
    score: 97,
    mbti: 'ENFJ',
    date: '27 Sep 2026',
    notes: 'PKWT tuntas ditandatangani, BPJS aktif, perlengkapan Day-1 siap di workstation.'
  }
];

export const PipelineModal: React.FC<PipelineModalProps> = ({ isOpen, onClose }) => {
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(INITIAL_CANDIDATES[0]);
  const [newNote, setNewNote] = useState('');

  if (!isOpen) return null;

  const moveCandidate = (id: string, nextStatus: Candidate['status']) => {
    setCandidates(prev =>
      prev.map(c => (c.id === id ? { ...c, status: nextStatus } : c))
    );
    if (selectedCandidate && selectedCandidate.id === id) {
      setSelectedCandidate(prev => prev ? { ...prev, status: nextStatus } : null);
    }
  };

  const addNote = () => {
    if (!newNote.trim() || !selectedCandidate) return;
    const updatedNotes = `${selectedCandidate.notes} | [HR]: ${newNote.trim()}`;
    setCandidates(prev =>
      prev.map(c => (c.id === selectedCandidate.id ? { ...c, notes: updatedNotes } : c))
    );
    setSelectedCandidate(prev => prev ? { ...prev, notes: updatedNotes } : null);
    setNewNote('');
  };

  const stages: { key: Candidate['status']; label: string; count: number }[] = [
    { key: 'screening', label: '1. Screening', count: candidates.filter(c => c.status === 'screening').length },
    { key: 'hr-interview', label: '2. Wawancara HR', count: candidates.filter(c => c.status === 'hr-interview').length },
    { key: 'assessment', label: '3. Asesmen MBTI', count: candidates.filter(c => c.status === 'assessment').length },
    { key: 'user-interview', label: '4. Interview User', count: candidates.filter(c => c.status === 'user-interview').length },
    { key: 'onboarding', label: '5. Onboarding', count: candidates.filter(c => c.status === 'onboarding').length }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pipeline-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col focus:outline-none"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
          <div>
            <h2 id="pipeline-dialog-title" className="text-base sm:text-lg font-bold text-slate-900">
              Dashboard E-Recruitment Internal
            </h2>
            <p className="text-xs text-slate-500">
              Sentralisasi pemantauan pelamar, status seleksi, dan catatan evaluasi
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pipeline Stage Summary Bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {stages.map(s => (
            <div key={s.key} className="p-2 rounded-lg bg-white border border-slate-200 flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-600 truncate mr-1">{s.label}</span>
              <span className="font-mono text-xs font-bold text-slate-900">
                {s.count}
              </span>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Candidate List (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-900 uppercase tracking-wider">
                Daftar Pelamar Aktif
              </span>
              <span className="font-mono">Total: {candidates.length} Kandidat</span>
            </div>

            <div className="space-y-2.5">
              {candidates.map(candidate => {
                const isSelected = selectedCandidate?.id === candidate.id;
                return (
                  <div
                    key={candidate.id}
                    onClick={() => setSelectedCandidate(candidate)}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedCandidate(candidate)}
                    tabIndex={0}
                    role="button"
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-slate-900 bg-slate-50 shadow-sm'
                        : 'border-slate-200 bg-white hover:bg-slate-50/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-slate-900">{candidate.name}</span>
                      <span className="text-[11px] font-mono uppercase text-slate-500">
                        {candidate.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                      <span>{candidate.position}</span>
                      <span aria-hidden="true">·</span>
                      <span>{candidate.source}</span>
                    </div>
                    {candidate.mbti && (
                      <div className="mt-2 text-[11px] font-mono text-slate-700">
                        MBTI Terkalkulasi: <strong>{candidate.mbti}</strong>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Candidate Detail Inspector (Right 5 cols) */}
          <div className="lg:col-span-5 bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col justify-between">
            {selectedCandidate ? (
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <div className="text-[11px] font-mono text-slate-400">ID: {selectedCandidate.id}</div>
                  <h3 className="text-base font-bold text-slate-900">{selectedCandidate.name}</h3>
                  <p className="text-xs text-slate-600">{selectedCandidate.position}</p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-200/80">
                    <span className="text-slate-500">Skor Kesesuaian</span>
                    <span className="font-mono font-bold text-slate-900">{selectedCandidate.score}/100</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/80">
                    <span className="text-slate-500">Kanal Rekrutmen</span>
                    <span className="font-medium text-slate-800">{selectedCandidate.source}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/80">
                    <span className="text-slate-500">Status Seleksi</span>
                    <span className="font-mono font-bold text-slate-900 uppercase">{selectedCandidate.status}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-700 block mb-1">
                    Catatan Evaluasi Asesor
                  </span>
                  <div className="p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 leading-relaxed">
                    {selectedCandidate.notes}
                  </div>
                </div>

                {/* Add Quick HR Note */}
                <div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Tambah catatan..."
                      className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white flex-1 focus:ring-1 focus:ring-slate-900 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={addNote}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800"
                    >
                      Simpan
                    </button>
                  </div>
                </div>

                {/* Move to next stage action */}
                <div className="pt-2">
                  <span className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Aksi Alur Kerja
                  </span>
                  <div>
                    {selectedCandidate.status === 'screening' && (
                      <button
                        type="button"
                        onClick={() => moveCandidate(selectedCandidate.id, 'hr-interview')}
                        className="w-full py-2 px-3 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 flex items-center justify-center gap-1.5"
                      >
                        <span>Lolos ke Wawancara HR</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {selectedCandidate.status === 'hr-interview' && (
                      <button
                        type="button"
                        onClick={() => moveCandidate(selectedCandidate.id, 'assessment')}
                        className="w-full py-2 px-3 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 flex items-center justify-center gap-1.5"
                      >
                        <span>Lolos ke Asesmen MBTI</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {selectedCandidate.status === 'assessment' && (
                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={() => moveCandidate(selectedCandidate.id, 'user-interview')}
                          className="w-full py-2 px-3 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <span>Lolos ke Wawancara User & Teknis</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href="https://projectmbti2.vercel.app/"
                          target="_blank"
                          rel="noreferrer"
                          className="w-full py-1.5 px-3 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <span>Buka Aplikasi MBTI Live</span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                        </a>
                      </div>
                    )}
                    {selectedCandidate.status === 'user-interview' && (
                      <button
                        type="button"
                        onClick={() => moveCandidate(selectedCandidate.id, 'onboarding')}
                        className="w-full py-2 px-3 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Lolos ke Offering & Onboarding</span>
                      </button>
                    )}
                    {selectedCandidate.status === 'onboarding' && (
                      <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium text-center flex items-center justify-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        <span>Karyawan Resmi Bergabung</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-xs text-slate-400 py-12">
                Pilih kandidat dari daftar untuk melihat rincian & memperbarui status.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-200">
          <span className="text-xs text-slate-500">
            Terpusat di satu workflow tanpa dokumen tercecer.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors"
          >
            Tutup Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
