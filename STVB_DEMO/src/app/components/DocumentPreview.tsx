import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { DocumentData } from '../types/document';

// ─── A4 page constants (px at screen resolution) ─────────────────────────────
const PAGE_W     = 794;
const PAGE_H     = 1123;
const PAD_TOP    = 96;
const PAD_BOTTOM = 80;
const PAD_LEFT   = 114;
const PAD_RIGHT  = 96;
const INNER_W    = PAGE_W - PAD_LEFT - PAD_RIGHT; // 584 px
const INNER_H    = PAGE_H - PAD_TOP  - PAD_BOTTOM; // 947 px
const PAGE_GAP   = 24; // gap between pages in px
// ─────────────────────────────────────────────────────────────────────────────

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  if (!dateStr) return 'ngày ... tháng ... năm ...';
  const d = new Date(dateStr + 'T00:00:00');
  return `ngày ${String(d.getDate()).padStart(2, '0')} tháng ${String(d.getMonth() + 1).padStart(2, '0')} năm ${d.getFullYear()}`;
}

function getDocAbbr(docType: string): string {
  const map: Record<string, string> = {
    'THÔNG BÁO': 'TB', 'QUYẾT ĐỊNH': 'QĐ', 'CÔNG VĂN': 'CV',
    'TỜ TRÌNH':  'TTr', 'BIÊN BẢN':  'BB',  'BÁO CÁO': 'BC',
    'KẾ HOẠCH':  'KH',  'QUY CHẾ':   'QC',  'HƯỚNG DẪN': 'HD',
  };
  return map[docType] || 'VB';
}

// ─── Section type ─────────────────────────────────────────────────────────────
type SectionKind =
  | 'header'
  | 'number-date'
  | 'doctype'
  | 'subtitle'
  | 'kinhgui'
  | 'content-block'
  | 'content-placeholder'
  | 'footer';

interface DocSection {
  id: string;
  kind: SectionKind;
  lines?: string[];   // content-block only
  isLast?: boolean;   // content-block only — adds more bottom padding
}

// ─── Build sections from doc data ────────────────────────────────────────────
function buildSections(doc: DocumentData): DocSection[] {
  const secs: DocSection[] = [];

  secs.push({ id: 'header',       kind: 'header' });
  secs.push({ id: 'number-date',  kind: 'number-date' });
  secs.push({ id: 'doctype',      kind: 'doctype' });
  secs.push({ id: 'subtitle',     kind: 'subtitle' });

  if (doc.docType === 'CÔNG VĂN') {
    secs.push({ id: 'kinhgui', kind: 'kinhgui' });
  }

  // ── Group content lines into logical blocks ──────────────────────────────
  // A new block starts on: (a) a blank line, or (b) a heading line
  const HEADING_RE = /^(Điều\s+\d+|Khoản\s+\d+|Căn\s+cứ|Xét\s|QUYẾT\s+ĐỊNH|NỘI\s+DUNG|I\.\s|II\.\s|III\.\s|IV\.\s)/i;
  const rawLines = doc.content ? doc.content.split('\n') : [];
  const blocks: string[][] = [];
  let cur: string[] = [];

  for (const line of rawLines) {
    const trimmed = line.trim();
    if (trimmed === '') {
      if (cur.length) { blocks.push(cur); cur = []; }
    } else if (HEADING_RE.test(trimmed) && cur.length) {
      // heading starts a new section
      blocks.push(cur);
      cur = [line];
    } else {
      cur.push(line);
    }
  }
  if (cur.length) blocks.push(cur);

  if (blocks.length === 0) {
    secs.push({ id: 'content-placeholder', kind: 'content-placeholder' });
  } else {
    blocks.forEach((lines, i) => {
      secs.push({
        id:     `content-${i}`,
        kind:   'content-block',
        lines,
        isLast: i === blocks.length - 1,
      });
    });
  }

  secs.push({ id: 'footer', kind: 'footer' });
  return secs;
}

// ─── Shared style shorthands ─────────────────────────────────────────────────
const PH: React.CSSProperties = { color: '#A4A7AE', fontStyle: 'italic' };
const BLD: React.CSSProperties = { fontWeight: 700 };
const BASE_FONT: React.CSSProperties = {
  fontFamily: "'Times New Roman', Times, serif",
  fontSize:   '13pt',
  lineHeight: '1.6',
  color:      '#000',
};

// ─── Individual section renderers ─────────────────────────────────────────────
// Each renderer is wrapped externally in an `overflow:hidden` div (BFC),
// which properly captures child margins in scrollHeight.
// Bottom spacing is managed via paddingBottom on the outermost element.

