import React, { useState } from 'react';
import {
  CheckCircle, XCircle, AlertCircle, Shield, Edit3,
  MessageSquare, Download, RotateCcw, ChevronRight, Loader2
} from 'lucide-react';
import { DocumentData, ComplianceStatus, ComplianceError } from '../types/document';

interface Step3RefineProps {
  doc: DocumentData;
  updateDoc: (updates: Partial<DocumentData>) => void;
  onBack: () => void;
  complianceStatus: ComplianceStatus;
  setComplianceStatus: (s: ComplianceStatus) => void;
  complianceErrors: ComplianceError[];
  setComplianceErrors: (e: ComplianceError[]) => void;
  onExport: (format: 'docx' | 'pdf') => void;
}

function validateCompliance(doc: DocumentData): ComplianceError[] {
  const errors: ComplianceError[] = [];

  if (!doc.issuingUnit) errors.push({ field: 'issuingUnit', message: 'Thiếu tên cơ quan / đơn vị ban hành' });
  if (!doc.docType) errors.push({ field: 'docType', message: 'Chưa chọn loại văn bản' });
  if (!doc.docName) errors.push({ field: 'docName', message: 'Thiếu tên / trích yếu văn bản' });
  if (!doc.issuedDate) errors.push({ field: 'issuedDate', message: 'Thiếu ngày ban hành' });
  if (!doc.location) errors.push({ field: 'location', message: 'Thiếu địa danh ban hành' });
  if (!doc.docNumber) errors.push({ field: 'docNumber', message: 'Thiếu số văn bản (định dạng: 01/TB-XXX)' });
  if (!doc.content || doc.content.length < 50) errors.push({ field: 'content', message: 'Nội dung văn bản quá ngắn hoặc còn trống' });
  if (!doc.signerTitle) errors.push({ field: 'signerTitle', message: 'Thiếu chức danh người ký' });
  if (!doc.signerName) errors.push({ field: 'signerName', message: 'Thiếu họ tên người ký' });

  // Check doc number format
  if (doc.docNumber && doc.unitCode) {
    const expectedFormat = /^\d+$/;
    if (!expectedFormat.test(doc.docNumber)) {
      errors.push({ field: 'docNumber', message: 'Số thứ tự phải là chữ số (vd: 01, 15)' });
    }
  }

  return errors;
}

const AI_SUGGESTIONS = [
  'Kiểm tra lại văn phong và sự rõ ràng của nội dung',
  'Đảm bảo tính nhất quán của thuật ngữ pháp lý',
  'Rút gọn các đoạn văn quá dài để dễ đọc hơn',
  'Bổ sung căn cứ pháp lý nếu còn thiếu',
  'Kiểm tra lại định dạng số văn bản theo chuẩn NĐ30',
];

