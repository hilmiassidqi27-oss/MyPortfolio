import React, { useEffect, useState } from 'react';
import { CertificateItem } from '../data/certificatesData';
import { X, Download, ExternalLink, Calendar, Award, Building2 } from 'lucide-react';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectCertificate?: (cert: CertificateItem) => void;
  allCertificates?: CertificateItem[];
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  isOpen,
  onClose,
  onSelectCertificate,
  allCertificates = []
}) => {
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !certificate) return null;

  const handleCopyId = () => {
    if (certificate.credentialId) {
      navigator.clipboard.writeText(certificate.credentialId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const currentIndex = allCertificates.findIndex((c) => c.id === certificate.id);
  const prevCert = currentIndex > 0 ? allCertificates[currentIndex - 1] : null;
  const nextCert = currentIndex < allCertificates.length - 1 ? allCertificates[currentIndex + 1] : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-xl shadow-2xl border border-neutral-200 flex flex-col focus:outline-none"
        tabIndex={-1}
      >
        {/* Top Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-neutral-200">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-mono">
              Dokumen Resmi Terverifikasi · {currentIndex + 1} dari {allCertificates.length}
            </span>
            <h2 id="cert-modal-title" className="font-serif text-lg sm:text-xl font-bold text-neutral-950">
              {certificate.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={certificate.pdfUrl}
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-100 text-neutral-800 text-xs uppercase tracking-wider font-medium transition-colors"
              title="Unduh Berkas PDF Asli"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Unduh PDF</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded text-neutral-400 hover:text-neutral-950 hover:bg-neutral-100 transition-colors"
              aria-label="Tutup Pratinjau Sertifikat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Display Area */}
        <div className="p-6 space-y-6">
          {/* Main Visual Certificate Frame */}
          <div className="bg-neutral-100 rounded-lg p-2 sm:p-4 border border-neutral-200 flex items-center justify-center overflow-hidden shadow-inner">
            <div className="relative max-w-3xl w-full bg-white rounded shadow-sm border border-neutral-300/80 overflow-hidden">
              <img
                src={certificate.imageUrl}
                alt={`Sertifikat ${certificate.title} - ${certificate.issuer}`}
                className="w-full h-auto object-contain block"
                loading="eager"
              />
            </div>
          </div>

          {/* Certificate Metadata & Verification Info */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
            <div className="md:col-span-7 space-y-3">
              <div className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                Deskripsi Kompetensi
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed font-light">
                {certificate.description}
              </p>
              {certificate.topic && (
                <div className="text-xs text-neutral-500 pt-1">
                  <span className="font-medium text-neutral-900">Bidang Pembahasan:</span> {certificate.topic}
                </div>
              )}
            </div>

            <div className="md:col-span-5 bg-[#FBFBFA] rounded-lg p-4 border border-neutral-200 space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-500 block text-[11px] uppercase tracking-wider">Lembaga Penerbit</span>
                  <span className="font-semibold text-neutral-900">{certificate.issuer}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 border-t border-neutral-200/70 pt-2.5">
                <Calendar className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-500 block text-[11px] uppercase tracking-wider">Tanggal Penyelesaian</span>
                  <span className="font-medium text-neutral-800">{certificate.date}</span>
                </div>
              </div>

              {certificate.credentialId && (
                <div className="flex items-start gap-2.5 border-t border-neutral-200/70 pt-2.5">
                  <Award className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                  <div className="w-full">
                    <span className="text-neutral-500 block text-[11px] uppercase tracking-wider">ID Kredensial / Sertifikat</span>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <span className="font-mono text-[11px] text-neutral-800 break-all">{certificate.credentialId}</span>
                      <button
                        type="button"
                        onClick={handleCopyId}
                        className="text-[10px] uppercase font-semibold text-neutral-600 hover:text-neutral-950 transition-colors shrink-0"
                      >
                        {copiedId ? 'Tersalin' : 'Salin'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <a
                  href={certificate.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded bg-neutral-900 hover:bg-neutral-800 text-white text-xs uppercase tracking-wider font-medium inline-flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <span>Buka PDF di Tab Baru</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Pagination & Navigation Footer */}
        <div className="sticky bottom-0 z-20 flex items-center justify-between px-6 py-3 bg-neutral-50 border-t border-neutral-200 text-xs">
          <div>
            {prevCert && onSelectCertificate ? (
              <button
                type="button"
                onClick={() => onSelectCertificate(prevCert)}
                className="font-medium text-neutral-700 hover:text-neutral-950 transition-colors inline-flex items-center gap-1"
              >
                <span>&larr; {prevCert.title}</span>
              </button>
            ) : (
              <span className="text-neutral-400">Awal Daftar</span>
            )}
          </div>

          <div>
            {nextCert && onSelectCertificate ? (
              <button
                type="button"
                onClick={() => onSelectCertificate(nextCert)}
                className="font-medium text-neutral-700 hover:text-neutral-950 transition-colors inline-flex items-center gap-1"
              >
                <span>{nextCert.title} &rarr;</span>
              </button>
            ) : (
              <span className="text-neutral-400">Akhir Daftar</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
