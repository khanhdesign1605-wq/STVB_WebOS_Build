export interface DocumentData {
  // Step 1 – Setup
  aiTemplate: string;
  docForm: string;
  docType: string;
  docName: string;
  parentOrg: string;
  unitCode: string;
  issuingUnit: string;
  isJointDocument: boolean;
  jointOrg: string;
  location: string;
  issuedDate: string;
  docNumber: string;

  // Step 2 – AI Content
  aiPrompt: string;
  content: string;

  // Step 3 – Refine
  signerTitle: string;
  signerName: string;
  recipients: string;
}

export type ComplianceStatus = 'idle' | 'checking' | 'passed' | 'failed';

export interface ComplianceError {
  field: string;
  message: string;
}

export const defaultDocument: DocumentData = {
  aiTemplate: 'default',
  docForm: 'hanh-chinh',
  docType: 'THÔNG BÁO',
  docName: '',
  parentOrg: '',
  unitCode: '',
  issuingUnit: '',
  isJointDocument: false,
  jointOrg: '',
  location: 'Hà Nội',
  issuedDate: new Date().toISOString().split('T')[0],
  docNumber: '',
  aiPrompt: '',
  content: '',
  signerTitle: '',
  signerName: '',
  recipients: '- Như trên;\n- Lưu: VT.',
};

export const DOC_TYPES = [
  'THÔNG BÁO',
  'QUYẾT ĐỊNH',
  'CÔNG VĂN',
  'TỜ TRÌNH',
  'BIÊN BẢN',
  'BÁO CÁO',
  'KẾ HOẠCH',
  'QUY CHẾ',
  'HƯỚNG DẪN',
];

export const DOC_FORMS = [
  { value: 'hanh-chinh', label: 'Hành chính (NĐ 30/2020)' },
  { value: 'noi-bo', label: 'Nội bộ' },
  { value: 'lien-tich', label: 'Liên tịch' },
];

export const AI_TEMPLATES = [
  { value: 'default', label: 'Mẫu mặc định của hệ thống' },
  { value: 'formal', label: 'Trang trọng – Ngắn gọn' },
  { value: 'detailed', label: 'Chi tiết – Đầy đủ luận cứ' },
  { value: 'simple', label: 'Đơn giản – Dễ hiểu' },
];
