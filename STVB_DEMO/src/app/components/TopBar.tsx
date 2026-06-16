import React, { useState } from 'react';
import {
  FileText, CheckCircle, AlertCircle, Clock, Download,
  Save, ChevronDown, Shield, Printer, Eye
} from 'lucide-react';
import { DocumentData, ComplianceStatus } from '../types/document';

interface TopBarProps {
  doc: DocumentData;
  currentStep: number;
  complianceStatus: ComplianceStatus;
  onSave: () => void;
  onExport: (format: 'docx' | 'pdf') => void;
}

export default function TopBar({ doc, currentStep, complianceStatus, onSave, onExport }: TopBarProps) {
  const [showExport, setShowExport] = useState(false);

  const complianceBadge = () => {
    switch (complianceStatus) {
      case 'passed':
        return (
          <span className="inline-flex items-center gap-1.5 h-7 px-3 bg-[#D1FADF] text-[#027A48] rounded-full text-xs font-semibold">
            <CheckCircle size={13} />
            Chuẩn NĐ 30
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1.5 h-7 px-3 bg-[#FEE4E2] text-[#B42318] rounded-full text-xs font-semibold">
            <AlertCircle size={13} />
            Chưa đạt NĐ 30
          </span>
        );
      case 'checking':
        return (
          <span className="inline-flex items-center gap-1.5 h-7 px-3 bg-[#FEF0C7] text-[#DC6803] rounded-full text-xs font-semibold">
            <Clock size={13} className="animate-spin" style={{ animationDuration: '2s' }} />
            Đang kiểm tra…
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 h-7 px-3 bg-[#E9EAEB] text-[#535862] rounded-full text-xs font-medium">
            <Shield size={13} />
            Chưa kiểm tra
          </span>
        );
    }
  };

  const steps = [
    { num: 1, label: 'Thiết lập' },
    { num: 2, label: 'Tạo nội dung' },
    { num: 3, label: 'Tinh chỉnh' },
  ];

  return (
    <header className="h-14 bg-white border-b border-[#E9EAEB] flex items-center px-4 gap-4 shrink-0 z-20">
      {/* Brand */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-[#30307D] flex items-center justify-center shrink-0">
          <FileText size={16} className="text-white" />
        </div>
        <div className="leading-tight">
          <p className="text-xs font-semibold text-[#252B37]" style={{ fontSize: '13px' }}>WebOS</p>
          <p className="text-[10px] text-[#717680]">Soạn thảo văn bản</p>
        </div>
      </div>

      <div className="w-px h-6 bg-[#E9EAEB] shrink-0" />

      {/* Step indicator */}
      <div className="flex items-center gap-1 shrink-0">
        {steps.map((step, idx) => (
          <React.Fragment key={step.num}>
            <div className="flex items-center gap-1.5">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0 transition-all ${
                  currentStep === step.num
                    ? 'bg-[#30307D] text-white'
                    : currentStep > step.num
                    ? 'bg-[#D1FADF] text-[#027A48]'
                    : 'bg-[#E9EAEB] text-[#717680]'
                }`}
              >
                {currentStep > step.num ? <CheckCircle size={11} /> : step.num}
              </div>
              <span
                className={`text-xs transition-colors ${
                  currentStep === step.num ? 'text-[#252B37] font-semibold' : 'text-[#717680]'
                }`}
                style={{ fontSize: '12px' }}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`w-8 h-px mx-1 ${currentStep > step.num ? 'bg-[#027A48]' : 'bg-[#E9EAEB]'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Doc title */}
      <div className="flex-1 min-w-0 px-4">
        {doc.docName ? (
          <p className="text-sm font-medium text-[#252B37] truncate">{doc.docName}</p>
        ) : (
          <p className="text-sm text-[#A4A7AE] italic">Chưa đặt tên văn bản…</p>
        )}
        {doc.docType && (
          <p className="text-[10px] text-[#717680]">{doc.docType}</p>
        )}
      </div>

      {/* Compliance badge */}
      <div className="shrink-0">{complianceBadge()}</div>

      <div className="w-px h-6 bg-[#E9EAEB] shrink-0" />

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onSave}
          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-[#D5D7DA] text-xs font-medium text-[#535862] hover:bg-[#E9EAEB] transition-colors"
        >
          <Save size={13} />
          Lưu nháp
        </button>

        <div className="relative">
          <button
            onClick={() => setShowExport(v => !v)}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-[#30307D] hover:bg-[#383A9E] text-white text-xs font-semibold transition-colors"
          >
            <Download size={13} />
            Xuất file
            <ChevronDown size={12} />
          </button>
          {showExport && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowExport(false)} />
              <div className="absolute right-0 top-full mt-1 z-50 w-44 py-1 bg-white rounded-xl shadow-lg shadow-black/10 border border-[#E9EAEB]">
                <button
                  onClick={() => { onExport('docx'); setShowExport(false); }}
                  className="flex items-center gap-2.5 w-full h-9 px-3 text-xs text-[#252B37] hover:bg-[#F4F4F5] transition-colors"
                >
                  <FileText size={14} className="text-[#565DD9]" />
                  Xuất Word (.docx)
                </button>
                <button
                  onClick={() => { onExport('pdf'); setShowExport(false); }}
                  className="flex items-center gap-2.5 w-full h-9 px-3 text-xs text-[#252B37] hover:bg-[#F4F4F5] transition-colors"
                >
                  <Printer size={14} className="text-[#D92D20]" />
                  Xuất PDF (.pdf)
                </button>
                <div className="my-1 border-t border-[#E9EAEB]" />
                <button
                  onClick={() => setShowExport(false)}
                  className="flex items-center gap-2.5 w-full h-9 px-3 text-xs text-[#252B37] hover:bg-[#F4F4F5] transition-colors"
                >
                  <Eye size={14} className="text-[#717680]" />
                  Xem trước in
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
