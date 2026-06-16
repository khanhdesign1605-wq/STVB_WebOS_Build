# Web Document Editor — System Architecture

> Hệ thống soạn thảo văn bản hành chính trực tuyến, tuân thủ Nghị định 30/2020/NĐ-CP của Chính phủ Việt Nam.

---

## 1. Tổng quan hệ thống

```
┌─────────────────────────────────────────────────────────────────┐
│                        WEB BROWSER (Client)                     │
│                                                                 │
│   ┌──────────────┐   ┌──────────────┐   ┌──────────────────┐   │
│   │  Document    │   │  Form Panel  │   │  AI Content      │   │
│   │  Preview     │   │  (Settings)  │   │  Generation      │   │
│   │  (LeftPane) │   │  (Right Pane)│   │  (Step 2 & 3)    │   │
│   └──────────────┘   └──────────────┘   └──────────────────┘   │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │               3-Step Wizard UI                          │   │
│   │   Step 1: Thiết lập ban đầu                            │   │
│   │   Step 2: Tạo nội dung AI                              │   │
│   │   Step 3: Tinh chỉnh AI                                │   │
│   └─────────────────────────────────────────────────────────┘   │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTPS / REST API / WebSocket
┌──────────────────────────▼──────────────────────────────────────┐
│                        BACKEND SERVER                           │
│                                                                 │
│   ┌──────────────┐   ┌──────────────┐   ┌──────────────────┐   │
│   │  Document    │   │  Template    │   │  AI Service      │   │
│   │  Service     │   │  Engine      │   │  (LLM Gateway)   │   │
│   └──────────────┘   └──────────────┘   └──────────────────┘   │
│                                                                 │
│   ┌──────────────┐   ┌──────────────┐   ┌──────────────────┐   │
│   │  Auth &      │   │  Export      │   │  Compliance      │   │
│   │  Permission  │   │  Service     │   │  Validator       │   │
│   └──────────────┘   └──────────────┘   └──────────────────┘   │
└──────────────────────────┬──────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                     DATA LAYER                                  │
│                                                                 │
│   ┌──────────────┐   ┌──────────────┐   ┌──────────────────┐   │
│   │  Document DB │   │  Template DB │   │  User & Org DB   │   │
│   │  (MongoDB /  │   │  (NĐ30 mẫu) │   │  (PostgreSQL)    │   │
│   │   PostgreSQL)│   │             │   │                  │   │
│   └──────────────┘   └──────────────┘   └──────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Các tính năng chính

### 2.1 Thiết lập ban đầu (Step 1)

| Tính năng | Mô tả |
|---|---|
| **Chọn mẫu AI** | Lựa chọn template AI tùy chỉnh hoặc dùng mẫu mặc định hệ thống |
| **Hình thức văn bản** | Phân loại theo quy định: Hành chính (NĐ 30/2020), nội bộ, v.v. |
| **Loại văn bản** | Thông báo, Quyết định, Công văn, Tờ trình, Biên bản, v.v. |
| **Tên văn bản** | Tiêu đề định danh để phân biệt trong danh sách lưu trữ |
| **Đơn vị ban hành** | Cơ quan chủ quản, Mã đơn vị, Cơ quan ban hành |
| **Văn bản liên tịch** | Hỗ trợ nhiều đơn vị ký kết cùng một văn bản |
| **Địa danh & Ngày ban hành** | Điền tự động hoặc thủ công theo quy định NĐ30 |

### 2.2 Tạo nội dung AI (Step 2)

| Tính năng | Mô tả |
|---|---|
| **Sinh nội dung tự động** | LLM tạo nội dung văn bản dựa trên loại, tiêu đề và thông tin đơn vị |
| **Prompt tùy chỉnh** | Người dùng nhập yêu cầu chi tiết, AI điền nội dung phù hợp |
| **Mẫu AI tùy chọn** | Chọn phong cách viết, độ trang trọng, cấu trúc nội dung |
| **Preview thời gian thực** | Hiển thị bản xem trước song song trong khi AI tạo nội dung |

### 2.3 Tinh chỉnh AI (Step 3)

| Tính năng | Mô tả |
|---|---|
| **Chỉnh sửa nội dung** | Sửa trực tiếp trên tài liệu hoặc qua giao diện AI chat |
| **Gợi ý cải thiện** | AI phân tích và đề xuất điều chỉnh ngôn từ, cấu trúc |
| **Kiểm tra tuân thủ** | Tự động kiểm tra theo chuẩn NĐ 30/2020 |

### 2.4 Document Preview Engine

- Render preview văn bản hành chính theo đúng định dạng NĐ30 (bố cục hai cột header, con dấu, chữ ký).
- Cập nhật realtime khi người dùng nhập liệu vào form.
- Hỗ trợ zoom, cuộn trang, responsive trên mobile.

### 2.5 Compliance & Validation

- Kiểm tra số hiệu văn bản (định dạng: `01/TB-XXX`).
- Bắt buộc điền đủ trường: cơ quan ban hành, ngày ban hành, địa danh.
- Nút **"Chuẩn Nghị định 30"** — xác nhận văn bản đạt tiêu chuẩn trước khi xuất.

### 2.6 Export & Storage

- Xuất file `.docx` (Word) theo mẫu NĐ30.
- Xuất file `.pdf` để ký số và lưu hành.
- Lưu bản nháp, quản lý phiên bản (version history).
- Danh sách văn bản theo đơn vị / người dùng.

---

## 3. Luồng xử lý chính

```
Người dùng
    │
    ▼