function HeaderSec({ doc }: { doc: DocumentData }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', paddingBottom: '4px' }}>
      <div style={{ textAlign: 'center', paddingRight: '8px' }}>
        {doc.parentOrg
          ? <p style={{ ...BLD, textTransform: 'uppercase', fontSize: '12pt', margin: 0, lineHeight: '1.5' }}>{doc.parentOrg}</p>
          : <p style={{ ...PH, fontSize: '12pt', margin: 0, lineHeight: '1.5' }}>[Tên cơ quan chủ quản]</p>}
        {doc.issuingUnit
          ? <p style={{ ...BLD, textTransform: 'uppercase', fontSize: '12pt', margin: 0, lineHeight: '1.5' }}>{doc.issuingUnit}</p>
          : <p style={{ ...PH, fontSize: '12pt', margin: 0, lineHeight: '1.5' }}>[Tên đơn vị ban hành]</p>}
        <div style={{ width: '60%', height: 2, background: '#000', margin: '4px auto 0' }} />
      </div>
      <div style={{ textAlign: 'center', paddingLeft: '8px' }}>
        <p style={{ ...BLD, textTransform: 'uppercase', fontSize: '13pt', margin: 0, lineHeight: '1.5' }}>
          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
        </p>
        <p style={{ ...BLD, fontSize: '13pt', margin: 0, lineHeight: '1.5' }}>
          Độc lập – Tự do – Hạnh phúc
        </p>
        <div style={{ width: '60%', height: 2, background: '#000', margin: '4px auto 0' }} />
      </div>
    </div>
  );
}

function NumberDateSec({ doc }: { doc: DocumentData }) {
  const abbr    = getDocAbbr(doc.docType);
  const unit    = doc.unitCode || 'XXX';
  const numDisp = doc.docNumber ? `${doc.docNumber}/${abbr}-${unit}` : `.../${abbr}-${unit}`;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', paddingTop: '16px', paddingBottom: '24px' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '13pt', margin: 0 }}>
          {'Số: '}
          <span style={{ fontStyle: doc.docNumber ? 'normal' : 'italic', color: doc.docNumber ? '#000' : '#A4A7AE' }}>
            {numDisp}
          </span>
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '13pt', margin: 0, fontStyle: 'italic' }}>
          {doc.location || 'Hà Nội'}, {formatDate(doc.issuedDate)}
        </p>
      </div>
    </div>
  );
}

function DocTypeSec({ doc }: { doc: DocumentData }) {
  return (
    <div style={{ textAlign: 'center', paddingBottom: '4px' }}>
      <p style={{ ...BLD, fontSize: '14pt', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
        {doc.docType || 'THÔNG BÁO'}
      </p>
    </div>
  );
}

function SubtitleSec({ doc }: { doc: DocumentData }) {
  return (
    <div style={{ textAlign: 'center', paddingBottom: '24px' }}>
      {doc.docName ? (
        <>
          <p style={{ fontSize: '13pt', margin: '0 0 2px', fontStyle: 'italic' }}>
            {doc.docType === 'CÔNG VĂN' ? 'V/v' : 'về việc'}{' '}{doc.docName.toLowerCase()}
          </p>
          <div style={{ width: '40%', height: 1, background: '#000', margin: '4px auto 0' }} />
        </>
      ) : (
        <p style={{ ...PH, fontSize: '13pt', margin: 0 }}>[Trích yếu nội dung văn bản]</p>
      )}
    </div>
  );
}

function KinhGuiSec() {
  return (
    <div style={{ paddingBottom: '16px' }}>
      <p style={{ margin: 0 }}>
        <span style={BLD}>Kính gửi:</span>{' '}
        <span style={PH}>[Tên cơ quan / đơn vị nhận]</span>
      </p>
    </div>
  );
}

function ContentBlockSec({ lines, isLast }: { lines: string[]; isLast?: boolean }) {
  return (
    <div style={{ paddingBottom: isLast ? '40px' : '12px' }}>
      {lines.map((line, i) => {
        const trimmed  = line.trim();
        const isEmpty  = trimmed === '';
        const isHead   = /^(Điều\s+\d+|Khoản\s+\d+|Căn\s+cứ|Xét\s|QUYẾT\s+ĐỊNH|NỘI\s+DUNG|I\.\s|II\.\s|III\.\s)/i.test(trimmed);
        const isBullet = trimmed.startsWith('-') || trimmed.startsWith('•');
        return (
          <p
            key={i}
            style={{
              margin:     isEmpty ? '8px 0' : '0 0 4px',
              minHeight:  isEmpty ? '8px' : undefined,
              textIndent: (!isEmpty && !isHead && !isBullet) ? '2em' : 0,
              fontWeight: isHead ? 600 : 400,
            }}
          >
            {line}
          </p>
        );
      })}
    </div>
  );
}

function ContentPlaceholderSec() {
  return (
    <div style={{ ...PH, lineHeight: '2', paddingBottom: '40px' }}>
      <p style={{ textIndent: '2em', margin: '0 0 4px' }}>
        [Nội dung văn bản sẽ hiển thị tại đây sau khi được tạo bởi AI hoặc nhập thủ công.]
      </p>
      <p style={{ textIndent: '2em', margin: 0 }}>
        Vui lòng hoàn thành Bước 1 và chuyển sang Bước 2 để tạo nội dung.
      </p>
    </div>
  );
}

function FooterSec({ doc }: { doc: DocumentData }) {
  const hasRecipients = !!doc.recipients;
  const recipientLines = (doc.recipients || '- Như trên;\n- Lưu: VT.').split('\n');
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', paddingTop: '40px' }}>
      {/* Nơi nhận */}
      <div>
        <p style={{ ...BLD, fontSize: '13pt', margin: '0 0 4px' }}>Nơi nhận:</p>
        {recipientLines.map((ln, i) => (
          <p key={i} style={{ margin: '0 0 2px', fontSize: '12pt', ...(hasRecipients ? {} : PH) }}>
            {ln}
          </p>
        ))}
      </div>

      {/* Chữ ký */}
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontStyle: 'italic', margin: '0 0 4px', fontSize: '13pt' }}>
          {doc.location || 'Hà Nội'},{' '}
          {doc.issuedDate ? formatDate(doc.issuedDate) : 'ngày ... tháng ... năm ...'}
        </p>
        {doc.signerTitle
          ? <p style={{ ...BLD, textTransform: 'uppercase', fontSize: '13pt', margin: '0 0 2px' }}>{doc.signerTitle}</p>
          : <p style={{ ...PH, fontSize: '13pt', margin: '0 0 2px' }}>[CHỨC DANH NGƯỜI KÝ]</p>}
        <p style={{ fontStyle: 'italic', fontSize: '12pt', margin: '0 0 56px', color: '#535862' }}>
          (Ký, đóng dấu)
        </p>
        {doc.signerName
          ? <p style={{ ...BLD, fontSize: '13pt', margin: 0 }}>{doc.signerName}</p>
          : <p style={{ ...PH, fontSize: '13pt', margin: 0 }}>[Họ và tên người ký]</p>}
      </div>
    </div>
  );
}

