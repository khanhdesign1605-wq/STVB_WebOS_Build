# ✍️ Typography — Style Guide

> Hệ thống typography chuẩn hóa cho WebOS. Được stress-test qua nhiều dự án để đảm bảo đủ linh hoạt cho hầu hết mọi ngữ cảnh, trong khi vẫn duy trì khả năng tiếp cận (accessibility) cao nhất có thể.

---

## 1. Typeface

### Secondary Typeface — Manrope

| Thuộc tính | Giá trị |
|-----------|---------|
| **Font family** | Manrope |
| **Classification** | Sans Serif |
| **Language support** | Vietnamese ✓ |
| **Google Fonts** | [fonts.google.com/specimen/Manrope](https://fonts.google.com/specimen/Manrope) |

**Character set:**
```
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
a b c d e f g h i j k l m n o p q r s t u v w x y z
0 1 2 3 4 5 6 7 8 9
```

### Weights sử dụng

| Weight | CSS value | Dùng cho |
|--------|-----------|---------|
| **Regular** | `400` | Body text, mô tả, placeholder |
| **Medium** | `500` | Label, subtitle, caption |
| **Semi Bold** | `600` | Heading phụ, nhấn mạnh inline |
| **Bold** | `700` | Display heading, tiêu đề chính |

---


> Dùng **Regular / Medium** cho đoạn văn dài. Line height tối thiểu `140%` để đảm bảo readability.

---

## 2. Type Scale (Thang kích thước chữ)

Toàn bộ hệ thống chia làm 2 nhóm chính: **Display** (tiêu đề lớn) và **Text** (nội dung).

> **Quy tắc chung cho toàn bộ scale:**
> - Letter spacing: `0.2`
> - Line height: `140%` (trừ Display 2xl: `150%`)

---

### 📌 Display 2xl

| Thuộc tính | Giá trị |
|-----------|---------|
| Font size | `48px` / `3rem` |
| Line height | `150%` |
| Letter spacing | `0.2` |

| Regular | Medium | Semi Bold | **Bold** |
|---------|--------|-----------|----------|
| Display 2xl Regular | Display 2xl Medium | **Display 2xl Semi Bold** | **Display 2xl Bold** |

---

### 📌 Display xl

| Thuộc tính | Giá trị |
|-----------|---------|
| Font size | `40px` / `2.5rem` |
| Line height | `140%` |
| Letter spacing | `0.2` |

| Regular | Medium | Semi Bold | **Bold** |
|---------|--------|-----------|----------|
| Display xl Regular | Display xl Medium | **Display xl Semi Bold** | **Display xl Bold** |

---

### 📌 Display lg

| Thuộc tính | Giá trị |
|-----------|---------|
| Font size | `28px` / `1.75rem` |
| Line height | `140%` |
| Letter spacing | `0.2` |

| Regular | Medium | Semi Bold | **Bold** |
|---------|--------|-----------|----------|
| Display lg Regular | Display lg Medium | **Display lg Semi Bold** | **Display lg Bold** |

---

### 📌 Display md

| Thuộc tính | Giá trị |
|-----------|---------|
| Font size | `24px` / `1.5rem` |
| Line height | `140%` |
| Letter spacing | `0.2` |

| Regular | Medium | Semi Bold | **Bold** |
|---------|--------|-----------|----------|
| Display md Regular | Display md Medium | **Display md Semi Bold** | **Display md Bold** |

---

### 📌 Text lg

| Thuộc tính | Giá trị |
|-----------|---------|
| Font size | `20px` / `1.5rem` |
| Line height | `140%` |
| Letter spacing | `0.2` |

| Regular | Medium | Semi Bold | **Bold** |
|---------|--------|-----------|----------|
| Text lg Regular | Text lg Medium | **Text lg Semi Bold** | **Text lg Bold** |

---

### 📌 Text md

| Thuộc tính | Giá trị |
|-----------|---------|
| Font size | `18px` / `1.125rem` |
| Line height | `140%` |
| Letter spacing | `0.2` |

| Regular | Medium | Semi Bold | **Bold** |
|---------|--------|-----------|----------|
| Text md Regular | Text md Medium | **Text md Semi Bold** | **Text md Bold** |

---

### 📌 Text sm

| Thuộc tính | Giá trị |
|-----------|---------|
| Font size | `16px` / `1rem` |
| Line height | `140%` |
| Letter spacing | `0.2` |

| Regular | Medium | Semi Bold | **Bold** |
|---------|--------|-----------|----------|
| Text sm Regular | Text sm Medium | **Text sm Semi Bold** | **Text sm Bold** |

---

### 📌 Text xs

| Thuộc tính | Giá trị |
|-----------|---------|
| Font size | `14px` / `0.875rem` |
| Line height | `140%` |
| Letter spacing | `0.2` |

| Regular | Medium | Semi Bold | **Bold** |
|---------|--------|-----------|----------|
| Text xs Regular | Text xs Medium | **Text xs Semi Bold** | **Text xs Bold** |

---

### 📌 Text xxs

| Thuộc tính | Giá trị |
|-----------|---------|
| Font size | `12px` / `0.875rem` |
| Line height | `140%` |
| Letter spacing | `0.2` |

| Regular | Medium | Semi Bold | **Bold** |
|---------|--------|-----------|----------|
| Text xxs Regular | Text xxs Medium | **Text xxs Semi Bold** | **Text xxs Bold** |

---

## 3. Bảng tổng hợp Type Scale

| Token | Size (px) | Size (rem) | Line Height | Letter Spacing | Weights |
|-------|-----------|------------|-------------|----------------|---------|
| `display-2xl` | 48px | 3rem | 150% | 0.2 | Regular · Medium · SemiBold · Bold |
| `display-xl` | 40px | 2.5rem | 140% | 0.2 | Regular · Medium · SemiBold · Bold |
| `display-lg` | 28px | 1.75rem | 140% | 0.2 | Regular · Medium · SemiBold · Bold |
| `display-md` | 24px | 1.5rem | 140% | 0.2 | Regular · Medium · SemiBold · Bold |
| `text-lg` | 20px | 1.5rem | 140% | 0.2 | Regular · Medium · SemiBold · Bold |
| `text-md` | 18px | 1.125rem | 140% | 0.2 | Regular · Medium · SemiBold · Bold |
| `text-sm` | 16px | 1rem | 140% | 0.2 | Regular · Medium · SemiBold · Bold |
| `text-xs` | 14px | 0.875rem | 140% | 0.2 | Regular · Medium · SemiBold · Bold |
| `text-xxs` | 12px | 0.875rem | 140% | 0.2 | Regular · Medium · SemiBold · Bold |

---

## 4. CSS Variables & Utility Classes

### Import font

```css
/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap');

:root {
  --font-primary: 'Manrope', sans-serif;
}
```

### CSS Custom Properties

```css
:root {
  /* Font family */
  --font-family:        'Manrope', sans-serif;

  /* Font weights */
  --font-regular:       400;
  --font-medium:        500;
  --font-semibold:      600;
  --font-bold:          700;

  /* Letter spacing */
  --letter-spacing:     0.2px;

  /* Line heights */
  --line-height-base:   140%;
  --line-height-display: 150%;

  /* === Display Scale === */
  --text-display-2xl:   3rem;       /* 48px */
  --text-display-xl:    2.5rem;     /* 40px */
  --text-display-lg:    1.75rem;    /* 28px */
  --text-display-md:    1.5rem;     /* 24px */

  /* === Text Scale === */
  --text-lg:            1.25rem;    /* 20px */
  --text-md:            1.125rem;   /* 18px */
  --text-sm:            1rem;       /* 16px */
  --text-xs:            0.875rem;   /* 14px */
  --text-xxs:           0.75rem;    /* 12px */
}
```

### Utility classes

```css
/* Base reset */
body {
  font-family: var(--font-family);
  font-weight: var(--font-regular);
  font-size: var(--text-sm);
  line-height: var(--line-height-base);
  letter-spacing: var(--letter-spacing);
}

/* Display */
.display-2xl { font-size: var(--text-display-2xl); line-height: var(--line-height-display); }
.display-xl  { font-size: var(--text-display-xl);  line-height: var(--line-height-base); }
.display-lg  { font-size: var(--text-display-lg);  line-height: var(--line-height-base); }
.display-md  { font-size: var(--text-display-md);  line-height: var(--line-height-base); }

/* Text */
.text-lg  { font-size: var(--text-lg);  line-height: var(--line-height-base); }
.text-md  { font-size: var(--text-md);  line-height: var(--line-height-base); }
.text-sm  { font-size: var(--text-sm);  line-height: var(--line-height-base); }
.text-xs  { font-size: var(--text-xs);  line-height: var(--line-height-base); }
.text-xxs { font-size: var(--text-xxs); line-height: var(--line-height-base); }

/* Weights */
.font-regular  { font-weight: var(--font-regular); }
.font-medium   { font-weight: var(--font-medium); }
.font-semibold { font-weight: var(--font-semibold); }
.font-bold     { font-weight: var(--font-bold); }
```

---

## 5. Tailwind CSS Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['3rem',    { lineHeight: '1.5',   letterSpacing: '0.2px' }],
        'display-xl':  ['2.5rem',  { lineHeight: '1.4',   letterSpacing: '0.2px' }],
        'display-lg':  ['1.75rem', { lineHeight: '1.4',   letterSpacing: '0.2px' }],
        'display-md':  ['1.5rem',  { lineHeight: '1.4',   letterSpacing: '0.2px' }],
        'text-lg':     ['1.25rem', { lineHeight: '1.4',   letterSpacing: '0.2px' }],
        'text-md':     ['1.125rem',{ lineHeight: '1.4',   letterSpacing: '0.2px' }],
        'text-sm':     ['1rem',    { lineHeight: '1.4',   letterSpacing: '0.2px' }],
        'text-xs':     ['0.875rem',{ lineHeight: '1.4',   letterSpacing: '0.2px' }],
        'text-xxs':    ['0.75rem', { lineHeight: '1.4',   letterSpacing: '0.2px' }],
      },
      fontWeight: {
        regular:  '400',
        medium:   '500',
        semibold: '600',
        bold:     '700',
      },
    },
  },
}
```

---

## 6. Hướng dẫn sử dụng (Usage Guidelines)

### Phân cấp nội dung khuyến nghị

```
Page Title          →  display-2xl  · Bold
Section Heading     →  display-xl   · Bold
Card Title          →  display-lg   · Semi Bold
Sub-heading         →  display-md   · Semi Bold
─────────────────────────────────────────────
Body / Paragraph    →  text-md      · Regular
Label / Caption     →  text-sm      · Medium
Helper text         →  text-xs      · Regular
Badge / Tag         →  text-xxs     · Medium
```

### ✅ Nên làm

- Dùng **Bold** cho tiêu đề trang và CTA quan trọng — tạo điểm nhấn rõ ràng trong visual hierarchy.
- Dùng **Regular** cho đoạn văn dài — giảm mỏi mắt khi đọc nhiều.
- Dùng **Medium** cho label, placeholder, metadata — đủ nhấn nhưng không lấn át body text.
- Kết hợp `display-*` với `text-*` để tạo tương phản tốt giữa tiêu đề và nội dung.

### ❌ Không nên làm

- Không dùng quá 3 weight khác nhau trên cùng một màn hình — gây loạn thị giác.
- Không dùng `text-xxs` (12px) cho nội dung chính — khó đọc, vi phạm WCAG AA.
- Không set `line-height` dưới `130%` cho đoạn văn — ảnh hưởng readability nghiêm trọng.
- Không hardcode `font-size` bằng `px` trong component — luôn dùng token hoặc Tailwind class.

---

## 7. Accessibility (A11y)

| Quy tắc | Giá trị tối thiểu |
|---------|-------------------|
| Body font size | ≥ `16px` (text-sm) |
| Small text contrast | ≥ `4.5:1` (WCAG AA) |
| Large text contrast (≥ 18px Bold) | ≥ `3:1` (WCAG AA) |
| Line height cho paragraph | ≥ `140%` |
| Letter spacing | ≥ `0.12em` (khuyến nghị) |

> ⚠️ `text-xxs` (12px) chỉ nên dùng cho tooltip, badge số, hoặc metadata phụ — không dùng cho nội dung cần đọc liên tục.

---

*Typography System v1.0 — AI Assistant - WebOS Design System*