[Chọn loại văn bản & nhập thông tin đơn vị]
    │
    ▼
[Template Engine chọn layout NĐ30 phù hợp]
    │
    ├──► [Preview Engine] ──► Hiển thị bản xem trước
    │
    ▼
[AI Content Generation]
    │  (Gửi: loại văn bản + thông tin đơn vị + prompt người dùng)
    ├──► LLM API (GPT / Claude / Gemini)
    │       └──► Trả về nội dung văn bản
    │
    ▼
[Người dùng tinh chỉnh nội dung]
    │
    ▼
[Compliance Validator] ──► Kiểm tra NĐ30
    │
    ▼
[Export] ──► .docx / .pdf
    │
    ▼
[Lưu vào Document DB]
```

---

## 4. Kiến trúc Frontend

```
Frontend (React / Vue)
├── Layout
│   ├── TopBar          — Điều hướng, nút "Chuẩn NĐ30"
│   ├── LeftPane        — Document Preview (live render)
│   └── RightPane       — Wizard Form Panel
│
├── Wizard Steps
│   ├── Step1Setup      — Form thiết lập ban đầu
│   ├── Step2AIContent  — Giao diện tạo nội dung AI
│   └── Step3Refine     — Tinh chỉnh & kiểm tra
│
├── Components
│   ├── DocumentPreview — Render bản xem trước theo chuẩn NĐ30
│   ├── AITemplateSelect — Dropdown chọn mẫu AI
│   ├── OrgInfoForm     — Form đơn vị ban hành
│   ├── DocumentTypeSelect — Loại văn bản
│   └── ComplianceBadge — Hiển thị trạng thái NĐ30
│
└── State Management
    ├── documentStore   — Nội dung và metadata văn bản
    ├── uiStore         — Trạng thái wizard, loading
    └── aiStore         — Kết quả và lịch sử AI generation
```

---

## 5. Kiến trúc Backend

```
Backend Services
├── API Gateway         — Rate limiting, Auth, Routing
│
├── Document Service
│   ├── CRUD văn bản
│   ├── Version history
│   └── Search & filter theo đơn vị
│
├── Template Engine
│   ├── Thư viện mẫu NĐ30 (THÔNG BÁO, QUYẾT ĐỊNH, CÔNG VĂN, ...)
│   ├── Render layout: header, footer, số hiệu, ký tên
│   └── Mẫu liên tịch (nhiều đơn vị)
│
├── AI Service (LLM Gateway)
│   ├── Prompt builder  — Ghép thông tin đơn vị + loại văn bản + yêu cầu
│   ├── LLM Connector   — Kết nối GPT / Claude / Gemini
│   ├── Response parser — Trích xuất nội dung từ kết quả AI
│   └── Custom template — Mẫu AI do người dùng tạo
│
├── Compliance Validator
│   ├── NĐ30 rule engine — Kiểm tra bố cục, trường bắt buộc
│   ├── Số hiệu văn bản  — Validate định dạng
│   └── Báo lỗi chi tiết
│
├── Export Service
│   ├── DOCX generator  — docx.js / LibreOffice
│   └── PDF renderer    — LibreOffice / WeasyPrint
│
└── Auth & Permission
    ├── JWT / OAuth2
    ├── Phân quyền theo đơn vị (cơ quan chủ quản → cơ quan ban hành)
    └── Quản lý người dùng & vai trò
```

---

## 6. Data Model chính

### Document
```json
{
  "id": "uuid",
  "title": "Thông báo nghỉ lễ Tết 2026",
  "type": "THÔNG BÁO",
  "form": "Hành chính (NĐ 30/2020)",
  "number": "01/TB-XXX",
  "issuingOrg": {
    "parentOrg": "UBND TỈNH ABC",
    "unitCode": "SNV",
    "issuingUnit": "SỞ NỘI VỤ"
  },
  "location": "Hà Nội",
  "issuedDate": "2026-04-15",
  "isJointDocument": false,
  "content": "...",
  "aiTemplate": "Mẫu mặc định của hệ thống",
  "status": "draft | published | archived",
  "complianceStatus": "passed | failed | pending",
  "createdBy": "user_id",
  "createdAt": "ISO8601",
  "version": 1
}
```

---

## 7. Tuân thủ Nghị định 30/2020/NĐ-CP

Hệ thống được thiết kế theo đúng quy định của **Nghị định 30/2020/NĐ-CP về công tác văn thư**:

- Cấu trúc văn bản: Quốc hiệu - Tiêu ngữ, Tên cơ quan, Số ký hiệu, Địa danh - Ngày tháng, Tên loại và trích yếu, Nội dung, Chữ ký - Họ tên - Con dấu.
- Quy tắc đánh số văn bản: `[số thứ tự]/[loại]-[mã đơn vị]`.
- Phân loại văn bản hành chính đầy đủ: Thông báo, Quyết định, Công văn, Tờ trình, Biên bản, Báo cáo, v.v.
- Hỗ trợ văn bản liên tịch (nhiều cơ quan cùng ký).
- Cảnh báo: *"AI có thể mắc sai sót. Hãy kiểm tra lại thông tin quan trọng."*

---

*Tài liệu này mô tả kiến trúc tổng thể của hệ thống Web Document Editor dành cho văn bản hành chính Việt Nam.*
