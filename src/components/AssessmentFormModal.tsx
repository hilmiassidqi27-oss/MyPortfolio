import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Printer,
  FileCheck,
  Award,
  AlertCircle,
  CheckCircle2,
  RotateCcw,
  User,
  Briefcase,
  Calendar,
  Building,
  Sparkles,
  ShieldCheck,
  Lock,
  Upload,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Trash2,
  Sliders,
  HelpCircle,
  FileText,
  Check
} from 'lucide-react';
import { AssessmentFormItem } from '../types';
import { useFormPhoto, saveFormPhoto, removeFormPhoto, formatPhotoSize } from '../utils/formPhotoStorage';

interface AssessmentFormModalProps {
  form: AssessmentFormItem | null;
  isOpen: boolean;
  initialTab?: 'photo' | 'scoring' | 'questions';
  onClose: () => void;
}

export const AssessmentFormModal: React.FC<AssessmentFormModalProps> = ({
  form,
  isOpen,
  initialTab = 'photo',
  onClose
}) => {
  const [activeView, setActiveView] = useState<'photo' | 'scoring' | 'questions'>('photo');
  const [candidateName, setCandidateName] = useState('Dimas Prasetyo (Kandidat Sampel)');
  const [appliedRole, setAppliedRole] = useState('Staff Operasional & Logistik');
  const [scores, setScores] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState('');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);
  const [showDigitalSheet, setShowDigitalSheet] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Hook to get custom uploaded photo if any
  const { photo, refresh } = useFormPhoto(form?.id);

  // Initialize view and scores
  useEffect(() => {
    if (form) {
      setActiveView(initialTab);
      const initialScores: Record<string, number> = {};
      form.criteria.forEach((c) => {
        initialScores[c.id] = c.defaultScore;
      });
      setScores(initialScores);
      setNotes(
        form.id === 'user-interview'
          ? 'Kandidat memiliki pemahaman teknis yang solid, runtut dalam menguraikan troubleshooting mesin di operasional, serta siap bekerja dengan sistem shift dinamis.'
          : 'Kandidat menunjukkan artikulasi komunikasi yang terstruktur dengan metode STAR. Tidak ada indikasi kecenderungan social loafing, proaktif berbagi peran, dan memiliki nilai integritas yang tinggi.'
      );
      setZoomLevel(100);
    }
  }, [form, isOpen, initialTab]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLightboxOpen, onClose]);

  if (!isOpen || !form) return null;

  const totalScore = Object.values(scores).reduce((acc, curr) => acc + curr, 0);
  const percentage = Math.round((totalScore / form.maxScore) * 100);

  let recommendationStatus: {
    label: string;
    description: string;
    badgeClass: string;
  };

  if (totalScore >= form.thresholds.recommended) {
    recommendationStatus = {
      label: 'DISARANKAN (RECOMMENDED)',
      description: 'Kandidat melampaui standar kualifikasi dan siap diusulkan ke tahapan berikutnya.',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300'
    };
  } else if (totalScore >= form.thresholds.considered) {
    recommendationStatus = {
      label: 'DIPERTIMBANGKAN (CONSIDERED)',
      description: 'Kandidat memenuhi kualifikasi dasar namun membutuhkan pendampingan di area tertentu.',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-300'
    };
  } else {
    recommendationStatus = {
      label: 'TIDAK DISARANKAN (NOT RECOMMENDED)',
      description: 'Kandidat belum memenuhi ambang batas kompetensi minimum yang disyaratkan posisi ini.',
      badgeClass: 'bg-rose-50 text-rose-800 border-rose-300'
    };
  }

  const handleScoreChange = (criterionId: string, val: number) => {
    setScores((prev) => ({ ...prev, [criterionId]: val }));
  };

  const handleResetScores = () => {
    const initialScores: Record<string, number> = {};
    form.criteria.forEach((c) => {
      initialScores[c.id] = c.defaultScore;
    });
    setScores(initialScores);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    // Check size limit: max 10MB
    if (file.size > 10 * 1024 * 1024) {
      alert('Ukuran berkas melebihi batas 10MB. Harap gunakan foto dengan ukuran lebih kecil.');
      return;
    }

    setIsUploading(true);
    try {
      await saveFormPhoto(form.id, file);
      setUploadSuccessMessage('Foto contoh dokumen berhasil disimpan!');
      setTimeout(() => setUploadSuccessMessage(null), 3000);
      refresh();
    } catch (err) {
      console.error('Failed to save photo:', err);
      alert('Gagal menyimpan foto. Silakan coba lagi.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemovePhoto = async () => {
    if (window.confirm('Kembalikan pratinjau ke template standar tersanitasi? Foto kustom akan dihapus.')) {
      await removeFormPhoto(form.id);
      refresh();
    }
  };

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="assessment-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/80 backdrop-blur-sm overflow-y-auto"
      >
        <div
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col focus:outline-none"
          tabIndex={-1}
        >
          {/* Header Action Bar */}
          <div className="no-print sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-slate-50 border-b border-slate-200">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-semibold text-slate-600 bg-slate-200/90 px-2 py-0.5 rounded">
                  {form.code}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  <Lock className="w-3 h-3" />
                  <span>Konfidensial Terproteksi</span>
                </span>
              </div>
              <h2 id="assessment-modal-title" className="text-base font-bold text-slate-900">
                {form.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 text-xs font-medium transition-colors"
                title="Cetak lembar penilaian ini"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline">Cetak</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors ml-1"
                aria-label="Tutup jendela pratinjau instrumen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-8 space-y-6">
            {/* Confidentiality Warning & Notice Banner */}
            <div className="no-print p-4 rounded-xl bg-amber-50/80 border border-amber-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-amber-900">
                    Dokumen Bersifat Konfidensial (Internal PT Dian Pandu Pratama)
                  </span>
                  <p className="text-amber-800 leading-relaxed text-[11px] sm:text-xs">
                    {form.confidentialNotice}
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-900 hover:bg-amber-950 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{photo ? 'Ganti Foto' : 'Unggah Foto Contoh'}</span>
                </button>
              </div>
            </div>

            {uploadSuccessMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg flex items-center gap-2 animate-fade-in">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{uploadSuccessMessage}</span>
              </div>
            )}

            {/* Document Header Metadata Section */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-500 font-medium flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-400" /> Nama Kandidat
                  </label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 bg-slate-50/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 font-medium flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-slate-400" /> Posisi Dilamar
                  </label>
                  <input
                    type="text"
                    value={appliedRole}
                    onChange={(e) => setAppliedRole(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 bg-slate-50/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 font-medium flex items-center gap-1">
                    <Award className="w-3 h-3 text-slate-400" /> Asesor / Pewawancara
                  </label>
                  <div className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-100/70 text-slate-900 font-medium truncate">
                    {form.assessorRole}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" /> Tanggal Asesmen
                  </label>
                  <div className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-100/70 text-slate-900 font-medium">
                    {new Date().toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                <span className="font-medium">
                  Metodologi: <span className="text-slate-900 font-semibold">{form.methodology}</span>
                </span>
                <span className="font-mono text-slate-500">
                  Panduan: {form.scoringGuide}
                </span>
              </div>
            </div>

            {/* Segmented View Switcher (3 Tabs) */}
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold max-w-xl">
              <button
                type="button"
                onClick={() => setActiveView('photo')}
                className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeView === 'photo'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Foto Contoh Dokumen {photo ? '(Kustom)' : ''}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveView('scoring')}
                className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeView === 'scoring'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Simulasi Skoring & Rubrik</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveView('questions')}
                className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeView === 'questions'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Bank Pertanyaan ({form.standardQuestions.length})</span>
              </button>
            </div>

            {/* =========================================================================
                TAB 1: FOTO CONTOH DOKUMEN & MOCKUP RESMI TERSANITASI
            ========================================================================= */}
            {activeView === 'photo' && (
              <div className="space-y-4">
                {/* Photo Viewer Controls Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-700">Tampilan Pratinjau:</span>
                    {photo ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-mono text-[11px] border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Foto Unggahan ({formatPhotoSize(photo.fileSize)})</span>
                      </span>
                    ) : form.samplePhotoUrl && !showDigitalSheet ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-mono text-[11px] border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Foto Lembar Kerja Asli</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[11px]">
                        <span>Template Resmi Tersanitasi</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {form.samplePhotoUrl && !photo && (
                      <button
                        type="button"
                        onClick={() => setShowDigitalSheet(!showDigitalSheet)}
                        className="px-2.5 py-1 text-[11px] rounded-lg border border-slate-300 hover:bg-slate-200 text-slate-700 transition-colors inline-flex items-center gap-1 font-medium"
                      >
                        <FileText className="w-3 h-3 text-slate-500" />
                        <span>{showDigitalSheet ? 'Lihat Foto Asli' : 'Format Teks Standar'}</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setZoomLevel((z) => Math.max(z - 15, 60))}
                      className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Perkecil pratinjau"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-[11px] text-slate-600 px-1">
                      {zoomLevel}%
                    </span>
                    <button
                      type="button"
                      onClick={() => setZoomLevel((z) => Math.min(z + 15, 180))}
                      className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Perbesar pratinjau"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomLevel(100)}
                      className="px-2 py-1 text-[11px] rounded-lg border border-slate-300 hover:bg-slate-200 text-slate-700 transition-colors"
                    >
                      Reset
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsLightboxOpen(true)}
                      className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Layar Penuh"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>

                    {photo && (
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 text-[11px] transition-colors ml-1"
                        title="Hapus foto kustom dan gunakan template standar"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Hapus Foto</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Display Canvas: Custom Image OR High-Fidelity Official Form Template */}
                <div className="relative border border-slate-300 rounded-2xl bg-slate-100 p-4 sm:p-6 overflow-x-auto flex justify-center items-start min-h-[520px]">
                  {(photo || (form.samplePhotoUrl && !showDigitalSheet)) ? (
                    /* Photo View (Custom Uploaded OR Official Screenshot) */
                    <div
                      style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                      className="transition-transform duration-150 relative bg-white shadow-lg rounded-xl overflow-hidden max-w-full"
                    >
                      {/* Watermark indicator */}
                      <div className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-mono rounded tracking-wider uppercase pointer-events-none">
                        {photo ? 'Foto Dokumen Unggahan' : 'Foto Lembar Kerja Resmi PT DPP'}
                      </div>
                      <img
                        src={photo ? photo.dataUrl : form.samplePhotoUrl}
                        alt={`Foto contoh ${form.title}`}
                        className="max-w-full h-auto block select-none rounded-lg"
                      />
                    </div>
                  ) : (
                    /* High-Fidelity Official Sanitized Sample Form Sheet */
                    <div
                      style={{
                        transform: `scale(${zoomLevel / 100})`,
                        transformOrigin: 'top center',
                        width: '740px'
                      }}
                      className="transition-transform duration-150 shrink-0 bg-white border border-slate-300 shadow-md rounded-xl p-8 relative overflow-hidden select-none font-sans text-slate-800"
                    >
                      {/* Subtle Diagonal Security Watermark */}
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center -rotate-30 opacity-[0.06] select-none">
                        <span className="text-6xl font-black tracking-widest text-slate-900 uppercase">
                          CONTOH · TERSANITASI
                        </span>
                      </div>

                      {/* Letterhead Header */}
                      <div className="border-b-2 border-slate-900 pb-4 mb-5 flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded bg-slate-900 text-white font-mono font-black text-xs flex items-center justify-center">
                              DPP
                            </span>
                            <span className="text-sm font-black tracking-wider uppercase text-slate-900">
                              PT DIAN PANDU PRATAMA
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium">
                            {form.sampleLayoutDetails.division} · Human Capital Management
                          </div>
                        </div>

                        <div className="text-right text-[10px] font-mono space-y-0.5">
                          <div className="font-bold text-slate-900">{form.code}</div>
                          <div className="text-slate-500">{form.sampleLayoutDetails.revision}</div>
                          <div className="text-amber-800 font-semibold uppercase">{form.sampleLayoutDetails.securityLevel}</div>
                        </div>
                      </div>

                      {/* Document Title Banner */}
                      <div className="text-center py-2.5 px-4 bg-slate-100 rounded-lg mb-6 border border-slate-200">
                        <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                          {form.sampleLayoutDetails.docTitle}
                        </h3>
                        <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                          {form.sampleLayoutDetails.docSub}
                        </p>
                      </div>

                      {/* Candidate Meta Info Table */}
                      <div className="grid grid-cols-2 gap-3 text-xs mb-6 border border-slate-200 rounded-lg p-3.5 bg-slate-50/60 font-mono">
                        <div>
                          <span className="text-slate-500">Nama Kandidat:</span>{' '}
                          <span className="font-bold text-slate-900">{form.sampleLayoutDetails.sampleCandidate}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Posisi:</span>{' '}
                          <span className="font-bold text-slate-900">{form.sampleLayoutDetails.samplePosition}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Pewawancara:</span>{' '}
                          <span className="font-bold text-slate-900">{form.assessorRole}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Tanggal Asesmen:</span>{' '}
                          <span className="font-bold text-slate-900">12 Oktober 2026 (Sampel)</span>
                        </div>
                      </div>

                      {/* Evaluation Table */}
                      <div className="border border-slate-300 rounded-lg overflow-hidden mb-6 text-xs">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-900 text-white font-mono text-[11px]">
                              <th className="py-2.5 px-3 w-10 text-center">No</th>
                              <th className="py-2.5 px-3">Dimensi Asesmen & Tolok Ukur</th>
                              <th className="py-2.5 px-3 w-16 text-center">Skor (1-5)</th>
                              <th className="py-2.5 px-3 w-56">Catatan Perilaku / Verifikasi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 font-sans">
                            {form.sampleLayoutDetails.sampleScores.map((row, idx) => (
                              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                                <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-600">
                                  {idx + 1}
                                </td>
                                <td className="py-2.5 px-3 font-medium text-slate-900">
                                  {row.criterion}
                                </td>
                                <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-900">
                                  <span className="inline-block w-6 h-6 rounded bg-slate-100 border border-slate-300 leading-6 text-center">
                                    {row.score}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3 text-[11px] text-slate-600 leading-snug font-mono">
                                  {row.notes}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Assessor Recommendation & Signatures */}
                      <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/60 space-y-3 mb-6 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 uppercase">
                            Kesimpulan & Rekomendasi Akhir:
                          </span>
                          <span className="px-3 py-1 rounded bg-emerald-100 text-emerald-900 font-mono font-bold text-[11px] border border-emerald-300">
                            ✓ DISARANKAN (Lulus)
                          </span>
                        </div>
                        <p className="text-slate-700 italic text-[11px] leading-relaxed">
                          "{form.sampleLayoutDetails.summaryConclusion}"
                        </p>
                      </div>

                      {/* Signatures Block */}
                      <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-200 text-xs text-center font-mono">
                        <div className="space-y-12">
                          <div className="text-slate-500">Asesor Penguji / Pewawancara</div>
                          <div>
                            <div className="font-bold text-slate-900 underline underline-offset-4">
                              Hilmi Assidqi, S.Psi
                            </div>
                            <div className="text-[10px] text-slate-500">Recruitment & Talent Acquisition</div>
                          </div>
                        </div>

                        <div className="space-y-12">
                          <div className="text-slate-500">Mengetahui (Head of Division)</div>
                          <div>
                            <div className="font-bold text-slate-900 underline underline-offset-4">
                              Manager Divisi Terkait
                            </div>
                            <div className="text-[10px] text-slate-500">PT Dian Pandu Pratama</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 text-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>{form.samplePhotoCaption}</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-500 shrink-0">
                    Format: Foto Terproteksi / A4 Template
                  </span>
                </div>
              </div>
            )}

            {/* =========================================================================
                TAB 2: SCORING SHEET & LIVE SIMULATOR
            ========================================================================= */}
            {activeView === 'scoring' && (
              <div className="space-y-6">
                {/* Live Score Summary & Real-time Gauge */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-mono tracking-wider uppercase text-slate-400">
                        Kalkulasi Skor Asesmen Interaktif
                      </span>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-white">
                          {totalScore}
                        </span>
                        <span className="text-slate-400 font-mono text-sm">
                          / {form.maxScore} Poin ({percentage}%)
                        </span>
                      </div>
                    </div>

                    <div className="sm:text-right space-y-1">
                      <span className="text-[11px] font-mono uppercase text-slate-400">
                        Rekomendasi Akhir Asesor
                      </span>
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold border ${recommendationStatus.badgeClass}`}>
                          {recommendationStatus.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
                    <p>{recommendationStatus.description}</p>
                    <button
                      type="button"
                      onClick={handleResetScores}
                      className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset Skor Awal</span>
                    </button>
                  </div>
                </div>

                {/* Criteria List with Likert Scale 1 - 5 */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider px-1">
                    <span>Dimensi Penilaian & Indikator Perilaku</span>
                    <span>Skala Penilaian (1 - 5)</span>
                  </div>

                  {form.criteria.map((criterion, idx) => {
                    const currentScore = scores[criterion.id] ?? criterion.defaultScore;

                    let currentIndicatorText = '';
                    let indicatorTag = '';
                    if (currentScore <= 2) {
                      currentIndicatorText = criterion.indicators.poor;
                      indicatorTag = 'Perlu Perbaikan / Kurang';
                    } else if (currentScore === 3) {
                      currentIndicatorText = criterion.indicators.competent;
                      indicatorTag = 'Memenuhi Standar Minimal';
                    } else {
                      currentIndicatorText = criterion.indicators.excellent;
                      indicatorTag = 'Sangat Baik / Unggul';
                    }

                    return (
                      <div
                        key={criterion.id}
                        className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="space-y-1 max-w-xl">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] font-mono font-bold flex items-center justify-center shrink-0">
                                {idx + 1}
                              </span>
                              <h3 className="text-sm font-bold text-slate-900">
                                {criterion.name}
                              </h3>
                              <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                {criterion.category}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed pl-7">
                              {criterion.description}
                            </p>
                          </div>

                          {/* 1 - 5 Likert Buttons */}
                          <div className="flex items-center gap-1.5 pl-7 sm:pl-0 shrink-0">
                            {[1, 2, 3, 4, 5].map((val) => {
                              const isSelected = currentScore === val;
                              return (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={() => handleScoreChange(criterion.id, val)}
                                  className={`w-9 h-9 rounded-lg font-mono text-xs font-bold transition-all ${
                                    isSelected
                                      ? 'bg-slate-900 text-white shadow-xs scale-105 ring-2 ring-slate-900/20'
                                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                  }`}
                                  aria-label={`Beri nilai ${val} untuk ${criterion.name}`}
                                >
                                  {val}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Dynamic Indicator Feedback for Selected Score */}
                        <div className="ml-7 p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs flex items-start gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                          <div className="space-y-0.5">
                            <span className="font-semibold text-slate-800">
                              Observasi Skor {currentScore} ({indicatorTag}):
                            </span>
                            <p className="text-slate-600 leading-relaxed">
                              {currentIndicatorText}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Qualitative Assessor Notes Textarea */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-slate-700" />
                    <span>Catatan Kualitatif Asesor & Tindak Lanjut</span>
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tuliskan catatan observasi, aspek kekuatan utama kandidat, serta pertimbangan khusus lainnya..."
                    className="w-full p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  />
                </div>
              </div>
            )}

            {/* =========================================================================
                TAB 3: STANDARD INTERVIEW QUESTIONS BANK
            ========================================================================= */}
            {activeView === 'questions' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                  Pertanyaan-pertanyaan panduan ini dirancang untuk memancing respons berbasis situasi nyata (STAR Method) dan mengeliminasi jawaban teoritis semata.
                </div>

                <div className="space-y-3">
                  {form.standardQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 bg-white flex items-start gap-3.5"
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-900 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        Q{idx + 1}
                      </span>
                      <div className="space-y-1">
                        <p className="text-xs sm:text-sm font-medium text-slate-900 leading-relaxed">
                          {q}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Fokus observasi: Konkretitas bukti, kejujuran narasi, dan peran spesifik kandidat.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="no-print px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>Divisi Human Resources & Operasional · PT Dian Pandu Pratama</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                <span>Format Dokumen Terlindungi</span>
              </span>
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

      {/* Lightbox / Fullscreen Modal Overlay */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex flex-col p-4 sm:p-6"
        >
          <div className="flex items-center justify-between text-white pb-3 border-b border-slate-700">
            <div className="text-xs font-mono">
              Pratinjau Layar Penuh: <span className="font-bold">{form.title}</span>
            </div>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-auto flex items-center justify-center p-4">
            {photo || form.samplePhotoUrl ? (
              <img
                src={photo ? photo.dataUrl : form.samplePhotoUrl}
                alt={form.title}
                className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
              />
            ) : (
              <div className="text-white text-center space-y-2">
                <p className="text-sm font-semibold">Tampilan Layar Penuh Template Format Standar</p>
                <p className="text-xs text-slate-400">Gunakan tombol "Unggah Foto Contoh" di halaman utama modal jika ingin melihat foto lembar kerja fisik.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
