import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, RefreshCw, ChevronRight, Wand2, AlertTriangle } from 'lucide-react';
import { DocumentData } from '../types/document';

interface Step2AIContentProps {
  doc: DocumentData;
  updateDoc: (updates: Partial<DocumentData>) => void;
  onNext: () => void;
  onBack: () => void;
  isGenerating: boolean;
  setIsGenerating: (v: boolean) => void;
}

function generateMockContent(doc: DocumentData): string {
  const today = doc.issuedDate || new Date().toISOString().split('T')[0];
  const unit = doc.issuingUnit || 'đơn vị';
  const name = doc.docName || 'nội dung văn bản';
  const org = doc.parentOrg || '';

  const templates: Record<string, string> = {
    'THÔNG BÁO': `Căn cứ chức năng, nhiệm vụ và quyền hạn của ${unit};
Căn cứ Nghị định 30/2020/NĐ-CP ngày 05/3/2020 của Chính phủ về công tác văn thư;
Xét tình hình thực tế và yêu cầu công tác,

${unit} thông báo:

I. NỘI DUNG

${doc.aiPrompt
  ? `1. ${doc.aiPrompt}`
  : `1. ${name.charAt(0).toUpperCase() + name.slice(1)}.

2. Các đơn vị, cá nhân liên quan nghiêm túc thực hiện nội dung Thông báo này.

3. Trong quá trình thực hiện, nếu có vướng mắc, đề nghị phản ánh kịp thời về ${unit} để được xem xét, giải quyết.`}

II. TỔ CHỨC THỰC HIỆN

${unit} yêu cầu các đơn vị, cá nhân liên quan nghiêm túc thực hiện. Mọi thắc mắc liên hệ phòng Văn thư – Hành chính để được hướng dẫn.

Thông báo này có hiệu lực kể từ ngày ký.`,

    'QUYẾT ĐỊNH': `Căn cứ Luật Tổ chức chính quyền địa phương năm 2015;
Căn cứ Nghị định 30/2020/NĐ-CP ngày 05/3/2020 của Chính phủ về công tác văn thư;
${org ? `Căn cứ chức năng, nhiệm vụ của ${org};` : ''}
Xét đề nghị của các đơn vị liên quan,

QUYẾT ĐỊNH:

Điều 1. ${name.charAt(0).toUpperCase() + name.slice(1)}.

${doc.aiPrompt ? doc.aiPrompt : `Các nội dung cụ thể được quy định chi tiết tại phụ lục đính kèm Quyết định này.`}

Điều 2. Các đơn vị và cá nhân có liên quan chịu trách nhiệm thi hành Quyết định này.

Điều 3. Quyết định này có hiệu lực kể từ ngày ký.

Điều 4. ${unit} và các phòng ban chuyên môn có trách nhiệm đôn đốc, kiểm tra việc thực hiện Quyết định này.`,

    'CÔNG VĂN': `Thực hiện chức năng, nhiệm vụ được giao, ${unit} trân trọng kính gửi đến Quý cơ quan một số nội dung sau:

${doc.aiPrompt
  ? doc.aiPrompt
  : `1. Về ${name}:

Căn cứ tình hình thực tế, ${unit} nhận thấy việc triển khai ${name} là cần thiết và cấp bách nhằm đảm bảo tiến độ công tác theo kế hoạch đề ra.

2. Đề xuất, kiến nghị:

${unit} kính đề nghị Quý cơ quan xem xét, giải quyết theo đúng quy định hiện hành.`}

Trân trọng./.`,

    'TỜ TRÌNH': `Căn cứ chức năng, nhiệm vụ của ${unit};
Căn cứ nhu cầu thực tế và kế hoạch công tác năm ${new Date().getFullYear()},

${unit} kính trình:

I. SỰ CẦN THIẾT

${doc.aiPrompt || `Việc thực hiện ${name} là cần thiết nhằm đảm bảo hoạt động bình thường và nâng cao hiệu quả công tác của đơn vị.`}

II. NỘI DUNG ĐỀ NGHỊ

1. ${name.charAt(0).toUpperCase() + name.slice(1)}.
2. Đảm bảo nguồn kinh phí theo quy định.
3. Các điều kiện cần thiết khác.

III. KIẾN NGHỊ

Kính đề nghị lãnh đạo xem xét, phê duyệt để ${unit} triển khai thực hiện.`,

    'BIÊN BẢN': `Hôm nay, vào lúc ............, ngày ${today.split('-').reverse().join('/')},
tại ${doc.location || 'trụ sở cơ quan'},

Chúng tôi gồm:
- Đại diện ${unit}: ............................................
- Đại diện các bên liên quan: ..............................

ĐÃ TIẾN HÀNH LẬP BIÊN BẢN VỀ VIỆC: ${name}

I. NỘI DUNG LÀM VIỆC

${doc.aiPrompt || `Các bên đã thống nhất các nội dung sau:\n\n1. ........................................\n2. ........................................\n3. ........................................`}

II. KẾT LUẬN VÀ CAM KẾT

Các bên đồng ý với nội dung biên bản này và cam kết thực hiện đầy đủ.

Biên bản được lập thành 02 bản, mỗi bên giữ 01 bản.`,

    'BÁO CÁO': `Căn cứ chức năng, nhiệm vụ được giao;
Thực hiện Kế hoạch công tác năm ${new Date().getFullYear()},

${unit} báo cáo kết quả thực hiện ${name} như sau:

I. KẾT QUẢ ĐẠT ĐƯỢC

${doc.aiPrompt || `1. Về công tác triển khai: Đơn vị đã hoàn thành ...\n\n2. Về chất lượng thực hiện: Đạt yêu cầu đề ra...\n\n3. Về tiến độ: Đảm bảo đúng kế hoạch...`}

II. TỒN TẠI, HẠN CHẾ

1. Còn một số khó khăn trong quá trình triển khai...
2. Nguồn lực còn hạn chế...

III. PHƯƠNG HƯỚNG, NHIỆM VỤ TIẾP THEO

1. Tiếp tục triển khai theo kế hoạch đề ra.
2. Khắc phục các tồn tại, hạn chế.
3. Báo cáo kịp thời kết quả thực hiện.`,
  };

  return templates[doc.docType] || templates['THÔNG BÁO'];
}

