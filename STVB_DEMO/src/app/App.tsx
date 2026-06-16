import React, { useState, useCallback } from 'react';
import TopBar from './components/TopBar';
import DocumentPreview from './components/DocumentPreview';
import WizardPanel from './components/WizardPanel';
import { DocumentData, ComplianceStatus, ComplianceError, defaultDocument } from './types/document';

export default function App() {
  const [doc, setDoc] = useState<DocumentData>(defaultDocument);
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [complianceStatus, setComplianceStatus] = useState<ComplianceStatus>('idle');
  const [complianceErrors, setComplianceErrors] = useState<ComplianceError[]>([]);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);

  const updateDoc = useCallback((updates: Partial<DocumentData>) => {
    setDoc(prev => ({ ...prev, ...updates }));
  }, []);

  const showToast = (msg: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = () => {
    showToast('Đã lưu bản nháp thành công!', 'success');
  };

  const handleExport = (format: 'docx' | 'pdf') => {
    showToast(
      format === 'docx'
        ? 'Đang chuẩn bị xuất file Word (.docx)…'
        : 'Đang chuẩn bị xuất file PDF…',
      'info'
    );
    // Simulate export delay
    setTimeout(() => {
      showToast(
        format === 'docx'
          ? `Đã xuất "${doc.docName || 'van-ban'}.docx" thành công!`
          : `Đã xuất "${doc.docName || 'van-ban'}.pdf" thành công!`,
        'success'
      );
    }, 1500);
  };

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ fontFamily: "'Manrope', sans-serif", background: '#F0F1F3' }}
    >
      <TopBar
        doc={doc}
        currentStep={currentStep}
        complianceStatus={complianceStatus}
        onSave={handleSave}
        onExport={handleExport}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Left pane: Document preview */}
        <div className="flex-1 overflow-y-auto p-5">
          <DocumentPreview doc={doc} />
        </div>

        {/* Right pane: Wizard */}
        <div
          className="border-l border-[#E9EAEB] bg-white overflow-hidden flex flex-col"
          style={{ width: '440px', minWidth: '380px', maxWidth: '480px' }}
        >
          <WizardPanel
            doc={doc}
            updateDoc={updateDoc}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
            complianceStatus={complianceStatus}
            setComplianceStatus={setComplianceStatus}
            complianceErrors={complianceErrors}
            setComplianceErrors={setComplianceErrors}
            onExport={handleExport}
          />
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-sm font-medium transition-all ${
            toast.type === 'success'
              ? 'bg-[#252B37] text-white'
              : toast.type === 'error'
              ? 'bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA]'
              : 'bg-[#252B37] text-white'
          }`}
          style={{ minWidth: '240px' }}
        >
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              toast.type === 'success' ? 'bg-[#12B76A]' :
              toast.type === 'error' ? 'bg-[#F04438]' :
              'bg-[#778BED]'
            }`}
          />
          {toast.msg}
        </div>
      )}
    </div>
  );
}
