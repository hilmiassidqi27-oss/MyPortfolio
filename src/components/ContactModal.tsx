import React, { useState } from 'react';
import { X, Mail, Check, ExternalLink, Send, Briefcase } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('Undangan Wawancara Kerja (Interview Invitation)');
  const [senderName, setSenderName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const email = 'hilmiassidqi27@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      `[Rekrutmen] ${subject} - ${companyName || senderName}`
    )}&body=${encodeURIComponent(
      `Halo Hilmi Assidqi,\n\nNama Pengirim: ${senderName}\nPerusahaan / Institusi: ${companyName}\n\nPesan / Detail Peluang:\n${message}\n\nSalam hormat,\n${senderName}`
    )}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col focus:outline-none"
        tabIndex={-1}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded w-fit mb-1 border border-emerald-200/50">
              <Briefcase className="w-3 h-3" />
              <span>Terbuka untuk Peluang Kerja (Open to Work)</span>
            </div>
            <h2 id="contact-dialog-title" className="text-base font-bold text-slate-900">
              Undang Wawancara / Rekrut Hilmi
            </h2>
            <p className="text-xs text-slate-500">Kandidat Recruitment & People Operations (S.Psi)</p>
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

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Quick Email Copy Row */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-500 block">Email Langsung Kandidat</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-900">{email}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={copyEmail}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-800 hover:bg-slate-100 active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tersalin!</span>
                </>
              ) : (
                <span>Salin Email</span>
              )}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="contact-sender-name" className="font-semibold text-slate-700 block mb-1">
                  Nama Anda / Recruiter
                </label>
                <input
                  id="contact-sender-name"
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="cth. Sarah (Talent Acquisition)"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-company-name" className="font-semibold text-slate-700 block mb-1">
                  Nama Perusahaan
                </label>
                <input
                  id="contact-company-name"
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="cth. PT Nusantara Abadi"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="font-semibold text-slate-700 block mb-1">
                Tujuan Kontak / Posisi yang Ditawarkan
              </label>
              <select
                id="contact-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-none"
              >
                <option value="Undangan Wawancara Kerja (Interview Invitation)">Undangan Wawancara Kerja (Interview Invitation)</option>
                <option value="Peluang Posisi Recruitment / Talent Acquisition Specialist">Peluang Posisi Recruitment / Talent Acquisition Specialist</option>
                <option value="Peluang Posisi People Operations / HR Generalist">Peluang Posisi People Operations / HR Generalist</option>
                <option value="Permintaan Portofolio & Dokumen Pendukung Tambahan">Permintaan Portofolio & Dokumen Pendukung Tambahan</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="font-semibold text-slate-700 block mb-1">
                Pesan / Keterangan Singkat
              </label>
              <textarea
                id="contact-message"
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan posisi yang dibuka, jadwal wawancara, atau informasi yang ingin Anda sampaikan..."
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:ring-1 focus:ring-slate-900 focus:outline-none leading-relaxed"
              ></textarea>
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900 font-medium"
              >
                <span>Buka LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-medium transition-all shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitted ? 'Membuka Email...' : 'Kirim Undangan Wawancara'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs font-mono text-slate-500 text-center">
          Kandidat siap merespons undangan wawancara dalam waktu &lt; 24 jam.
        </div>
      </div>
    </div>
  );
};