const PROMPT_SUGGESTIONS = [
  'Thông báo lịch nghỉ lễ và yêu cầu bàn giao công việc trước kỳ nghỉ',
  'Phê duyệt kế hoạch tổ chức sự kiện quý III năm 2026',
  'Đề nghị cung cấp thêm hồ sơ, tài liệu liên quan đến dự án',
  'Báo cáo tiến độ triển khai chuyển đổi số giai đoạn 2025–2026',
  'Quy định về thời gian và quy trình nộp báo cáo định kỳ',
];

export default function Step2AIContent({
  doc, updateDoc, onNext, onBack, isGenerating, setIsGenerating
}: Step2AIContentProps) {
  const [progress, setProgress] = useState(0);
  const [streamedContent, setStreamedContent] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleGenerate = () => {
    if (isGenerating) return;

    setIsGenerating(true);
    setProgress(0);
    setStreamedContent('');
    updateDoc({ content: '' });

    const fullContent = generateMockContent(doc);
    const chars = fullContent.split('');
    let idx = 0;

    const totalDuration = 2800;
    const tickRate = 20;
    const charsPerTick = Math.ceil(chars.length / (totalDuration / tickRate));

    intervalRef.current = setInterval(() => {
      idx = Math.min(idx + charsPerTick, chars.length);
      const current = fullContent.slice(0, idx);
      setStreamedContent(current);
      setProgress(Math.round((idx / chars.length) * 100));

      if (idx >= chars.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        updateDoc({ content: fullContent });
        setIsGenerating(false);
        setProgress(100);
      }
    }, tickRate);
  };

  const displayContent = isGenerating ? streamedContent : doc.content;
  const hasContent = Boolean(displayContent);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-5 space-y-4">

        {/* Summary of step 1 */}
        <div className="bg-[#FAFBFF] border border-[#D7E2FE] rounded-xl p-3.5">
          <p className="text-[10px] font-semibold text-[#414CC6] uppercase tracking-wide mb-2">Thông tin văn bản</p>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-[#717680]">Loại</span>
              <span className="font-semibold text-[#252B37]">{doc.docType}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-[#717680]">Tên</span>
              <span className="font-medium text-[#252B37] text-right max-w-[200px] truncate">{doc.docName || '—'}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-[#717680]">Đơn vị ban hành</span>
              <span className="font-medium text-[#252B37] text-right max-w-[200px] truncate">{doc.issuingUnit || '—'}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-[#717680]">Mẫu AI</span>
              <span className="font-medium text-[#252B37]">
                {doc.aiTemplate === 'default' ? 'Mẫu mặc định' : doc.aiTemplate}
              </span>
            </div>
          </div>
        </div>

        {/* Prompt */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-4 bg-[#565DD9] rounded-full" />
            <h3 className="text-xs font-semibold text-[#252B37] uppercase tracking-wide">Yêu cầu tạo nội dung</h3>
          </div>
          <textarea
            value={doc.aiPrompt}
            onChange={e => updateDoc({ aiPrompt: e.target.value })}
            placeholder="Mô tả chi tiết nội dung bạn muốn AI tạo ra…&#10;&#10;vd: Thông báo nghỉ lễ Quốc khánh 2/9/2026, từ ngày 01/9 đến 04/9/2026. Nhắc nhở nhân viên bàn giao công việc trước khi nghỉ."
            rows={4}
            className="w-full px-3 py-2.5 border border-[#D5D7DA] rounded-lg text-xs text-[#252B37] placeholder:text-[#A4A7AE] outline-none focus:border-[#778BED] focus:ring-2 focus:ring-[#EBEEFF] transition-all resize-none"
          />

          {/* Prompt suggestions */}
          <div className="mt-2">
            <p className="text-[10px] text-[#717680] mb-1.5">Gợi ý nhanh:</p>
            <div className="flex flex-wrap gap-1.5">
              {PROMPT_SUGGESTIONS.slice(0, 3).map(s => (
                <button
                  key={s}
                  onClick={() => updateDoc({ aiPrompt: s })}
                  className="inline-flex items-center h-6 px-2.5 rounded-full border border-[#BBC7FB] bg-[#F5F6FF] text-[#414CC6] text-[10px] hover:bg-[#EBEEFF] transition-colors"
                >
                  {s.length > 40 ? s.slice(0, 40) + '…' : s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className={`w-full h-11 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
            isGenerating
              ? 'bg-[#E9EAEB] text-[#A4A7AE] cursor-not-allowed'
              : 'bg-gradient-to-r from-[#414CC6] to-[#565DD9] hover:from-[#30307D] hover:to-[#414CC6] text-white shadow-md shadow-[#414CC6]/25'
          }`}
        >
          {isGenerating ? (
            <>
              <RefreshCw size={15} className="animate-spin" />
              Đang tạo nội dung… {progress}%
            </>
          ) : (
            <>
              <Sparkles size={15} />
              {hasContent ? 'Tạo lại nội dung' : 'Tạo nội dung với AI'}
            </>
          )}
        </button>

        {/* Progress bar */}
        {isGenerating && (
          <div className="h-1.5 bg-[#E9EAEB] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#414CC6] to-[#778BED] rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Generated content */}
        {(hasContent || isGenerating) && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-[#039855] rounded-full" />
                <h3 className="text-xs font-semibold text-[#252B37] uppercase tracking-wide">Nội dung đã tạo</h3>
              </div>
              {!isGenerating && hasContent && (
                <span className="inline-flex items-center gap-1 h-5 px-2 bg-[#D1FADF] text-[#027A48] rounded-full text-[10px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
                  Hoàn thành
                </span>
              )}
            </div>
            <div className="relative">
              <textarea
                ref={contentRef}
                value={displayContent}
                onChange={e => updateDoc({ content: e.target.value })}
                rows={14}
                readOnly={isGenerating}
                className="w-full px-3 py-2.5 border border-[#D5D7DA] rounded-lg text-xs text-[#252B37] outline-none focus:border-[#778BED] focus:ring-2 focus:ring-[#EBEEFF] transition-all resize-none font-mono leading-relaxed"
                style={{ fontFamily: 'inherit' }}
              />
              {isGenerating && (
                <div className="absolute bottom-3 right-3">
                  <Wand2 size={14} className="text-[#565DD9] animate-pulse" />
                </div>
              )}
            </div>
            <p className="text-[10px] text-[#717680] mt-1.5">
              Bạn có thể chỉnh sửa trực tiếp nội dung trên. Tinh chỉnh sâu hơn ở Bước 3.
            </p>
          </div>
        )}

        {/* AI disclaimer */}
        <div className="flex gap-2 p-3 bg-[#FFFAEB] rounded-xl border border-[#FEDF89]">
          <AlertTriangle size={13} className="text-[#DC6803] shrink-0 mt-0.5" />
          <p className="text-[10px] text-[#DC6803] leading-relaxed">
            <strong>Lưu ý:</strong> AI có thể mắc sai sót. Hãy kiểm tra lại thông tin quan trọng trước khi ban hành văn bản.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#E9EAEB] p-4 flex gap-2.5">
        <button
          onClick={onBack}
          className="h-10 px-4 rounded-lg border border-[#D5D7DA] text-xs font-semibold text-[#535862] hover:bg-[#E9EAEB] transition-colors"
        >
          ← Quay lại
        </button>
        <button
          onClick={onNext}
          disabled={!hasContent || isGenerating}
          className="flex-1 h-10 bg-[#30307D] hover:bg-[#383A9E] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Tiếp theo → Tinh chỉnh
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
