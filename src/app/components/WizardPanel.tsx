import React from 'react';
import { DocumentData, ComplianceStatus, ComplianceError } from '../types/document';
import Step1Setup from './Step1Setup';
import Step2AIContent from './Step2AIContent';
import Step3Refine from './Step3Refine';

interface WizardPanelProps {
  doc: DocumentData;
  updateDoc: (updates: Partial<DocumentData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isGenerating: boolean;
  setIsGenerating: (v: boolean) => void;
  complianceStatus: ComplianceStatus;
  setComplianceStatus: (s: ComplianceStatus) => void;
  complianceErrors: ComplianceError[];
  setComplianceErrors: (e: ComplianceError[]) => void;
  onExport: (format: 'docx' | 'pdf') => void;
}

export default function WizardPanel({
  doc,
  updateDoc,
  currentStep,
  setCurrentStep,
  isGenerating,
  setIsGenerating,
  complianceStatus,
  setComplianceStatus,
  complianceErrors,
  setComplianceErrors,
  onExport,
}: WizardPanelProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Step header */}
      <div className="px-5 py-4 border-b border-[#E9EAEB]">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-bold text-[#252B37]">
            {currentStep === 1 && 'Bước 1: Thiết lập ban đầu'}
            {currentStep === 2 && 'Bước 2: Tạo nội dung AI'}
            {currentStep === 3 && 'Bước 3: Tinh chỉnh & Xuất file'}
          </h2>
          <span className="text-xs text-[#717680] font-medium">{currentStep}/3</span>
        </div>
        <p className="text-[11px] text-[#717680]">
          {currentStep === 1 && 'Điền thông tin đơn vị ban hành và phân loại văn bản.'}
          {currentStep === 2 && 'AI sẽ tạo nội dung dựa trên thông tin bạn đã nhập.'}
          {currentStep === 3 && 'Chỉnh sửa, kiểm tra tuân thủ và xuất văn bản.'}
        </p>
        {/* Progress bar */}
        <div className="mt-3 h-1 bg-[#E9EAEB] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#565DD9] rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {currentStep === 1 && (
          <Step1Setup
            doc={doc}
            updateDoc={updateDoc}
            onNext={() => setCurrentStep(2)}
          />
        )}
        {currentStep === 2 && (
          <Step2AIContent
            doc={doc}
            updateDoc={updateDoc}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
          />
        )}
        {currentStep === 3 && (
          <Step3Refine
            doc={doc}
            updateDoc={updateDoc}
            onBack={() => setCurrentStep(2)}
            complianceStatus={complianceStatus}
            setComplianceStatus={setComplianceStatus}
            complianceErrors={complianceErrors}
            setComplianceErrors={setComplianceErrors}
            onExport={onExport}
          />
        )}
      </div>
    </div>
  );
}
