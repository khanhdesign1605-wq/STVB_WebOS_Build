# 🧱 Component Library — Style Guide

> Tài liệu mô tả toàn bộ các UI component trong WebOS Design System. Mỗi component bao gồm: variants, props, trạng thái, và code snippet CSS/Tailwind.

---

## Mục lục

1. [Atoms](#1-atoms)
   - [Button](#11-button)
   - [Input](#12-input)
   - [Badge](#13-badge)
   - [Avatar](#14-avatar)
   - [Checkbox & Radio](#15-checkbox--radio)
   - [Toggle / Switch](#16-toggle--switch)
   - [Tooltip](#17-tooltip)
   - [Divider](#18-divider)
2. [Navigation](#2-navigation)
   - [Sidebar](#21-sidebar)
   - [Breadcrumb](#22-breadcrumb)
   - [Tabs](#23-tabs)
   - [Dropdown Menu](#24-dropdown-menu)
3. [Layout](#3-layout)
   - [Card](#31-card)
   - [Modal / Dialog](#32-modal--dialog)
   - [Panel](#33-panel)
   - [Drawer](#34-drawer)
4. [Data Display](#4-data-display)
   - [Table](#41-table)
   - [List](#42-list)
   - [Tree View](#43-tree-view)
   - [Tag / Chip](#44-tag--chip)
5. [Feedback](#5-feedback)
   - [Toast / Notification](#51-toast--notification)
   - [Alert](#52-alert)
   - [Empty State](#53-empty-state)
   - [Skeleton](#54-skeleton)
   - [Progress](#55-progress)

---

## 1. Atoms

### 1.1 Button

Thành phần tương tác cơ bản nhất. Dùng để kích hoạt hành động.

#### Variants

| Variant | Dùng khi | Nền | Chữ |
|---------|---------|-----|-----|
| `primary` | Hành động chính của trang | `action` (`Primary/900`) | White |
| `secondary` | Hành động phụ | `primary-light` (`Primary/100`) | `Primary/900` |
| `ghost` | Hành động ít quan trọng | Transparent | `common-item` |
| `danger` | Hành động hủy / xóa | `Error/600` | White |
| `link` | Điều hướng nội tuyến | Transparent | `Primary/600` |

#### Sizes

| Size | Height | Padding X | Font |
|------|--------|-----------|------|
| `xs` | 28px | 12px | `text-xs` Medium |
| `sm` | 36px | 16px | `text-sm` Medium |
| `md` | 40px | 20px | `text-sm` Semi Bold |
| `lg` | 44px | 24px | `text-md` Semi Bold |
| `xl` | 48px | 28px | `text-md` Bold |

#### States

```
default  →  nền bình thường
hover    →  nền đậm hơn 1 bậc (action-hover)
pressed  →  nền đậm hơn + shadow inset
disabled →  opacity: 40%, pointer-events: none
loading  →  icon spinner thay thế label
```

#### Code — Tailwind

```html
<!-- Primary / md -->
<button class="
  inline-flex items-center justify-center gap-2
  h-10 px-5
  bg-[#30307D] hover:bg-[#383A9E] active:bg-[#30307D]
  text-white text-sm font-semibold
  rounded-lg
  transition-colors duration-150
  disabled:opacity-40 disabled:cursor-not-allowed
">
  Lưu thay đổi
</button>

<!-- Secondary / md -->
<button class="
  inline-flex items-center justify-center gap-2
  h-10 px-5
  bg-[#EBEEFF] hover:bg-[#BBC7FB] active:bg-[#92A8F6]
  text-[#30307D] text-sm font-semibold
  rounded-lg border border-[#D7E2FE]
  transition-colors duration-150
">
  Hủy
</button>

<!-- Danger / md -->
<button class="
  inline-flex items-center justify-center gap-2
  h-10 px-5
  bg-[#D92D20] hover:bg-[#B42318]
  text-white text-sm font-semibold
  rounded-lg
  transition-colors duration-150
">
  Xóa file
</button>
```

---

### 1.2 Input

Trường nhập liệu văn bản. Hỗ trợ prefix/suffix icon, helper text và các trạng thái validate.

#### Variants

| Variant | Mô tả |
|---------|-------|
| `default` | Trường nhập liệu cơ bản |
| `with-prefix-icon` | Icon bên trái (search, user...) |
| `with-suffix-icon` | Icon bên phải (clear, password toggle...) |
| `with-addon` | Text/label gắn liền bên trái hoặc phải |

#### States

| State | Border | Background |
|-------|--------|------------|
| Default | `Neutral/300` | White |
| Focus | `Primary/500` + ring shadow | White |
| Error | `Error/500` + ring shadow | White |
| Disabled | `Neutral/200` | `Neutral/050` |
| Read-only | `Neutral/200` | `Neutral/100` |

#### Anatomy

```
┌─────────────────────────────────────────┐
│  Label *                                │
│ ┌──────────────────────────────────┐    │
│ │ 🔍  Placeholder text          ✕  │    │
│ └──────────────────────────────────┘    │
│  Helper text / Error message            │
└─────────────────────────────────────────┘
```

#### Code — Tailwind

```html
<!-- Default input với label -->
<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium text-[#252B37]">
    Tên workspace <span class="text-[#F04438]">*</span>
  </label>
  <input
    type="text"
    placeholder="Nhập tên workspace..."
    class="
      h-10 px-3.5
      border border-[#D5D7DA] rounded-lg
      text-sm text-[#252B37] placeholder:text-[#A4A7AE]
      outline-none
      focus:border-[#778BED] focus:ring-2 focus:ring-[#EBEEFF]
      disabled:bg-[#FAFAFA] disabled:cursor-not-allowed
      transition-all duration-150
    "
  />
  <p class="text-xs text-[#717680]">Tên hiển thị trong toàn hệ thống</p>
</div>

<!-- Error state -->
<div class="flex flex-col gap-1.5">
  <label class="text-sm font-medium text-[#252B37]">Email</label>
  <input
    type="email"
    class="
      h-10 px-3.5
      border border-[#F04438] rounded-lg
      text-sm text-[#252B37]
      outline-none
      focus:ring-2 focus:ring-[#FEE4E2]
      transition-all duration-150
    "
  />
  <p class="text-xs text-[#D92D20] flex items-center gap-1">
    ⚠ Email không hợp lệ
  </p>
</div>
```

---

### 1.3 Badge

Nhãn nhỏ hiển thị trạng thái, số lượng hoặc phân loại.

#### Variants theo màu (semantic)

| Variant | Nền | Chữ | Dùng cho |
|---------|-----|-----|---------|
| `default` | `Neutral/200` | `Neutral/700` | Nhãn trung tính |
| `primary` | `Primary/100` | `Primary/700` | Trạng thái active, tính năng |
| `success` | `Success/100` | `Success/700` | Hoàn thành, online |
| `warning` | `Warning/100` | `Warning/700` | Đang xử lý, cần chú ý |
| `error` | `Error/100` | `Error/700` | Lỗi, từ chối |

#### Sizes

| Size | Height | Padding X | Font |
|------|--------|-----------|------|
| `sm` | 20px | 8px | `text-xxs` Medium |
| `md` | 24px | 10px | `text-xs` Medium |
| `lg` | 28px | 12px | `text-xs` Semi Bold |

#### Code — Tailwind

```html
<!-- Badge Success -->
<span class="
  inline-flex items-center gap-1
  h-6 px-2.5
  bg-[#D1FADF] text-[#027A48]
  text-xs font-medium
  rounded-full
">
  <span class="w-1.5 h-1.5 rounded-full bg-[#12B76A]"></span>
  Active
</span>

<!-- Badge Warning -->
<span class="inline-flex items-center gap-1 h-6 px-2.5 bg-[#FEF0C7] text-[#DC6803] text-xs font-medium rounded-full">
  Pending
</span>

<!-- Badge Error -->
<span class="inline-flex items-center gap-1 h-6 px-2.5 bg-[#FEE4E2] text-[#B42318] text-xs font-medium rounded-full">
  Failed
</span>

<!-- Badge số (notification count) -->
<span class="inline-flex items-center justify-center min-w-5 h-5 px-1.5 bg-[#F04438] text-white text-xxs font-bold rounded-full">
  12
</span>
```

---

### 1.4 Avatar

Hiển thị ảnh đại diện người dùng hoặc chữ tắt tên.

#### Variants

| Variant | Mô tả |
|---------|-------|
| `image` | Ảnh thực của người dùng |
| `initials` | 1–2 chữ cái đầu của tên |
| `icon` | Icon mặc định khi không có ảnh |
| `group` | Stack nhiều avatar chồng lên nhau |

#### Sizes

| Size | Dimension | Font |
|------|-----------|------|
| `xs` | 24×24px | `text-xxs` |
| `sm` | 32×32px | `text-xs` |
| `md` | 40×40px | `text-sm` |
| `lg` | 48×48px | `text-md` |
| `xl` | 64×64px | `text-lg` |

#### Code — Tailwind

```html
<!-- Avatar ảnh / md -->
<img
  src="/avatar.jpg"
  alt="Nguyen Van A"
  class="w-10 h-10 rounded-full object-cover ring-2 ring-white"
/>

<!-- Avatar chữ tắt / md -->
<div class="
  w-10 h-10 rounded-full
  bg-[#EBEEFF] text-[#414CC6]
  text-sm font-semibold
  flex items-center justify-center
  select-none
">
  NA
</div>

<!-- Avatar group (stack) -->
<div class="flex -space-x-2">
  <img src="/a1.jpg" class="w-8 h-8 rounded-full ring-2 ring-white object-cover" />
  <img src="/a2.jpg" class="w-8 h-8 rounded-full ring-2 ring-white object-cover" />
  <img src="/a3.jpg" class="w-8 h-8 rounded-full ring-2 ring-white object-cover" />
  <div class="w-8 h-8 rounded-full ring-2 ring-white bg-[#E9EAEB] text-[#535862] text-xs font-medium flex items-center justify-center">
    +4
  </div>
</div>
```

---

### 1.5 Checkbox & Radio

#### Checkbox

```
☐  Unchecked   →  border: Neutral/300
☑  Checked     →  bg: Primary/600, icon: white checkmark
⊟  Indeterminate → bg: Primary/600, icon: white dash
☐  Disabled    →  bg: Neutral/100, border: Neutral/200
```

```html
<!-- Checkbox -->
<label class="flex items-center gap-2 cursor-pointer select-none">
  <input type="checkbox" class="
    w-4 h-4 rounded
    border border-[#D5D7DA]
    text-[#565DD9]
    accent-[#565DD9]
    cursor-pointer
  " />
  <span class="text-sm text-[#252B37]">Ghi nhớ đăng nhập</span>
</label>
```

#### Radio

```html
<label class="flex items-center gap-2 cursor-pointer select-none">
  <input type="radio" name="role" value="admin" class="
    w-4 h-4
    border border-[#D5D7DA]
    text-[#565DD9]
    accent-[#565DD9]
    cursor-pointer
  " />
  <span class="text-sm text-[#252B37]">Admin</span>
</label>
```

---

### 1.6 Toggle / Switch

```
OFF  →  track: Neutral/200,  thumb: White
ON   →  track: Primary/600,  thumb: White
Disabled OFF  →  opacity: 40%
Disabled ON   →  opacity: 40%
```

```html
<!-- Toggle (pure CSS) -->
<label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" class="sr-only peer" />
  <div class="
    w-10 h-6 rounded-full
    bg-[#E9EAEB] peer-checked:bg-[#565DD9]
    after:content-[''] after:absolute after:top-0.5 after:left-0.5
    after:w-5 after:h-5 after:rounded-full after:bg-white after:shadow
    after:transition-transform peer-checked:after:translate-x-4
    transition-colors duration-200
  "></div>
</label>
```

---

### 1.7 Tooltip

Hiển thị thông tin bổ sung khi hover/focus vào một phần tử.

```
Placement: top | bottom | left | right
Max width: 240px
Delay show: 300ms
```

```html
<!-- Tooltip wrapper (dùng với JS hoặc CSS :hover) -->
<div class="relative group inline-block">
  <button class="...">Hover me</button>
  <div class="
    absolute bottom-full left-1/2 -translate-x-1/2 mb-2
    px-3 py-1.5
    bg-[#181D27] text-white text-xs font-medium
    rounded-lg whitespace-nowrap
    opacity-0 group-hover:opacity-100
    pointer-events-none
    transition-opacity duration-150
    z-50
  ">
    Xem chi tiết file
    <!-- Arrow -->
    <span class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#181D27]"></span>
  </div>
</div>
```

---

### 1.8 Divider

```html
<!-- Horizontal -->
<hr class="border-0 border-t border-[#D5D7DA]" />

<!-- Horizontal với label -->
<div class="flex items-center gap-3">
  <hr class="flex-1 border-[#D5D7DA]" />
  <span class="text-xs text-[#717680] font-medium">Hoặc</span>
  <hr class="flex-1 border-[#D5D7DA]" />
</div>

<!-- Vertical -->
<div class="w-px h-6 bg-[#D5D7DA]"></div>
```

---

## 2. Navigation

### 2.1 Sidebar

Navigation chính của WebOS — dạng cột bên trái, hỗ trợ thu gọn (collapsed).

#### Anatomy

```
┌──────────────────┐
│  🖥️  WebOS Logo  │  ← Header / Brand
├──────────────────┤
│  📁 Workspace    │  ← Nav section
│  ├ 📂 Project A  │
│  └ 📂 Project B  │
├──────────────────┤
│  🔍 Search       │  ← Quick actions
│  🔔 Notifications│
├──────────────────┤
│  👤 User Profile │  ← Footer
└──────────────────┘
```

#### States của Nav Item

| State | Background | Text |
|-------|-----------|------|
| Default | Transparent | `common-text` (`Neutral/600`) |
| Hover | `common-hover` (`Neutral/200`) | `common-item` (`Neutral/800`) |
| Active / Selected | `primary-light` (`Primary/100`) | `Primary/700` |
| Disabled | Transparent | `Neutral/400` |

#### Code — Tailwind

```html
<aside class="w-60 h-screen bg-white border-r border-[#E9EAEB] flex flex-col">
  <!-- Brand -->
  <div class="h-16 px-4 flex items-center gap-3 border-b border-[#E9EAEB]">
    <div class="w-8 h-8 rounded-lg bg-[#30307D] flex items-center justify-center text-white font-bold text-sm">W</div>
    <span class="text-sm font-semibold text-[#252B37]">WebOS</span>
  </div>

  <!-- Nav -->
  <nav class="flex-1 overflow-y-auto p-3 flex flex-col gap-0.5">
    <!-- Active item -->
    <a href="#" class="flex items-center gap-2.5 h-9 px-3 rounded-lg bg-[#EBEEFF] text-[#414CC6] text-sm font-medium">
      📁 Workspace
    </a>
    <!-- Default item -->
    <a href="#" class="flex items-center gap-2.5 h-9 px-3 rounded-lg text-[#535862] text-sm hover:bg-[#E9EAEB] hover:text-[#252B37] transition-colors">
      📋 Projects
    </a>
    <a href="#" class="flex items-center gap-2.5 h-9 px-3 rounded-lg text-[#535862] text-sm hover:bg-[#E9EAEB] hover:text-[#252B37] transition-colors">
      🔔 Notifications
    </a>
  </nav>

  <!-- User -->
  <div class="p-3 border-t border-[#E9EAEB]">
    <div class="flex items-center gap-2.5 h-10 px-2 rounded-lg hover:bg-[#E9EAEB] cursor-pointer transition-colors">
      <div class="w-7 h-7 rounded-full bg-[#EBEEFF] text-[#414CC6] text-xs font-semibold flex items-center justify-center">NA</div>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-medium text-[#252B37] truncate">Nguyen Van A</p>
        <p class="text-xs text-[#717680] truncate">admin@webos.vn</p>
      </div>
    </div>
  </div>
</aside>
```

---

### 2.2 Breadcrumb

Hiển thị vị trí hiện tại trong cây thư mục.

```
Workspace  /  Project Alpha  /  03_Source  /  Frontend
```

```html
<nav aria-label="Breadcrumb">
  <ol class="flex items-center gap-1 flex-wrap">
    <li>
      <a href="#" class="text-sm text-[#717680] hover:text-[#252B37] transition-colors">Workspace</a>
    </li>
    <li class="text-[#D5D7DA]">/</li>
    <li>
      <a href="#" class="text-sm text-[#717680] hover:text-[#252B37] transition-colors">Project Alpha</a>
    </li>
    <li class="text-[#D5D7DA]">/</li>
    <li>
      <a href="#" class="text-sm text-[#717680] hover:text-[#252B37] transition-colors">03_Source</a>
    </li>
    <li class="text-[#D5D7DA]">/</li>
    <li>
      <span class="text-sm font-medium text-[#252B37]">Frontend</span>
    </li>
  </ol>
</nav>
```

---

### 2.3 Tabs

Chuyển đổi giữa các view trong cùng một ngữ cảnh.

#### Variants

| Variant | Mô tả |
|---------|-------|
| `line` | Gạch chân tab đang active (phổ biến nhất) |
| `pill` | Tab dạng viên thuốc với nền highlight |
| `enclosed` | Tab có viền, dùng trong card/panel |

```html
<!-- Tabs dạng line -->
<div class="border-b border-[#E9EAEB]">
  <div class="flex gap-0">
    <!-- Active tab -->
    <button class="
      h-10 px-4
      text-sm font-semibold text-[#414CC6]
      border-b-2 border-[#565DD9]
      -mb-px
    ">
      Tổng quan
    </button>
    <!-- Inactive tab -->
    <button class="
      h-10 px-4
      text-sm font-medium text-[#717680]
      border-b-2 border-transparent
      hover:text-[#252B37] hover:border-[#D5D7DA]
      -mb-px transition-colors
    ">
      Files
    </button>
    <button class="h-10 px-4 text-sm font-medium text-[#717680] border-b-2 border-transparent hover:text-[#252B37] -mb-px transition-colors">
      Thành viên
    </button>
    <button class="h-10 px-4 text-sm font-medium text-[#717680] border-b-2 border-transparent hover:text-[#252B37] -mb-px transition-colors">
      Cài đặt
    </button>
  </div>
</div>
```

---

### 2.4 Dropdown Menu

Menu thả xuống khi click vào trigger element.

```html
<!-- Dropdown container -->
<div class="relative inline-block">
  <!-- Trigger -->
  <button class="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-[#D5D7DA] text-sm text-[#252B37] hover:bg-[#E9EAEB] transition-colors">
    Tùy chọn ▾
  </button>

  <!-- Menu panel -->
  <div class="
    absolute right-0 top-full mt-1 z-50
    w-48 py-1
    bg-white rounded-xl shadow-lg shadow-black/10
    border border-[#E9EAEB]
  ">
    <a href="#" class="flex items-center gap-2.5 h-9 px-3 text-sm text-[#252B37] hover:bg-[#E9EAEB] transition-colors">
      ✏️ Đổi tên
    </a>
    <a href="#" class="flex items-center gap-2.5 h-9 px-3 text-sm text-[#252B37] hover:bg-[#E9EAEB] transition-colors">
      📋 Sao chép
    </a>
    <a href="#" class="flex items-center gap-2.5 h-9 px-3 text-sm text-[#252B37] hover:bg-[#E9EAEB] transition-colors">
      🔗 Chia sẻ
    </a>
    <div class="my-1 border-t border-[#E9EAEB]"></div>
    <a href="#" class="flex items-center gap-2.5 h-9 px-3 text-sm text-[#D92D20] hover:bg-[#FEF3F2] transition-colors">
      🗑️ Xóa
    </a>
  </div>
</div>
```

---

## 3. Layout

### 3.1 Card

Container chứa nội dung có liên quan, phân biệt với nền trang.

#### Variants

| Variant | Border | Shadow | Dùng khi |
|---------|--------|--------|---------|
| `flat` | `Neutral/200` | None | Nội dung thông thường |
| `elevated` | None | `sm` shadow | Cần nổi bật hơn nền |
| `interactive` | `Neutral/200` | None → `md` on hover | Card có thể click |

```html
<!-- Card cơ bản -->
<div class="bg-white rounded-xl border border-[#E9EAEB] p-5">
  <!-- Card Header -->
  <div class="flex items-start justify-between mb-4">
    <div>
      <h3 class="text-sm font-semibold text-[#252B37]">Project Alpha</h3>
      <p class="text-xs text-[#717680] mt-0.5">Cập nhật 2 giờ trước</p>
    </div>
    <span class="inline-flex items-center h-6 px-2.5 bg-[#D1FADF] text-[#027A48] text-xs font-medium rounded-full">
      Active
    </span>
  </div>

  <!-- Card Body -->
  <p class="text-sm text-[#535862] leading-relaxed">
    Hệ thống quản lý workspace và dự án tập trung cho đội ngũ thiết kế.
  </p>

  <!-- Card Footer -->
  <div class="mt-4 pt-4 border-t border-[#E9EAEB] flex items-center justify-between">
    <div class="flex -space-x-1.5">
      <div class="w-6 h-6 rounded-full bg-[#EBEEFF] text-[#414CC6] text-xs font-semibold flex items-center justify-center ring-2 ring-white">A</div>
      <div class="w-6 h-6 rounded-full bg-[#D1FADF] text-[#027A48] text-xs font-semibold flex items-center justify-center ring-2 ring-white">B</div>
    </div>
    <button class="text-xs font-medium text-[#565DD9] hover:text-[#414CC6]">Xem chi tiết →</button>
  </div>
</div>
```

---

### 3.2 Modal / Dialog

Hộp thoại overlay để xác nhận hành động hoặc hiển thị form.

#### Sizes

| Size | Width |
|------|-------|
| `sm` | 400px |
| `md` | 560px |
| `lg` | 720px |
| `xl` | 900px |
| `full` | 100vw × 100vh |

```html
<!-- Overlay -->
<div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
  <!-- Modal md -->
  <div class="w-full max-w-[560px] bg-white rounded-2xl shadow-2xl">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-5 border-b border-[#E9EAEB]">
      <div>
        <h2 class="text-base font-semibold text-[#252B37]">Tạo workspace mới</h2>
        <p class="text-sm text-[#717680] mt-0.5">Điền thông tin để khởi tạo workspace.</p>
      </div>
      <button class="w-8 h-8 rounded-lg flex items-center justify-center text-[#717680] hover:bg-[#E9EAEB] transition-colors">
        ✕
      </button>
    </div>

    <!-- Body -->
    <div class="px-6 py-5 flex flex-col gap-4">
      <div class="flex flex-col gap-1.5">
        <label class="text-sm font-medium text-[#252B37]">Tên workspace</label>
        <input type="text" placeholder="vd: Team Design" class="h-10 px-3.5 border border-[#D5D7DA] rounded-lg text-sm outline-none focus:border-[#778BED] focus:ring-2 focus:ring-[#EBEEFF] transition-all" />
      </div>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E9EAEB]">
      <button class="h-10 px-5 text-sm font-semibold text-[#535862] hover:bg-[#E9EAEB] rounded-lg transition-colors">
        Hủy
      </button>
      <button class="h-10 px-5 text-sm font-semibold text-white bg-[#30307D] hover:bg-[#383A9E] rounded-lg transition-colors">
        Tạo workspace
      </button>
    </div>
  </div>
</div>
```

---

### 3.3 Panel

Vùng nội dung phụ, thường hiển thị thông tin chi tiết của item được chọn. Không overlay — nằm trong layout.

```html
<div class="w-80 h-full bg-white border-l border-[#E9EAEB] flex flex-col">
  <!-- Panel Header -->
  <div class="flex items-center justify-between px-4 py-3.5 border-b border-[#E9EAEB]">
    <h3 class="text-sm font-semibold text-[#252B37]">Chi tiết file</h3>
    <button class="text-[#717680] hover:text-[#252B37] transition-colors text-lg leading-none">✕</button>
  </div>

  <!-- Panel Content -->
  <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
    <!-- File preview -->
    <div class="aspect-video bg-[#F4F4F5] rounded-lg flex items-center justify-center text-3xl">📄</div>

    <!-- Metadata -->
    <div class="flex flex-col gap-2">
      <div class="flex justify-between text-sm">
        <span class="text-[#717680]">Tên file</span>
        <span class="font-medium text-[#252B37]">brief_Q3.pdf</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-[#717680]">Kích thước</span>
        <span class="font-medium text-[#252B37]">2.4 MB</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-[#717680]">Tải lên bởi</span>
        <span class="font-medium text-[#252B37]">Nguyen Van A</span>
      </div>
    </div>
  </div>
</div>
```

---

### 3.4 Drawer

Panel trượt từ cạnh màn hình, dùng cho form, setting, hoặc detail view trên mobile.

#### Placements: `left` | `right` | `bottom`

```html
<!-- Drawer từ phải -->
<div class="fixed inset-0 z-50">
  <!-- Backdrop -->
  <div class="absolute inset-0 bg-black/40"></div>

  <!-- Drawer panel -->
  <div class="absolute right-0 top-0 h-full w-[480px] max-w-full bg-white shadow-2xl flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 h-16 border-b border-[#E9EAEB] shrink-0">
      <h2 class="text-base font-semibold text-[#252B37]">Cài đặt dự án</h2>
      <button class="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#E9EAEB] text-[#717680] transition-colors">✕</button>
    </div>

    <!-- Body (scrollable) -->
    <div class="flex-1 overflow-y-auto p-6">
      <!-- Content here -->
    </div>

    <!-- Footer -->
    <div class="shrink-0 px-6 py-4 border-t border-[#E9EAEB] flex gap-3 justify-end">
      <button class="h-10 px-5 text-sm font-semibold text-[#535862] hover:bg-[#E9EAEB] rounded-lg transition-colors">Hủy</button>
      <button class="h-10 px-5 text-sm font-semibold text-white bg-[#30307D] hover:bg-[#383A9E] rounded-lg transition-colors">Lưu</button>
    </div>
  </div>
</div>
```

---

## 4. Data Display

### 4.1 Table

Hiển thị dữ liệu dạng hàng/cột. Hỗ trợ sort, select, và action.

#### Anatomy

```
┌──────────────────────────────────────────────────────┐
│ ☐ │  Tên file          │  Kích thước │  Trạng thái  │
├──────────────────────────────────────────────────────┤
│ ☐ │ 📄 brief_Q3.pdf    │  2.4 MB     │  ● Active    │
│ ☐ │ 📁 Design Assets   │  —          │  ● Active    │
│ ☑ │ 📄 requirements.md │  48 KB      │  ○ Draft     │
└──────────────────────────────────────────────────────┘
```

```html
<div class="overflow-hidden rounded-xl border border-[#E9EAEB]">
  <table class="w-full text-sm">
    <!-- Header -->
    <thead class="bg-[#FAFAFA] border-b border-[#E9EAEB]">
      <tr>
        <th class="w-10 pl-4 py-3"><input type="checkbox" class="accent-[#565DD9]" /></th>
        <th class="px-3 py-3 text-left text-xs font-semibold text-[#717680] uppercase tracking-wider cursor-pointer hover:text-[#252B37]">
          Tên file ↕
        </th>
        <th class="px-3 py-3 text-left text-xs font-semibold text-[#717680] uppercase tracking-wider">Kích thước</th>
        <th class="px-3 py-3 text-left text-xs font-semibold text-[#717680] uppercase tracking-wider">Trạng thái</th>
        <th class="w-16 px-3 py-3"></th>
      </tr>
    </thead>
    <!-- Body -->
    <tbody class="divide-y divide-[#E9EAEB]">
      <tr class="hover:bg-[#FAFAFA] transition-colors group">
        <td class="pl-4 py-3"><input type="checkbox" class="accent-[#565DD9]" /></td>
        <td class="px-3 py-3">
          <div class="flex items-center gap-2.5">
            <span class="text-lg">📄</span>
            <span class="font-medium text-[#252B37]">brief_Q3.pdf</span>
          </div>
        </td>
        <td class="px-3 py-3 text-[#717680]">2.4 MB</td>
        <td class="px-3 py-3">
          <span class="inline-flex items-center gap-1 h-6 px-2.5 bg-[#D1FADF] text-[#027A48] text-xs font-medium rounded-full">
            <span class="w-1.5 h-1.5 rounded-full bg-[#12B76A]"></span>Active
          </span>
        </td>
        <td class="px-3 py-3">
          <button class="opacity-0 group-hover:opacity-100 text-[#717680] hover:text-[#252B37] transition-all">⋯</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

---

### 4.2 List

Danh sách item đơn giản, dạng vertical stack.

```html
<ul class="divide-y divide-[#E9EAEB] rounded-xl border border-[#E9EAEB] overflow-hidden">
  <!-- List item -->
  <li class="flex items-center gap-3 px-4 py-3 bg-white hover:bg-[#FAFAFA] transition-colors cursor-pointer group">
    <div class="w-9 h-9 rounded-lg bg-[#EBEEFF] flex items-center justify-center text-lg shrink-0">📁</div>
    <div class="flex-1 min-w-0">
      <p class="text-sm font-medium text-[#252B37] truncate">03_Source</p>
      <p class="text-xs text-[#717680]">12 files · Cập nhật hôm nay</p>
    </div>
    <span class="text-[#D5D7DA] group-hover:text-[#A4A7AE] text-lg transition-colors">›</span>
  </li>
</ul>
```

---

### 4.3 Tree View

Cấu trúc cây dùng cho File Explorer — thành phần đặc trưng của WebOS.

```html
<div class="text-sm select-none">
  <!-- Root node -->
  <div>
    <!-- Folder row -->
    <div class="flex items-center gap-1.5 h-8 px-2 rounded-lg hover:bg-[#E9EAEB] cursor-pointer group">
      <span class="text-[#A4A7AE] text-xs">▼</span>
      <span class="text-base">📁</span>
      <span class="flex-1 text-[#252B37] font-medium">Project Alpha</span>
    </div>

    <!-- Children (indented) -->
    <div class="pl-4 border-l border-[#E9EAEB] ml-3.5">
      <!-- Sub-folder -->
      <div class="flex items-center gap-1.5 h-8 px-2 rounded-lg hover:bg-[#E9EAEB] cursor-pointer">
        <span class="text-[#A4A7AE] text-xs">▶</span>
        <span class="text-base">📁</span>
        <span class="flex-1 text-[#535862]">01_Requirements</span>
      </div>

      <!-- Active folder -->
      <div class="flex items-center gap-1.5 h-8 px-2 rounded-lg bg-[#EBEEFF] cursor-pointer">
        <span class="text-[#A4A7AE] text-xs">▼</span>
        <span class="text-base">📂</span>
        <span class="flex-1 text-[#414CC6] font-medium">03_Source</span>
      </div>

      <!-- Files inside active folder -->
      <div class="pl-4 border-l border-[#E9EAEB] ml-3.5">
        <div class="flex items-center gap-1.5 h-8 px-2 rounded-lg hover:bg-[#E9EAEB] cursor-pointer">
          <span class="text-base">📄</span>
          <span class="text-[#535862]">index.tsx</span>
        </div>
        <div class="flex items-center gap-1.5 h-8 px-2 rounded-lg hover:bg-[#E9EAEB] cursor-pointer">
          <span class="text-base">📄</span>
          <span class="text-[#535862]">App.tsx</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

### 4.4 Tag / Chip

Nhãn nhỏ có thể xóa, dùng để hiển thị filter đang áp dụng hoặc category.

```html
<!-- Tag thường -->
<span class="inline-flex items-center gap-1.5 h-7 px-3 bg-[#E9EAEB] text-[#414651] text-xs font-medium rounded-full">
  #design-system
</span>

<!-- Tag có thể xóa -->
<span class="inline-flex items-center gap-1 h-7 pl-3 pr-1.5 bg-[#EBEEFF] text-[#414CC6] text-xs font-medium rounded-full">
  High Priority
  <button class="w-4 h-4 rounded-full flex items-center justify-center hover:bg-[#BBC7FB] transition-colors text-[#565DD9]">✕</button>
</span>
```

---

## 5. Feedback

### 5.1 Toast / Notification

Thông báo tạm thời, tự động biến mất sau 3–5 giây. Xuất hiện góc màn hình.

#### Variants

| Variant | Icon | Màu viền trái |
|---------|------|---------------|
| `success` | ✅ | `Success/500` |
| `error` | ❌ | `Error/500` |
| `warning` | ⚠️ | `Warning/500` |
| `info` | ℹ️ | `Primary/500` |

```html
<!-- Toast container (fixed, góc dưới phải) -->
<div class="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 w-80">

  <!-- Toast Success -->
  <div class="flex items-start gap-3 p-4 bg-white rounded-xl shadow-lg border border-[#E9EAEB] border-l-4 border-l-[#12B76A]">
    <span class="text-base mt-0.5">✅</span>
    <div class="flex-1 min-w-0">
      <p class="text-sm font-semibold text-[#252B37]">Tải lên thành công</p>
      <p class="text-xs text-[#717680] mt-0.5">brief_Q3.pdf đã được lưu vào 03_Source</p>
    </div>
    <button class="text-[#A4A7AE] hover:text-[#717680] transition-colors text-lg leading-none ml-1">✕</button>
  </div>

  <!-- Toast Error -->
  <div class="flex items-start gap-3 p-4 bg-white rounded-xl shadow-lg border border-[#E9EAEB] border-l-4 border-l-[#F04438]">
    <span class="text-base mt-0.5">❌</span>
    <div class="flex-1 min-w-0">
      <p class="text-sm font-semibold text-[#252B37]">Tải lên thất bại</p>
      <p class="text-xs text-[#717680] mt-0.5">File vượt quá giới hạn 100MB.</p>
    </div>
    <button class="text-[#A4A7AE] hover:text-[#717680] transition-colors text-lg leading-none ml-1">✕</button>
  </div>

</div>
```

---

### 5.2 Alert

Thông báo tĩnh, nằm trong layout để cảnh báo người dùng về một trạng thái cụ thể.

```html
<!-- Alert Warning -->
<div class="flex gap-3 p-4 bg-[#FFFAEB] border border-[#FEC84B] rounded-xl">
  <span class="text-base mt-0.5 shrink-0">⚠️</span>
  <div>
    <p class="text-sm font-semibold text-[#DC6803]">Workspace sắp hết dung lượng</p>
    <p class="text-sm text-[#93370D] mt-1">Bạn đã dùng 92% dung lượng. Hãy nâng cấp gói hoặc xóa file không cần thiết.</p>
    <button class="mt-2 text-sm font-semibold text-[#DC6803] underline hover:no-underline">Nâng cấp ngay</button>
  </div>
</div>

<!-- Alert Info -->
<div class="flex gap-3 p-4 bg-[#F5F6FF] border border-[#BBC7FB] rounded-xl">
  <span class="text-base mt-0.5 shrink-0">ℹ️</span>
  <div>
    <p class="text-sm font-semibold text-[#414CC6]">Hệ thống sẽ bảo trì lúc 2:00 AM</p>
    <p class="text-sm text-[#383A9E] mt-1">Vui lòng lưu công việc trước 1:30 AM để tránh mất dữ liệu.</p>
  </div>
</div>
```

---

### 5.3 Empty State

Hiển thị khi không có dữ liệu để hiển thị.

#### Cấu trúc

```
        [Illustration / Icon]
           Tiêu đề rõ ràng
      Mô tả ngắn gợi ý hành động
         [Button hành động]
```

```html
<div class="flex flex-col items-center justify-center py-16 px-8 text-center">
  <!-- Icon -->
  <div class="w-16 h-16 rounded-2xl bg-[#F5F6FF] flex items-center justify-center text-3xl mb-4">
    📁
  </div>

  <!-- Text -->
  <h3 class="text-base font-semibold text-[#252B37] mb-1">Chưa có file nào</h3>
  <p class="text-sm text-[#717680] max-w-xs leading-relaxed mb-6">
    Thư mục này đang trống. Kéo thả file vào đây hoặc nhấn nút bên dưới để tải lên.
  </p>

  <!-- Action -->
  <button class="inline-flex items-center gap-2 h-10 px-5 bg-[#30307D] hover:bg-[#383A9E] text-white text-sm font-semibold rounded-lg transition-colors">
    ↑ Tải file lên
  </button>
</div>
```

---

### 5.4 Skeleton

Placeholder animation hiển thị trong khi nội dung đang tải.

```html
<!-- CSS animation -->
<style>
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #E9EAEB 25%, #FAFAFA 50%, #E9EAEB 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
</style>

<!-- Skeleton Card -->
<div class="bg-white rounded-xl border border-[#E9EAEB] p-5 space-y-3">
  <div class="flex items-center gap-3">
    <div class="skeleton w-10 h-10 rounded-full"></div>
    <div class="flex-1 space-y-2">
      <div class="skeleton h-3 rounded-full w-3/4"></div>
      <div class="skeleton h-3 rounded-full w-1/2"></div>
    </div>
  </div>
  <div class="skeleton h-3 rounded-full w-full"></div>
  <div class="skeleton h-3 rounded-full w-5/6"></div>
  <div class="skeleton h-3 rounded-full w-4/6"></div>
</div>
```

---

### 5.5 Progress

Hiển thị tiến trình upload file hoặc hoàn thành task.

#### Variants: `bar` | `circular` | `step`

```html
<!-- Progress Bar -->
<div class="space-y-1.5">
  <div class="flex justify-between text-xs text-[#717680]">
    <span>Đang tải lên brief_Q3.pdf</span>
    <span class="font-medium text-[#252B37]">72%</span>
  </div>
  <div class="h-2 bg-[#E9EAEB] rounded-full overflow-hidden">
    <div
      class="h-full bg-[#565DD9] rounded-full transition-all duration-300"
      style="width: 72%"
    ></div>
  </div>
</div>

<!-- Progress Steps -->
<div class="flex items-center gap-0">
  <!-- Step 1: Done -->
  <div class="flex items-center gap-0">
    <div class="w-8 h-8 rounded-full bg-[#565DD9] text-white text-sm font-semibold flex items-center justify-center">✓</div>
    <div class="h-0.5 w-16 bg-[#565DD9]"></div>
  </div>
  <!-- Step 2: Current -->
  <div class="flex items-center gap-0">
    <div class="w-8 h-8 rounded-full border-2 border-[#565DD9] bg-white text-[#565DD9] text-sm font-semibold flex items-center justify-center">2</div>
    <div class="h-0.5 w-16 bg-[#E9EAEB]"></div>
  </div>
  <!-- Step 3: Pending -->
  <div class="flex items-center gap-0">
    <div class="w-8 h-8 rounded-full border-2 border-[#E9EAEB] bg-white text-[#A4A7AE] text-sm font-semibold flex items-center justify-center">3</div>
  </div>
</div>
```

---

## Tổng hợp Component Token Map

| Component | Background | Border | Text chính | Text phụ |
|-----------|-----------|--------|-----------|---------|
| Button Primary | `action` | — | White | — |
| Button Secondary | `primary-light` | `Primary/200` | `Primary/900` | — |
| Input | White | `common-line` | `common-item` | `common-text` |
| Badge Success | `success-container` | — | `success` | — |
| Card | White | `common-line` | `common-item` | `common-text` |
| Sidebar Item Active | `primary-light` | — | `Primary/700` | — |
| Toast | White | `common-line` | `common-item` | `common-text` |
| Skeleton | `Neutral/200` | — | — | — |

---

*Component Library v1.0 — STVB - WebOS Design System*
