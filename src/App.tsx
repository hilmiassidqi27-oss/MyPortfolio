import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { DashboardPage } from './pages/DashboardPage';
import { AlurKerjaPage } from './pages/AlurKerjaPage';
import { ProyekPage } from './pages/ProyekPage';
import { FgdPage } from './pages/FgdPage';
import { ProfilPage } from './pages/ProfilPage';
import { MbtiModal } from './components/MbtiModal';
import { PipelineModal } from './components/PipelineModal';
import { ContactModal } from './components/ContactModal';
import { CvModal } from './components/CvModal';
import { AssessmentFormModal } from './components/AssessmentFormModal';
import { ASSESSMENT_FORMS_DATA } from './data/assessmentFormsData';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('dashboard');
  const [isMbtiOpen, setIsMbtiOpen] = useState(false);
  const [isPipelineOpen, setIsPipelineOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [activeAssessmentFormId, setActiveAssessmentFormId] = useState<'user-interview' | 'hr-interview' | null>(null);

  // Sync hash on initial load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as PageId;
    if (['dashboard', 'alur-kerja', 'proyek', 'fgd', 'profil'].includes(hash)) {
      setCurrentPage(hash);
    }
  }, []);

  // Update hash when page changes
  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMbtiOpen(false);
        setIsPipelineOpen(false);
        setIsContactOpen(false);
        setIsCvOpen(false);
        setActiveAssessmentFormId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectedAssessmentForm = activeAssessmentFormId
    ? ASSESSMENT_FORMS_DATA.find((f) => f.id === activeAssessmentFormId) || null
    : null;

  return (
    <div className="min-h-screen flex flex-col relative bg-[#FAFAFA] text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Universal Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenCvModal={() => setIsCvOpen(true)}
      />

      {/* Main Multi-Page Container with Elegant Slide-From-Bottom Transition */}
      <main
        key={currentPage}
        className="flex-1 pt-[68px] max-w-[1240px] mx-auto w-full px-5 sm:px-8 lg:px-10 page-slide-enter"
      >
        {currentPage === 'dashboard' && (
          <DashboardPage
            onNavigate={handleNavigate}
            onOpenContact={() => setIsContactOpen(true)}
            onOpenMbtiModal={() => setIsMbtiOpen(true)}
            onOpenCvModal={() => setIsCvOpen(true)}
          />
        )}

        {currentPage === 'alur-kerja' && (
          <AlurKerjaPage
            onBack={() => handleNavigate('dashboard')}
            onOpenContact={() => setIsContactOpen(true)}
            onOpenAssessmentForm={(formId) => setActiveAssessmentFormId(formId)}
          />
        )}

        {currentPage === 'proyek' && (
          <ProyekPage
            onBack={() => handleNavigate('dashboard')}
            onOpenMbtiModal={() => setIsMbtiOpen(true)}
            onOpenPipelineModal={() => setIsPipelineOpen(true)}
            onOpenContact={() => setIsContactOpen(true)}
            onOpenAssessmentForm={(formId) => setActiveAssessmentFormId(formId)}
          />
        )}

        {currentPage === 'fgd' && (
          <FgdPage
            onBack={() => handleNavigate('dashboard')}
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}

        {currentPage === 'profil' && (
          <ProfilPage
            onBack={() => handleNavigate('dashboard')}
            onOpenContact={() => setIsContactOpen(true)}
            onOpenCvModal={() => setIsCvOpen(true)}
          />
        )}
      </main>

      {/* Interactive Functional Modals */}
      <MbtiModal
        isOpen={isMbtiOpen}
        onClose={() => setIsMbtiOpen(false)}
      />

      <PipelineModal
        isOpen={isPipelineOpen}
        onClose={() => setIsPipelineOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <CvModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
      />

      <AssessmentFormModal
        form={selectedAssessmentForm}
        isOpen={Boolean(activeAssessmentFormId)}
        onClose={() => setActiveAssessmentFormId(null)}
      />
    </div>
  );
}
