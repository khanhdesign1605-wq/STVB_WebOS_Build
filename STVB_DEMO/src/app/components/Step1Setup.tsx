import React from 'react';
import { Info, Plus, Trash2 } from 'lucide-react';
import { DocumentData, DOC_TYPES, DOC_FORMS, AI_TEMPLATES } from '../types/document';

interface Step1SetupProps {
  doc: DocumentData;
  updateDoc: (updates: Partial<DocumentData>) => void;
  onNext: () => void;
}

function FieldLabel({ label, required, hint }: { label: string; required?: boolean; hint?: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-1.5">
      <label className="text-xs font-semibold text-[#252B37]">
        {label}
        {required && <span className="text-[#F04438] ml-0.5">*</span>}
      </label>
      {hint && (
        <div className="relative group">
          <Info size={12} className="text-[#A4A7AE] cursor-help" />
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 w-48 px-2.5 py-1.5 bg-[#181D27] text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-normal">
            {hint}
          </div>
        </div>
      )}
    </div>
  );
}

function InputField({ value, onChange, placeholder, type = 'text' }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-9 px-3 border border-[#D5D7DA] rounded-lg text-xs text-[#252B37] placeholder:text-[#A4A7AE] outline-none focus:border-[#778BED] focus:ring-2 focus:ring-[#EBEEFF] transition-all bg-white"
    />
  );
}

function SelectField({ value, onChange, options }: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full h-9 px-3 border border-[#D5D7DA] rounded-lg text-xs text-[#252B37] outline-none focus:border-[#778BED] focus:ring-2 focus:ring-[#EBEEFF] transition-all bg-white appearance-none cursor-pointer"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23717680' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}

export default function Step1Setup({ doc, updateDoc, onNext }: Step1SetupProps) {
  const isValid = doc.docType && doc.docName && doc.issuingUnit && doc.location && doc.issuedDate;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-5 space-y-5">

        {/* AI Template */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-[#565DD9] rounded-full" />
            <h3 className="text-xs font-semibold text-[#252B37] uppercase tracking-wide">Mẫu AI</h3>
          </div>
          <div className="space-y-2">
            <FieldLabel label="Chọn mẫu AI" />
            <SelectField
              value={doc.aiTemplate}
              onChange={v => updateDoc({ aiTemplate: v })}
              options={AI_TEMPLATES}
            />
            <p className="text-[10px] text-[#717680]">Mẫu AI ảnh hưởng đến phong cách và cấu trúc nội dung được tạo.</p>
          </div>
        </div>

        <div className="border-t border-[#E9EAEB]" />

        {/* Phân loại văn bản */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-[#565DD9] rounded-full" />
            <h3 className="text-xs font-semibold text-[#252B37] uppercase tracking-wide">Phân loại văn bản</h3>
          </div>

          <div className="space-y-3">
            {/* Hình thức */}
            <div>
              <FieldLabel label="Hình thức văn bản" required hint="Xác định khung pháp lý áp dụng cho văn bản" />
              <div className="flex gap-2">
                {DOC_FORMS.map(form => (
                  <button
                    key={form.value}
                    onClick={() => updateDoc({ docForm: form.value })}
                    className={`flex-1 h-8 px-2 rounded-lg border text-[10px] font-medium transition-all ${
                      doc.docForm === form.value
                        ? 'border-[#565DD9] bg-[#EBEEFF] text-[#414CC6]'
                        : 'border-[#D5D7DA] bg-white text-[#535862] hover:bg-[#F4F4F5]'
                    }`}
                  >
                    {form.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Loại văn bản */}
            <div>
              <FieldLabel label="Loại văn bản" required />
              <div className="grid grid-cols-3 gap-1.5">
                {DOC_TYPES.map(type => (
                  <button
                    key={type}
                    onClick={() => updateDoc({ docType: type })}
                    className={`h-8 px-2 rounded-lg border text-[10px] font-medium transition-all ${
                      doc.docType === type
                        ? 'border-[#565DD9] bg-[#EBEEFF] text-[#414CC6]'
                        : 'border-[#D5D7DA] bg-white text-[#535862] hover:bg-[#F4F4F5]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Tên văn bản */}
            <div>
              <FieldLabel
                label="Tên / Trích yếu văn bản"
                required
                hint="Tiêu đề ngắn gọn mô tả nội dung chính của văn bản"
              />
              <InputField
                value={doc.docName}
                onChange={v => updateDoc({ docName: v })}
                placeholder="vd: Thông báo nghỉ lễ Quốc khánh 2/9/2026"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-[#E9EAEB]" />

        {/* Đơn vị ban hành */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-[#565DD9] rounded-full" />
            <h3 className="text-xs font-semibold text-[#252B37] uppercase tracking-wide">Đơn vị ban hành</h3>
          </div>

          <div className="space-y-3">
            <div>
              <FieldLabel
                label="Cơ quan chủ quản"
                hint="Tên cơ quan cấp trên, vd: UBND TỈNH HÀ NỘI"
              />
              <InputField
                value={doc.parentOrg}
                onChange={v => updateDoc({ parentOrg: v })}
                placeholder="vd: UBND TỈNH HÀ NỘI"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <FieldLabel label="Mã đơn vị" hint="vd: SNV, UBND, BTC…" />
                <InputField
                  value={doc.unitCode}
                  onChange={v => updateDoc({ unitCode: v.toUpperCase() })}
                  placeholder="vd: SNV"
                />
              </div>
              <div>
                <FieldLabel label="Số văn bản" />
                <InputField
                  value={doc.docNumber}
                  onChange={v => updateDoc({ docNumber: v })}
                  placeholder="vd: 01"
                />
              </div>
            </div>

            <div>
              <FieldLabel label="Cơ quan / đơn vị ban hành" required />
              <InputField
                value={doc.issuingUnit}
                onChange={v => updateDoc({ issuingUnit: v })}
                placeholder="vd: SỞ NỘI VỤ"
              />
            </div>

            {/* Văn bản liên tịch */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <FieldLabel label="Văn bản liên tịch" hint="Nhiều đơn vị cùng ký một văn bản" />
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={doc.isJointDocument}
                    onChange={e => updateDoc({ isJointDocument: e.target.checked })}
                  />
                  <div className="w-8 h-5 rounded-full bg-[#E9EAEB] peer-checked:bg-[#565DD9] after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-3 transition-colors duration-200" />
                </label>
              </div>
              {doc.isJointDocument && (
                <InputField
                  value={doc.jointOrg}
                  onChange={v => updateDoc({ jointOrg: v })}
                  placeholder="Tên đơn vị liên tịch..."
                />
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-[#E9EAEB]" />

        {/* Địa danh & Ngày */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-[#565DD9] rounded-full" />
            <h3 className="text-xs font-semibold text-[#252B37] uppercase tracking-wide">Địa danh & Ngày ban hành</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <FieldLabel label="Địa danh" required />
              <InputField
                value={doc.location}
                onChange={v => updateDoc({ location: v })}
                placeholder="vd: Hà Nội"
              />
            </div>
            <div>
              <FieldLabel label="Ngày ban hành" required />
              <InputField
                type="date"
                value={doc.issuedDate}
                onChange={v => updateDoc({ issuedDate: v })}
              />
            </div>
          </div>
        </div>

        {/* Info banner */}
        <div className="flex gap-2.5 p-3 bg-[#EBEEFF] rounded-xl border border-[#BBC7FB]">
          <Info size={14} className="text-[#565DD9] shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#414CC6] leading-relaxed">
            Tất cả thông tin trên sẽ được điền tự động vào mẫu văn bản và dùng để AI tạo nội dung phù hợp.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#E9EAEB] p-4">
        <button
          onClick={onNext}
          disabled={!isValid}
          className="w-full h-10 bg-[#30307D] hover:bg-[#383A9E] text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Tiếp theo → Tạo nội dung AI
        </button>
        {!isValid && (
          <p className="text-[10px] text-[#717680] text-center mt-2">
            Vui lòng điền đủ các trường bắt buộc (*)
          </p>
        )}
      </div>
    </div>
  );
}