// ─── Section renderer dispatcher ─────────────────────────────────────────────
function SectionContent({ section, doc }: { section: DocSection; doc: DocumentData }) {
  switch (section.kind) {
    case 'header':               return <HeaderSec doc={doc} />;
    case 'number-date':          return <NumberDateSec doc={doc} />;
    case 'doctype':              return <DocTypeSec doc={doc} />;
    case 'subtitle':             return <SubtitleSec doc={doc} />;
    case 'kinhgui':              return <KinhGuiSec />;
    case 'content-block':        return <ContentBlockSec lines={section.lines ?? []} isLast={section.isLast} />;
    case 'content-placeholder':  return <ContentPlaceholderSec />;
    case 'footer':               return <FooterSec doc={doc} />;
  }
}

// ─── Greedy bin-packing: assign sections to pages ────────────────────────────
function packSections(heights: number[]): number[][] {
  // Returns an array of pages; each page is an array of section indices.
  const pages: number[][] = [[]];
  let remaining = INNER_H;

  heights.forEach((h, i) => {
    const sectionH = h + 1; // +1 for sub-pixel safety
    if (sectionH <= remaining || pages[pages.length - 1].length === 0) {
      // fits on current page (or forced — section bigger than whole page)
      pages[pages.length - 1].push(i);
      remaining -= sectionH;
    } else {
      // start a new page
      pages.push([i]);
      remaining = INNER_H - sectionH;
    }
  });

  return pages;
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function DocumentPreview({ doc }: DocumentPreviewProps) {
  const [zoom, setZoom]             = useState(85);
  const [pages, setPages]           = useState<number[][]>([[]]);
  const sections                    = buildSections(doc);
  const measureRefs                 = useRef<(HTMLDivElement | null)[]>([]);

  // Resize observer so measurements refire if the container resizes
  const measure = useCallback(() => {
    const heights = measureRefs.current.map(el => el?.scrollHeight ?? 0);
    if (heights.some(h => h > 0)) {
      setPages(packSections(heights));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    // Re-run whenever the doc (and thus sections) change
    const id = setTimeout(measure, 40);
    return () => clearTimeout(id);
  }, [doc, measure]);

  const scale        = zoom / 100;
  const scaledPageW  = Math.round(PAGE_W * scale);
  const scaledPageH  = Math.round(PAGE_H * scale);
  const scaledGap    = Math.round(PAGE_GAP * scale);

  return (
    <div className="flex flex-col h-full">

      {/* ── Zoom toolbar ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-1 bg-white rounded-lg border border-[#E9EAEB] p-1">
          <button
            onClick={() => setZoom(z => Math.max(z - 10, 40))}
            title="Thu nhỏ"
            className="w-7 h-7 flex items-center justify-center rounded-md text-[#535862] hover:bg-[#E9EAEB] transition-colors"
          >
            <ZoomOut size={14} />
          </button>
          <span className="text-xs text-[#535862] font-medium px-2 min-w-[3rem] text-center">{zoom}%</span>
          <button
            onClick={() => setZoom(z => Math.min(z + 10, 150))}
            title="Phóng to"
            className="w-7 h-7 flex items-center justify-center rounded-md text-[#535862] hover:bg-[#E9EAEB] transition-colors"
          >
            <ZoomIn size={14} />
          </button>
          <div className="w-px h-4 bg-[#E9EAEB] mx-0.5" />
          <button
            onClick={() => setZoom(85)}
            title="Đặt lại"
            className="w-7 h-7 flex items-center justify-center rounded-md text-[#535862] hover:bg-[#E9EAEB] transition-colors"
          >
            <RotateCcw size={13} />
          </button>
        </div>
        <span className="text-xs text-[#717680]">
          Xem trước văn bản (NĐ 30/2020)
          {pages.length > 1 ? ` — ${pages.length} trang` : ''}
        </span>
      </div>

      {/* ── Hidden measurer ──────────────────────────────────────────────── */}
      {/*
        Rendered off-screen at exact INNER_W so measurements match the real pages.
        Each section is wrapped in overflow:hidden to create a BFC — this ensures
        child margins are fully contained and captured by scrollHeight.
      */}
      <div
        aria-hidden="true"
        style={{
          position:  'fixed',
          top:       -9999,
          left:      -9999,
          width:     INNER_W,
          visibility:'hidden',
          pointerEvents: 'none',
          ...BASE_FONT,
        }}
      >
        {sections.map((sec, i) => (
          <div
            key={sec.id}
            ref={el => { measureRefs.current[i] = el; }}
            style={{ overflow: 'hidden' }} // BFC — captures child margins in scrollHeight
          >
            <SectionContent section={sec} doc={doc} />
          </div>
        ))}
      </div>

      {/* ── Scrollable pages ─────────────────────────────────────────────── */}
      <div className="flex-1 overflow-auto">
        <div
          style={{
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            gap:            scaledGap,
            paddingTop:     scaledGap,
            paddingBottom:  scaledGap,
          }}
        >
          {pages.map((sectionIndices, pageIdx) => (
            /*
              Each "slot" takes up the scaled page size in normal flow.
              Inside it, the full-size (unscaled) page is positioned absolutely
              and scaled with transform-origin top-left.
            */
            <div
              key={pageIdx}
              style={{
                position:   'relative',
                width:      scaledPageW,
                height:     scaledPageH,
                flexShrink: 0,
              }}
            >
              {/* Unscaled page */}
              <div
                style={{
                  position:        'absolute',
                  top:             0,
                  left:            0,
                  width:           PAGE_W,
                  height:          PAGE_H,
                  transform:       `scale(${scale})`,
                  transformOrigin: 'top left',
                  background:      '#fff',
                  boxShadow:       '0 2px 20px rgba(0,0,0,0.13), 0 0 0 1px rgba(0,0,0,0.05)',
                  overflow:        'hidden',
                  ...BASE_FONT,
                }}
              >
                {/* Content area — offset by the page's top/left margins */}
                <div
                  style={{
                    position: 'absolute',
                    top:      PAD_TOP,
                    left:     PAD_LEFT,
                    width:    INNER_W,
                    // We don't clip height here — sections are pre-assigned to fit
                  }}
                >
                  {sectionIndices.map(secIdx => (
                    <div
                      key={sections[secIdx].id}
                      style={{ overflow: 'hidden' }} // same BFC wrapper as measurer
                    >
                      <SectionContent section={sections[secIdx]} doc={doc} />
                    </div>
                  ))}
                </div>

                {/* Page number */}
                {pages.length > 1 && (
                  <div
                    style={{
                      position:   'absolute',
                      bottom:     Math.round(PAD_BOTTOM / 2.5),
                      right:      PAD_RIGHT,
                      fontSize:   '9pt',
                      color:      '#C0C0C0',
                      fontFamily: "'Times New Roman', Times, serif",
                      lineHeight: 1,
                    }}
                  >
                    {pageIdx + 1} / {pages.length}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface DocumentPreviewProps {
  doc: DocumentData;
}
