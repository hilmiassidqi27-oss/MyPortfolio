import React, { useState } from 'react';
import { PageId } from '../types';
import { Menu, X, Download, FileText, CheckCircle2 } from 'lucide-react';
import { useStoredCv, triggerCvDownload } from '../utils/cvStorage';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenContact: () => void;
  onOpenCvModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenContact,
  onOpenCvModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cv } = useStoredCv();

  const navItems: { id: PageId; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'alur-kerja', label: 'Alur Kerja' },
    { id: 'proyek', label: 'Proyek' },
    { id: 'fgd', label: 'Inisiatif FGD' },
    { id: 'profil', label: 'Profil & Keahlian' }
  ];

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCvClick = (e: React.MouseEvent) => {
    if (cv && e.shiftKey) {
      // Direct download if shift-clicked or through modal
      triggerCvDownload(cv);
    } else {
      onOpenCvModal();
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#FAFAFA]/95 backdrop-blur-md border-b border-neutral-200/90 transition-all">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-10 flex items-center justify-between h-[68px]">
        {/* Brand Zone: Classical Serif Wordmark */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleNavClick('dashboard')}
            className="text-left font-serif text-xl sm:text-2xl font-semibold tracking-normal text-neutral-900 hover:text-neutral-600 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900 rounded"
            aria-label="Hilmi Assidqi Beranda"
          >
            Hilmi Assidqi
          </button>
          <span className="hidden sm:inline text-neutral-300 font-light" aria-hidden="true">/</span>
          <span className="hidden sm:inline text-xs font-normal tracking-wide text-neutral-500 uppercase">
            People Operations & Talent Acquisition
          </span>
        </div>

        {/* Navigation Links: Refined Segmented Tab Bar */}
        <nav
          className="hidden md:inline-flex items-center p-1 bg-neutral-200/60 rounded-lg border border-neutral-200/80 text-xs tracking-wider uppercase font-medium shadow-2xs"
          aria-label="Navigasi Halaman"
        >
          {navItems.map(item => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1.5 rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900 ${
                  isActive
                    ? 'bg-white text-neutral-950 font-semibold shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Primary Action Zone */}
        <div className="flex items-center gap-2.5">
          {cv ? (
            <button
              type="button"
              onClick={handleCvClick}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-100 text-neutral-800 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900 relative group"
              title={`Berkas CV Asli Aktif (${cv.name}) — Klik untuk melihat atau mengunduh`}
            >
              <FileText className="w-3.5 h-3.5 text-neutral-700" />
              <span>CV ({cv.name.split('.').pop()?.toUpperCase() || 'PDF'})</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenCvModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-100 text-neutral-800 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900"
              title="Buka Dokumen Curriculum Vitae Resmi Hilmi Assidqi"
            >
              <FileText className="w-3.5 h-3.5 text-neutral-700" />
              <span>Dokumen CV</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenContact}
            className="px-4 py-2 rounded bg-neutral-900 hover:bg-neutral-800 text-white text-xs uppercase tracking-wider font-medium transition-all shadow-2xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900"
          >
            Undang Interview
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded text-neutral-700 hover:bg-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-900"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-5 py-4 border-t border-neutral-200 bg-[#FAFAFA] space-y-3 animate-fade-in">
          <div className="p-1 bg-neutral-200/60 rounded-lg border border-neutral-200/80 space-y-1">
            {navItems.map(item => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-md text-xs uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-white text-neutral-950 font-semibold shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCvModal();
              }}
              className="w-full text-left px-3.5 py-2 rounded-lg text-sm border border-slate-300 text-slate-800 font-medium inline-flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-700" />
                <span>Lihat & Unduh CV Resmi</span>
              </span>
              {cv && <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Tersedia</span>}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