export default function Step3Refine({
  doc, updateDoc, onBack,
  complianceStatus, setComplianceStatus,
  complianceErrors, setComplianceErrors,
  onExport,
}: Step3RefineProps) {
  const [activeTab, setActiveTab] = useState<'edit' | 'compliance' | 'ai'>('edit');
  const [aiChat, setAiChat] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [isAiReplying, setIsAiReplying] = useState(false);

  const handleCheckCompliance = () => {
    setComplianceStatus('checking');
    setTimeout(() => {
      const errors = validateCompliance(doc);
      setComplianceErrors(errors);
      setComplianceStatus(errors.length === 0 ? 'passed' : 'failed');
    }, 1800);
  };

  const handleAiChat = () => {
    if (!aiChat.trim()) return;
    const userMsg = aiChat.trim();
    setChatHistory(h => [...h, { role: 'user', text: userMsg }]);
    setAiChat('');
    setIsAiReplying(true);

    setTimeout(() => {
      const responses = [
        `Tôi đã phân tích nội dung văn bản của bạn. "${userMsg}" — Gợi ý: Bạn nên thêm căn cứ pháp lý rõ ràng hơn và đảm bảo văn phong phù hợp với văn bản hành chính.`,
        `Về yêu cầu "${userMsg}": Tôi đề xuất điều chỉnh cấu trúc đoạn văn, sử dụng ngôn ngữ trang trọng và tránh cách diễn đạt không chính thức.`,
        `Đã xem xét nội dung. Để cải thiện "${userMsg}", hãy đảm bảo mỗi điều khoản có đủ cơ sở pháp lý và nêu rõ trách nhiệm thực hiện.`,
      ];
      const reply = responses[Math.floor(Math.random() * responses.length)];
      setChatHistory(h => [...h, { role: 'ai', text: reply }]);
      setIsAiReplying(false);
    }, 1500);
  };

  const tabs = [
    { id: 'edit' as const, label: 'Chỉnh sửa', icon: Edit3 },
    { id: 'compliance' as const, label: 'Kiểm tra NĐ30', icon: Shield },
    { id: 'ai' as const, label: 'Trợ lý AI', icon: MessageSquare },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="border-b border-[#E9EAEB] px-4">
        <div className="flex gap-0">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 h-10 px-3 text-xs border-b-2 -mb-px transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#414CC6] border-[#565DD9] font-semibold'
                    : 'text-[#717680] border-transparent hover:text-[#252B37]'
                }`}
              >
                <Icon size={13} />
                {tab.label}
                {tab.id === 'compliance' && complianceStatus === 'failed' && (
                  <span className="w-4 h-4 rounded-full bg-[#F04438] text-white text-[9px] font-bold flex items-center justify-center">
                    {complianceErrors.length}
                  </span>
                )}
                {tab.id === 'compliance' && complianceStatus === 'passed' && (
                  <span className="w-4 h-4 rounded-full bg-[#12B76A] text-white flex items-center justify-center">
                    <CheckCircle size={10} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {/* === EDIT TAB === */}
        {activeTab === 'edit' && (
          <div className="p-5 space-y-4">
            {/* Signer info */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 bg-[#565DD9] rounded-full" />
                <h3 className="text-xs font-semibold text-[#252B37] uppercase tracking-wide">Thông tin người ký</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-[#252B37] mb-1.5">
                    Chức danh <span className="text-[#F04438]">*</span>
                  </label>
                  <input
                    value={doc.signerTitle}
                    onChange={e => updateDoc({ signerTitle: e.target.value })}
                    placeholder="vd: GIÁM ĐỐC"
                    className="w-full h-9 px-3 border border-[#D5D7DA] rounded-lg text-xs text-[#252B37] placeholder:text-[#A4A7AE] outline-none focus:border-[#778BED] focus:ring-2 focus:ring-[#EBEEFF] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#252B37] mb-1.5">
                    Họ và tên <span className="text-[#F04438]">*</span>
                  </label>
                  <input
                    value={doc.signerName}
                    onChange={e => updateDoc({ signerName: e.target.value })}
                    placeholder="vd: Nguyễn Văn A"
                    className="w-full h-9 px-3 border border-[#D5D7DA] rounded-lg text-xs text-[#252B37] placeholder:text-[#A4A7AE] outline-none focus:border-[#778BED] focus:ring-2 focus:ring-[#EBEEFF] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Nơi nhận */}
            <div>
              <label className="block text-xs font-semibold text-[#252B37] mb-1.5">Nơi nhận</label>
              <textarea
                value={doc.recipients}
                onChange={e => updateDoc({ recipients: e.target.value })}
                rows={4}
                placeholder="- Như trên;&#10;- Lưu: VT."
                className="w-full px-3 py-2 border border-[#D5D7DA] rounded-lg text-xs text-[#252B37] placeholder:text-[#A4A7AE] outline-none focus:border-[#778BED] focus:ring-2 focus:ring-[#EBEEFF] transition-all resize-none font-mono"
              />
            </div>

            {/* Content editor */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#252B37]">Nội dung văn bản</label>
                <span className="text-[10px] text-[#717680]">{doc.content.length} ký tự</span>
              </div>
              <textarea
                value={doc.content}
                onChange={e => updateDoc({ content: e.target.value })}
                rows={16}
                className="w-full px-3 py-2.5 border border-[#D5D7DA] rounded-lg text-xs text-[#252B37] outline-none focus:border-[#778BED] focus:ring-2 focus:ring-[#EBEEFF] transition-all resize-none leading-relaxed"
                placeholder="Nội dung văn bản..."
              />
              <p className="text-[10px] text-[#717680] mt-1">
                Chỉnh sửa trực tiếp hoặc sử dụng tab Trợ lý AI để cải thiện nội dung.
              </p>
            </div>
          </div>
        )}

        {/* === COMPLIANCE TAB === */}
        {activeTab === 'compliance' && (
          <div className="p-5 space-y-4">
            <div className="text-center py-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${
                complianceStatus === 'passed' ? 'bg-[#D1FADF]' :
                complianceStatus === 'failed' ? 'bg-[#FEE4E2]' :
                complianceStatus === 'checking' ? 'bg-[#FEF0C7]' :
                'bg-[#E9EAEB]'
              }`}>
                {complianceStatus === 'passed' && <CheckCircle size={28} className="text-[#027A48]" />}
                {complianceStatus === 'failed' && <XCircle size={28} className="text-[#B42318]" />}
                {complianceStatus === 'checking' && <Loader2 size={28} className="text-[#DC6803] animate-spin" />}
                {complianceStatus === 'idle' && <Shield size={28} className="text-[#717680]" />}
              </div>
              <h3 className={`text-sm font-bold mb-1 ${
                complianceStatus === 'passed' ? 'text-[#027A48]' :
                complianceStatus === 'failed' ? 'text-[#B42318]' :
                complianceStatus === 'checking' ? 'text-[#DC6803]' :
                'text-[#252B37]'
              }`}>
                {complianceStatus === 'passed' ? 'Đạt chuẩn Nghị định 30/2020' :
                 complianceStatus === 'failed' ? `Chưa đạt — ${complianceErrors.length} lỗi cần sửa` :
                 complianceStatus === 'checking' ? 'Đang kiểm tra…' :
                 'Kiểm tra tuân thủ NĐ 30/2020'}
              </h3>
              <p className="text-xs text-[#717680]">
                {complianceStatus === 'idle' && 'Nhấn nút bên dưới để kiểm tra văn bản theo chuẩn Nghị định 30/2020/NĐ-CP'}
                {complianceStatus === 'checking' && 'Hệ thống đang phân tích các quy định về bố cục, trường bắt buộc...'}
                {complianceStatus === 'passed' && 'Văn bản đã đáp ứng đầy đủ các yêu cầu của Nghị định 30/2020/NĐ-CP'}
                {complianceStatus === 'failed' && 'Vui lòng khắc phục các lỗi sau để đạt chuẩn'}
              </p>
            </div>

            <button
              onClick={handleCheckCompliance}
              disabled={complianceStatus === 'checking'}
              className="w-full h-10 rounded-lg bg-[#30307D] hover:bg-[#383A9E] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {complianceStatus === 'checking' ? (
                <><Loader2 size={14} className="animate-spin" /> Đang kiểm tra…</>
              ) : complianceStatus !== 'idle' ? (
                <><RotateCcw size={14} /> Kiểm tra lại</>
              ) : (
                <><Shield size={14} /> Kiểm tra chuẩn NĐ 30</>
              )}
            </button>

            {/* Error list */}
            {complianceErrors.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[#252B37]">Danh sách lỗi cần khắc phục:</p>
                {complianceErrors.map((err, i) => (
                  <div key={i} className="flex gap-2.5 p-3 bg-[#FEF3F2] border border-[#FECDCA] rounded-lg">
                    <XCircle size={13} className="text-[#B42318] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-[#B42318] font-medium">{err.message}</p>
                      <p className="text-[10px] text-[#D92D20] mt-0.5">Trường: {err.field}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {complianceStatus === 'passed' && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-[#252B37]">Các mục đã đạt chuẩn:</p>
                {[
                  'Tên cơ quan ban hành', 'Quốc hiệu & Tiêu ngữ',
                  'Số hiệu văn bản', 'Địa danh & Ngày ban hành',
                  'Tên loại văn bản', 'Trích yếu nội dung',
                  'Nội dung văn bản', 'Thông tin người ký',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2.5 py-1.5">
                    <CheckCircle size={13} className="text-[#027A48] shrink-0" />
                    <span className="text-xs text-[#252B37]">{item}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Rules info */}
            <div className="p-3 bg-[#F5F6FF] border border-[#D7E2FE] rounded-xl">
              <p className="text-[10px] font-semibold text-[#414CC6] mb-1.5">Quy tắc kiểm tra (NĐ 30/2020)</p>
              <ul className="space-y-1">
                {[
                  'Cấu trúc: Quốc hiệu, Tiêu ngữ, Tên cơ quan',
                  'Số ký hiệu: [số]/[loại]-[mã đơn vị]',
                  'Địa danh và ngày ban hành đầy đủ',
                  'Tên loại văn bản viết hoa, in đậm',
                  'Có chữ ký và họ tên người ký',
                  'Có mục Nơi nhận',
                ].map((rule, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[10px] text-[#565DD9]">
                    <span className="shrink-0 mt-0.5">•</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* === AI CHAT TAB === */}
        {activeTab === 'ai' && (
          <div className="flex flex-col h-full p-5 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-4 bg-[#565DD9] rounded-full" />
                <h3 className="text-xs font-semibold text-[#252B37] uppercase tracking-wide">Gợi ý cải thiện</h3>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {AI_SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setAiChat(s)}
                    className="text-left h-auto py-2 px-3 rounded-lg border border-[#E9EAEB] text-[10px] text-[#535862] hover:bg-[#F4F4F5] hover:border-[#BBC7FB] transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat history */}
            {chatHistory.length > 0 && (
              <div className="space-y-2.5 max-h-64 overflow-y-auto">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold ${
                      msg.role === 'user' ? 'bg-[#30307D] text-white' : 'bg-[#E9EAEB] text-[#535862]'
                    }`}>
                      {msg.role === 'user' ? 'U' : 'AI'}
                    </div>
                    <div className={`max-w-[80%] px-3 py-2 rounded-xl text-[11px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#30307D] text-white rounded-tr-none'
                        : 'bg-[#F4F4F5] text-[#252B37] rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isAiReplying && (
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#E9EAEB] text-[#535862] flex items-center justify-center text-[9px] font-bold shrink-0">AI</div>
                    <div className="px-3 py-2 bg-[#F4F4F5] rounded-xl rounded-tl-none">
                      <div className="flex gap-1">
                        {[0, 1, 2].map(i => (
                          <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#717680] animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Chat input */}
            <div className="flex gap-2">
              <input
                value={aiChat}
                onChange={e => setAiChat(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleAiChat()}
                placeholder="Nhập yêu cầu cải thiện…"
                className="flex-1 h-9 px-3 border border-[#D5D7DA] rounded-lg text-xs text-[#252B37] placeholder:text-[#A4A7AE] outline-none focus:border-[#778BED] focus:ring-2 focus:ring-[#EBEEFF] transition-all"
              />
              <button
                onClick={handleAiChat}
                disabled={!aiChat.trim() || isAiReplying}
                className="h-9 px-3 bg-[#30307D] hover:bg-[#383A9E] text-white rounded-lg text-xs font-semibold transition-colors disabled:opacity-40"
              >
                Gửi
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-[#E9EAEB] p-4 space-y-2">
        <div className="flex gap-2">
          <button
            onClick={onBack}
            className="h-10 px-3 rounded-lg border border-[#D5D7DA] text-xs font-semibold text-[#535862] hover:bg-[#E9EAEB] transition-colors"
          >
            ← Quay lại
          </button>
          <button
            onClick={() => onExport('docx')}
            className="flex-1 h-10 bg-[#565DD9] hover:bg-[#414CC6] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <Download size={13} />
            Xuất Word
          </button>
          <button
            onClick={() => onExport('pdf')}
            className="flex-1 h-10 bg-[#30307D] hover:bg-[#383A9E] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <Download size={13} />
            Xuất PDF
          </button>
        </div>
        {complianceStatus !== 'passed' && (
          <button
            onClick={() => setActiveTab('compliance')}
            className="w-full h-9 rounded-lg border border-[#BBC7FB] bg-[#F5F6FF] text-[#414CC6] text-xs font-medium hover:bg-[#EBEEFF] transition-colors flex items-center justify-center gap-1.5"
          >
            <Shield size={12} />
            Kiểm tra chuẩn NĐ 30 trước khi xuất
          </button>
        )}
      </div>
    </div>
  );
}
