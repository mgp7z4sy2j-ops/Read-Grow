---
title: STARTRADER Design Guideline — Standalone Brand
description: Self-contained design specification for the STARTRADER standalone brand identity. Covers brand DNA, design tokens (CSS/Tailwind/SCSS/JSON), logo assets, UI patterns, and accessibility for marketing site and web app surfaces using the standalone STARTRADER logo (no partnership lockup).
version: 1.0.0
audience: Brand, Marketing, Product Design, Frontend Engineering
date: 2026-05-12
tags: [design-system, brand, ui, tokens, startrader, standalone]
source: 2026 STARTRADER Brand Guidelines V.1
brand: STARTRADER
variant: standalone
logo-path: ./STARTRADER LOGO/
language: en-CN
---

# STARTRADER Design Guideline — Standalone Brand

> **Built on Trust. Driven by Growth.**
> 适用于使用 **STARTRADER 单独 Logo**（无任何合作伙伴 lockup）的所有触点。
> Applies to every surface using the standalone STARTRADER mark — no co-branding.

> 🔗 联合品牌版本：
> - NBA Partnership → [design-nba.md](./design-nba.md)
> - PCCME Partnership → [design-pccme.md](./design-pccme.md)

---

## 0. Table of Contents

1. [Brand Identity](#1-brand-identity)
2. [Logo Assets](#2-logo-assets)
3. [Color Tokens](#3-color-tokens)
4. [Typography Tokens](#4-typography-tokens)
5. [Spacing & Layout Tokens](#5-spacing--layout-tokens)
6. [Code Snippets](#6-code-snippets)
7. [UI Foundation](#7-ui-foundation)
8. [Components](#8-components)
9. [Marketing Site Patterns](#9-marketing-site-patterns)
10. [Web App Patterns](#10-web-app-patterns)
11. [Motion](#11-motion)
12. [Imagery](#12-imagery)
13. [Accessibility](#13-accessibility)
14. [Quality Checklist](#14-quality-checklist)

---

## 1. Brand Identity

### 1.1 Snapshot · 速览

| Field | Value |
| --- | --- |
| **Brand Name** | `STARTRADER` (ALL CAPS, single word, no abbreviation) |
| **Tagline** | Built on Trust. Driven by Growth. |
| **Values** | Strength · Trust · Ambition · Resilience |
| **Personality** | Confident, sharp, reliable, forward-looking |
| **Tone** | Professional, confident, human |

> 命名禁忌 / Name rules: 不允许 `Star Trader` `Startrader` `STAR TRADER` `ST` `STR`，不允许在换行处拆词。

### 1.2 Brand DNA

**Values · 价值观**

| Value | 中文 | 含义 |
| --- | --- | --- |
| **Strength** | 力量 | 在波动的市场中提供稳定支撑 |
| **Trust** | 信任 | 透明、诚信、可依赖 |
| **Ambition** | 雄心 | 推动客户与品牌共同成长 |
| **Resilience** | 韧性 | 长期主义，穿越周期 |

**Personality · 个性**
> Confident, sharp, reliable, forward-looking.
> 说话带保证但绝不傲慢；高端而平易近人；创新而扎实；现代、自律、有人情味。

**Proposition · 价值主张**
> STARTRADER is the trusted gateway to global financial markets. We combine a wide choice of assets, innovative platforms, and transparent practices to give traders the confidence, freedom, and tools to succeed wherever they are on their journey.

**Vision · 愿景**
> To make global trading accessible, trusted, and empowering — helping people unlock opportunities to grow their future.

**Mission · 使命**
> To empower traders and partners with transparent access, advanced tools, and trusted support, enabling them to grow confidently in the global financial markets.

### 1.3 Verbal Identity · 语言识别

**Tagline**: `Built on Trust. Driven by Growth.`

**Language**: 清晰、直接、有目的。没有营销噪音，没有空洞修辞。
- ✅ 尊重读者时间，每句话都体现"trust / growth / empowerment"
- ❌ 浮夸、噪音、冗长

**Tone of Voice**: Professional, confident and human.
- 以清晰为先，删除不必要的内容
- 启发但不夸张，教育但不居高临下

**Name Usage Rules · 品牌名书写规范**

| ❌ Never | ✅ Always |
| --- | --- |
| `Star Trader` `Startrader` `STAR TRADER` | `STARTRADER`（全大写、单个单词）|
| `ST` `STR` 任何缩写 | 所有材料保持一致 |
| 在换行处拆词或用连字符断开 | 不允许任何换行拆分 |

> **Brand representation rule**: 你代表 STARTRADER 发声，就代表这个标准。精度与语气同等重要。

---

## 2. Logo Assets

> ✅ 本文档使用 **STARTRADER 独立 Logo**，不包含任何合作伙伴元素。
> 资产位于 `./STARTRADER LOGO/` 目录。

### 2.1 Asset Inventory · 完整清单

```
./STARTRADER LOGO/
├── WEB/                                              ← Primary (Horizontal) — 默认首选
│   ├── STARTRADER_Primary_Logo_RGB.png               ← 浅底
│   ├── STARTRADER_Primary_Logo_RGB.jpg               ← 浅底 (JPG)
│   ├── STARTRADER_Primary_Logo_Inverted_RGB.png      ← 深底
│   └── STARTRADER_Primary_Logo_Inverted_RGB.jpg      ← 深底 (JPG)
│
└── WEB Secondary/                                    ← Secondary — 空间受限时使用
    ├── STARTRADER_Secondary_Stacked_Logo_RGB.png            ← Stacked, 浅底
    ├── STARTRADER_Secondary_Stacked_Inverted_Logo_RGB.png   ← Stacked, 深底
    ├── STARTRADER_Secondary_Vertical_Logo_RGB.png           ← Vertical, 浅底
    └── STARTRADER_Secondary_Vertical_Inverted_Logo_RGB.png  ← Vertical, 深底
```

### 2.2 Visual Preview · 视觉预览

**Primary Horizontal — 默认首选 (Light Background)**

![STARTRADER Primary Logo](./STARTRADER%20LOGO/WEB/STARTRADER_Primary_Logo_RGB.png)

**Secondary Stacked — 适合中等宽度容器 (Light Background)**

![STARTRADER Secondary Stacked Logo](./STARTRADER%20LOGO/WEB%20Secondary/STARTRADER_Secondary_Stacked_Logo_RGB.png)

**Secondary Vertical — 适合方形 / 极窄空间 (Light Background)**

![STARTRADER Secondary Vertical Logo](./STARTRADER%20LOGO/WEB%20Secondary/STARTRADER_Secondary_Vertical_Logo_RGB.png)

### 2.3 Selection Guide · 选型规则

```
Q1: 是否有横向空间，宽高比 ≥ 3:1?
   ├── 是 → Primary Horizontal (默认，首选)
   └── 否 → Q2

Q2: 容器近似方形（宽高比 1:1 ~ 2:1）?
   ├── 是 → Secondary Stacked
   └── 否（窄而高，比如侧栏头部、App icon 旁）→ Secondary Vertical

Q3: 背景色 ≥ 50% 灰度（深色背景）?
   ├── 是 → 使用 _Inverted_ 版本
   └── 否 → 使用标准 RGB 版本
```

### 2.4 Usage Rules · 使用规则

**Clear Space · 安全距离**
> 保护区 = 图形左侧/右侧 Cyan 小方块（star 端点装饰）的宽度。
> No text, imagery, or graphic elements may intrude into this space.

**Minimum Size · 最小尺寸**
- Primary Horizontal: 最小 24px 高（Web）/ 12mm（Print）
- Secondary Stacked: 最小 32px 高
- Secondary Vertical: 最小 48px 高

**Wireframe Placement · 放置位置**
`Left-Top` (recommended) · `Left-Bottom` · `Right-Top` · `Right-Bottom`

### 2.5 Do / Don't

| ✅ DO | ❌ DON'T |
| --- | --- |
| 使用 Primary 作为默认 | 旋转 Logo |
| 在浅底用 RGB 版本，深底用 Inverted 版本 | 深底用 RGB / 浅底用 Inverted（对比度错乱）|
| 保留安全距离 | 在 Logo 旁紧贴文字 lock-up |
| 仅使用规范色 | 使用品牌色外的任何颜色 |
| 空间不足时使用 Stacked / Vertical | 拆解 / 重排 Logo 元素 |
| 透明 PNG 直接覆盖在背景上 | 加 drop shadow / 加形状容器 / 渐变填充 |

### 2.6 HTML Implementation

```html
<!-- 默认 Primary Horizontal，自动主题切换 -->
<picture>
  <source
    media="(prefers-color-scheme: dark)"
    srcset="/assets/STARTRADER LOGO/WEB/STARTRADER_Primary_Logo_Inverted_RGB.png"
  />
  <img
    src="/assets/STARTRADER LOGO/WEB/STARTRADER_Primary_Logo_RGB.png"
    alt="STARTRADER"
    height="40"
    width="auto"
  />
</picture>
```

---

## 3. Color Tokens

### 3.1 Primary Colors · 主色

| Token | HEX | RGB | CMYK | Pantone | Usage |
| --- | --- | --- | --- | --- | --- |
| `--color-primary-navy` | `#0D0D4B` | 13, 13, 75 | 100, 96, 37, 40 | 2766 C | 主背景 / 核心品牌色 |
| `--color-primary-cyan` | `#16E9D7` | 22, 233, 215 | 66, 0, 28, 0 | 3252 C | 强调 / CTA / 高亮 |
| `--color-primary-blue` | `#0047BB` | 0, 71, 187 | 97, 77, 0, 0 | 2728 C | 链接 / 次级 CTA |
| `--color-primary-mist` | `#DAE3ED` | 218, 227, 237 | 13, 6, 3, 0 | 656 C | 浅背景 / 分割线 |

### 3.2 Secondary Colors · 辅助色

| Token | HEX | RGB | CMYK | Pantone | Usage |
| --- | --- | --- | --- | --- | --- |
| `--color-secondary-deep-blue` | `#001489` | 0, 20, 137 | 100, 96, 4, 4 | Blue 072 C | 深色变体 / Hover |
| `--color-secondary-sand` | `#DFC5AE` | 222, 196, 174 | 12, 22, 30, 0 | 4685 C | 暖中性 / 中东市场 |
| `--color-secondary-ink` | `#1C1F2A` | 27, 31, 42 | 81, 73, 56, 68 | 532 C | 正文文字 / 深色 UI 表面 |
| `--color-secondary-graphite` | `#50555B` | 81, 86, 91 | 68, 57, 51, 29 | Cool Gray 11 C | 次级文字 / Icon |

### 3.3 Premium Colors · 高端点缀（限量使用）

| Token | HEX | Pantone | Usage |
| --- | --- | --- | --- |
| `--color-premium-bronze` | `#AC7C59` | Metallic 876 C / 4645 C | VIP / 高端会员标识 |
| `--color-premium-silver` | `#A0A8AE` | Metallic 877 C / 429 C | 精英徽章 / 奖项 |

> ⚠️ Premium 色规则：**总面积 ≤ 5%**，仅用于强调，不作默认。

### 3.4 Color Tints · 色阶

| Base | 80% | 60% | 40% | 20% |
| --- | --- | --- | --- | --- |
| Navy `#0D0D4B` | `#3D3D6F` | `#6E6E93` | `#9E9EB7` | `#CFCFDB` |
| Blue `#0047BB` | `#336CC9` | `#6691D6` | `#99B5E4` | `#CCDAF1` |
| Cyan `#16E9D7` | `#64D9D5` | `#92E3DF` | `#B8ECE9` | `#DCF5F4` |

### 3.5 Gradients · 渐变

```
--gradient-momentum: linear-gradient(135deg, #0D0D4B 0%, #0047BB 50%, #16E9D7 100%);
--gradient-trust:    linear-gradient(180deg, #0D0D4B 0%, #001489 100%);
--gradient-growth:   linear-gradient(90deg,  #0047BB 0%, #16E9D7 100%);
```

### 3.6 Semantic Aliases · 语义化别名

```
--color-bg-primary:    var(--color-primary-navy);     /* 默认深色背景 */
--color-bg-surface:    var(--color-secondary-ink);    /* 卡片表面 */
--color-bg-subtle:     var(--color-primary-mist);     /* 浅色区块 */

--color-text-primary:    #FFFFFF;                     /* 深底白字 */
--color-text-on-light:   var(--color-secondary-ink);  /* 浅底深字 */
--color-text-secondary:  var(--color-secondary-graphite);
--color-text-link:       var(--color-primary-cyan);

--color-action-primary:   var(--color-primary-cyan);  /* 主 CTA */
--color-action-secondary: var(--color-primary-blue);  /* 次 CTA */
--color-border-default:   var(--color-primary-mist);

--color-success: var(--color-primary-cyan);
--color-info:    var(--color-primary-blue);
--color-warning: var(--color-secondary-sand);
--color-danger:  #E5484D;                              /* 唯一允许的非品牌色 */
```

---

## 4. Typography Tokens

### 4.1 Font Families

| Script | Font | Usage |
| --- | --- | --- |
| Latin (Primary) | **Plus Jakarta Sans** | 默认 UI / 标题 / 正文 |
| Asian (CJK) | **Noto Sans** | 中日韩内容 |
| Arabic | **Tajawal** | 阿拉伯语区域 |
| Display (Secondary) | **Zodiak** | 海报 / 大标题 / 引用 |

### 4.2 Font Weights

```
--font-weight-light:    300;
--font-weight-regular:  400;
--font-weight-medium:   500;
--font-weight-bold:     700;
```

### 4.3 Type Scale (16px base)

| Token | Size | Line-Height | Weight | Usage |
| --- | --- | --- | --- | --- |
| `--font-size-display` | 64px / 4rem | 1.1 | 700 | Hero 大标题 |
| `--font-size-h1` | 48px / 3rem | 1.15 | 700 | 页面主标题 |
| `--font-size-h2` | 36px / 2.25rem | 1.2 | 700 | 章节标题 |
| `--font-size-h3` | 28px / 1.75rem | 1.25 | 500 | 子标题 |
| `--font-size-h4` | 22px / 1.375rem | 1.3 | 500 | 卡片标题 |
| `--font-size-body-lg` | 18px / 1.125rem | 1.6 | 400 | 引言段落 |
| `--font-size-body` | 16px / 1rem | 1.6 | 400 | 默认正文 |
| `--font-size-body-sm` | 14px / 0.875rem | 1.5 | 400 | 辅助说明 |
| `--font-size-caption` | 12px / 0.75rem | 1.4 | 500 | 标签 / Caption |

---

## 5. Spacing & Layout Tokens

### 5.1 Spacing Scale (4px grid)

```
--space-0:  0;     --space-1: 4px;    --space-2: 8px;    --space-3: 12px;
--space-4: 16px;   --space-5: 24px;   --space-6: 32px;   --space-7: 48px;
--space-8: 64px;   --space-9: 96px;   --space-10: 128px;
```

### 5.2 Radius

```
--radius-sm:   4px;    /* Inputs */
--radius-md:   8px;    /* Buttons, cards */
--radius-lg:   16px;   /* Modals */
--radius-pill: 9999px;
```

### 5.3 Container & Breakpoints

```
sm:  640px    md:  768px    lg:  1024px    xl:  1280px    2xl: 1440px
```

### 5.4 Elevation

```
--shadow-sm: 0 1px 2px rgba(13, 13, 75, 0.06);
--shadow-md: 0 4px 12px rgba(13, 13, 75, 0.10);
--shadow-lg: 0 12px 32px rgba(13, 13, 75, 0.16);
```

> ⚠️ Logo 不允许使用任何 shadow（品牌规范明确禁止）。

---

## 6. Code Snippets

### 6.1 CSS Variables — `tokens.css`

```css
:root {
  /* === Primary === */
  --color-primary-navy: #0D0D4B;
  --color-primary-cyan: #16E9D7;
  --color-primary-blue: #0047BB;
  --color-primary-mist: #DAE3ED;

  /* === Secondary === */
  --color-secondary-deep-blue: #001489;
  --color-secondary-sand: #DFC5AE;
  --color-secondary-ink: #1C1F2A;
  --color-secondary-graphite: #50555B;

  /* === Premium === */
  --color-premium-bronze: #AC7C59;
  --color-premium-silver: #A0A8AE;

  /* === Tints (Navy) === */
  --color-navy-80: #3D3D6F;  --color-navy-60: #6E6E93;
  --color-navy-40: #9E9EB7;  --color-navy-20: #CFCFDB;

  /* === Tints (Blue) === */
  --color-blue-80: #336CC9;  --color-blue-60: #6691D6;
  --color-blue-40: #99B5E4;  --color-blue-20: #CCDAF1;

  /* === Tints (Cyan) === */
  --color-cyan-80: #64D9D5;  --color-cyan-60: #92E3DF;
  --color-cyan-40: #B8ECE9;  --color-cyan-20: #DCF5F4;

  /* === Gradients === */
  --gradient-momentum: linear-gradient(135deg, #0D0D4B 0%, #0047BB 50%, #16E9D7 100%);
  --gradient-trust:    linear-gradient(180deg, #0D0D4B 0%, #001489 100%);
  --gradient-growth:   linear-gradient(90deg,  #0047BB 0%, #16E9D7 100%);

  /* === Semantic === */
  --color-bg-primary: var(--color-primary-navy);
  --color-bg-surface: var(--color-secondary-ink);
  --color-bg-subtle: var(--color-primary-mist);
  --color-text-primary: #FFFFFF;
  --color-text-on-light: var(--color-secondary-ink);
  --color-text-secondary: var(--color-secondary-graphite);
  --color-text-link: var(--color-primary-cyan);
  --color-action-primary: var(--color-primary-cyan);
  --color-action-secondary: var(--color-primary-blue);
  --color-border-default: var(--color-primary-mist);
  --color-success: var(--color-primary-cyan);
  --color-info:    var(--color-primary-blue);
  --color-warning: var(--color-secondary-sand);
  --color-danger:  #E5484D;

  /* === Typography === */
  --font-family-latin:   'Plus Jakarta Sans', system-ui, sans-serif;
  --font-family-asian:   'Noto Sans', 'Plus Jakarta Sans', sans-serif;
  --font-family-arabic:  'Tajawal', sans-serif;
  --font-family-display: 'Zodiak', 'Plus Jakarta Sans', serif;

  --font-weight-light: 300; --font-weight-regular: 400;
  --font-weight-medium: 500; --font-weight-bold: 700;

  --font-size-display: 4rem;   --font-size-h1: 3rem;
  --font-size-h2: 2.25rem;     --font-size-h3: 1.75rem;
  --font-size-h4: 1.375rem;    --font-size-body-lg: 1.125rem;
  --font-size-body: 1rem;      --font-size-body-sm: 0.875rem;
  --font-size-caption: 0.75rem;

  /* === Spacing === */
  --space-0: 0;    --space-1: 4px;  --space-2: 8px;  --space-3: 12px;
  --space-4: 16px; --space-5: 24px; --space-6: 32px; --space-7: 48px;
  --space-8: 64px; --space-9: 96px; --space-10: 128px;

  /* === Radius === */
  --radius-sm: 4px; --radius-md: 8px; --radius-lg: 16px; --radius-pill: 9999px;

  /* === Shadows === */
  --shadow-sm: 0 1px 2px rgba(13, 13, 75, 0.06);
  --shadow-md: 0 4px 12px rgba(13, 13, 75, 0.10);
  --shadow-lg: 0 12px 32px rgba(13, 13, 75, 0.16);
}
```

### 6.2 Tailwind Config — `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        startrader: {
          navy: '#0D0D4B', cyan: '#16E9D7', blue: '#0047BB', mist: '#DAE3ED',
          'deep-blue': '#001489', sand: '#DFC5AE', ink: '#1C1F2A', graphite: '#50555B',
          bronze: '#AC7C59', silver: '#A0A8AE',
        },
        navy:  { DEFAULT: '#0D0D4B', 80: '#3D3D6F', 60: '#6E6E93', 40: '#9E9EB7', 20: '#CFCFDB' },
        brand: { DEFAULT: '#0047BB', 80: '#336CC9', 60: '#6691D6', 40: '#99B5E4', 20: '#CCDAF1' },
        cyan:  { DEFAULT: '#16E9D7', 80: '#64D9D5', 60: '#92E3DF', 40: '#B8ECE9', 20: '#DCF5F4' },
      },
      backgroundImage: {
        'gradient-momentum': 'linear-gradient(135deg, #0D0D4B 0%, #0047BB 50%, #16E9D7 100%)',
        'gradient-trust':    'linear-gradient(180deg, #0D0D4B 0%, #001489 100%)',
        'gradient-growth':   'linear-gradient(90deg,  #0047BB 0%, #16E9D7 100%)',
      },
      fontFamily: {
        sans:    ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        asian:   ['"Noto Sans"', '"Plus Jakarta Sans"', 'sans-serif'],
        arabic:  ['Tajawal', 'sans-serif'],
        display: ['Zodiak', '"Plus Jakarta Sans"', 'serif'],
      },
      fontSize: {
        display:   ['4rem',    { lineHeight: '1.1',  fontWeight: '700' }],
        h1:        ['3rem',    { lineHeight: '1.15', fontWeight: '700' }],
        h2:        ['2.25rem', { lineHeight: '1.2',  fontWeight: '700' }],
        h3:        ['1.75rem', { lineHeight: '1.25', fontWeight: '500' }],
        h4:        ['1.375rem',{ lineHeight: '1.3',  fontWeight: '500' }],
        'body-lg': ['1.125rem',{ lineHeight: '1.6',  fontWeight: '400' }],
        body:      ['1rem',    { lineHeight: '1.6',  fontWeight: '400' }],
        'body-sm': ['0.875rem',{ lineHeight: '1.5',  fontWeight: '400' }],
        caption:   ['0.75rem', { lineHeight: '1.4',  fontWeight: '500' }],
      },
      spacing: { 1:'4px', 2:'8px', 3:'12px', 4:'16px', 5:'24px',
                 6:'32px', 7:'48px', 8:'64px', 9:'96px', 10:'128px' },
      borderRadius: { sm:'4px', md:'8px', lg:'16px', pill:'9999px' },
      boxShadow: {
        sm: '0 1px 2px rgba(13, 13, 75, 0.06)',
        md: '0 4px 12px rgba(13, 13, 75, 0.10)',
        lg: '0 12px 32px rgba(13, 13, 75, 0.16)',
      },
    },
  },
};
```

### 6.3 SCSS Variables — `_tokens.scss`

```scss
// === STARTRADER Standalone Design Tokens ===
// Source: 2026 STARTRADER Brand Guidelines V.1

$startrader-navy:        #0D0D4B;
$startrader-cyan:        #16E9D7;
$startrader-blue:        #0047BB;
$startrader-mist:        #DAE3ED;
$startrader-deep-blue:   #001489;
$startrader-sand:        #DFC5AE;
$startrader-ink:         #1C1F2A;
$startrader-graphite:    #50555B;
$startrader-bronze:      #AC7C59;
$startrader-silver:      #A0A8AE;

$navy-80: #3D3D6F;  $navy-60: #6E6E93;  $navy-40: #9E9EB7;  $navy-20: #CFCFDB;
$blue-80: #336CC9;  $blue-60: #6691D6;  $blue-40: #99B5E4;  $blue-20: #CCDAF1;
$cyan-80: #64D9D5;  $cyan-60: #92E3DF;  $cyan-40: #B8ECE9;  $cyan-20: #DCF5F4;

$gradient-momentum: linear-gradient(135deg, $startrader-navy 0%, $startrader-blue 50%, $startrader-cyan 100%);
$gradient-trust:    linear-gradient(180deg, $startrader-navy 0%, $startrader-deep-blue 100%);
$gradient-growth:   linear-gradient(90deg,  $startrader-blue 0%, $startrader-cyan 100%);

$font-family-latin:   'Plus Jakarta Sans', system-ui, sans-serif;
$font-family-asian:   'Noto Sans', 'Plus Jakarta Sans', sans-serif;
$font-family-arabic:  'Tajawal', sans-serif;
$font-family-display: 'Zodiak', 'Plus Jakarta Sans', serif;

$font-weight-light: 300; $font-weight-regular: 400;
$font-weight-medium: 500; $font-weight-bold: 700;

$font-sizes: (display:4rem, h1:3rem, h2:2.25rem, h3:1.75rem, h4:1.375rem,
              body-lg:1.125rem, body:1rem, body-sm:0.875rem, caption:0.75rem);

$spacings: (0:0, 1:4px, 2:8px, 3:12px, 4:16px, 5:24px, 6:32px, 7:48px, 8:64px, 9:96px, 10:128px);

$radius-sm: 4px;  $radius-md: 8px;  $radius-lg: 16px;  $radius-pill: 9999px;

$shadow-sm: 0 1px 2px rgba(13, 13, 75, 0.06);
$shadow-md: 0 4px 12px rgba(13, 13, 75, 0.10);
$shadow-lg: 0 12px 32px rgba(13, 13, 75, 0.16);
```

### 6.4 Design Tokens JSON — `tokens.json`

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "brand": "STARTRADER",
  "variant": "standalone",
  "version": "1.0.0",
  "color": {
    "primary": {
      "navy": { "value": "#0D0D4B", "type": "color" },
      "cyan": { "value": "#16E9D7", "type": "color" },
      "blue": { "value": "#0047BB", "type": "color" },
      "mist": { "value": "#DAE3ED", "type": "color" }
    },
    "secondary": {
      "deep-blue": { "value": "#001489", "type": "color" },
      "sand":      { "value": "#DFC5AE", "type": "color" },
      "ink":       { "value": "#1C1F2A", "type": "color" },
      "graphite":  { "value": "#50555B", "type": "color" }
    },
    "premium": {
      "bronze": { "value": "#AC7C59", "type": "color" },
      "silver": { "value": "#A0A8AE", "type": "color" }
    },
    "gradient": {
      "momentum": { "value": "linear-gradient(135deg, #0D0D4B 0%, #0047BB 50%, #16E9D7 100%)", "type": "gradient" },
      "trust":    { "value": "linear-gradient(180deg, #0D0D4B 0%, #001489 100%)", "type": "gradient" },
      "growth":   { "value": "linear-gradient(90deg,  #0047BB 0%, #16E9D7 100%)", "type": "gradient" }
    }
  },
  "font": {
    "family": {
      "latin":   { "value": "Plus Jakarta Sans, system-ui, sans-serif", "type": "fontFamily" },
      "asian":   { "value": "Noto Sans, Plus Jakarta Sans, sans-serif", "type": "fontFamily" },
      "arabic":  { "value": "Tajawal, sans-serif", "type": "fontFamily" },
      "display": { "value": "Zodiak, Plus Jakarta Sans, serif", "type": "fontFamily" }
    },
    "weight": {
      "light": {"value":300,"type":"fontWeight"}, "regular":{"value":400,"type":"fontWeight"},
      "medium":{"value":500,"type":"fontWeight"}, "bold":{"value":700,"type":"fontWeight"}
    },
    "size": {
      "display":{"value":"4rem","type":"dimension"}, "h1":{"value":"3rem","type":"dimension"},
      "h2":{"value":"2.25rem","type":"dimension"},   "h3":{"value":"1.75rem","type":"dimension"},
      "h4":{"value":"1.375rem","type":"dimension"},  "body-lg":{"value":"1.125rem","type":"dimension"},
      "body":{"value":"1rem","type":"dimension"},    "body-sm":{"value":"0.875rem","type":"dimension"},
      "caption":{"value":"0.75rem","type":"dimension"}
    }
  },
  "spacing": {
    "0":{"value":"0","type":"dimension"},      "1":{"value":"4px","type":"dimension"},
    "2":{"value":"8px","type":"dimension"},    "3":{"value":"12px","type":"dimension"},
    "4":{"value":"16px","type":"dimension"},   "5":{"value":"24px","type":"dimension"},
    "6":{"value":"32px","type":"dimension"},   "7":{"value":"48px","type":"dimension"},
    "8":{"value":"64px","type":"dimension"},   "9":{"value":"96px","type":"dimension"},
    "10":{"value":"128px","type":"dimension"}
  },
  "radius": {
    "sm":{"value":"4px","type":"dimension"},   "md":{"value":"8px","type":"dimension"},
    "lg":{"value":"16px","type":"dimension"},  "pill":{"value":"9999px","type":"dimension"}
  }
}
```

---

## 7. UI Foundation

### 7.1 Theme Modes

| Mode | Background | Surface | Text | 默认场景 |
| --- | --- | --- | --- | --- |
| **Dark (Default)** | `#0D0D4B` Navy | `#1C1F2A` Ink | `#FFFFFF` / `#DAE3ED` | Hero、官网默认、Web App 默认 |
| **Light** | `#FFFFFF` / `#DAE3ED` Mist | `#FFFFFF` | `#1C1F2A` / `#50555B` | 内容密集型页面 |

> 🎯 默认使用深色模式，凸显 STARTRADER 的 cinematic / premium 调性。

### 7.2 Role-Based Color

| 角色 | Token | 规则 |
| --- | --- | --- |
| **Primary CTA** | `#16E9D7` Cyan | 每屏 ≤ 1 个主 CTA |
| **Secondary CTA** | `#0047BB` Blue | 次要操作 |
| **Link** | `#16E9D7` Cyan | hover 加 underline |
| **Success** | `#16E9D7` Cyan | 复用品牌色 |
| **Danger** | `#E5484D` | 唯一允许的非品牌色 |
| **Warning** | `#DFC5AE` Sand | 风险提示 |
| **Info** | `#0047BB` Blue | 普通提示 |
| **Disabled** | `#50555B` @ 40% opacity | 禁用态 |

> ⚠️ **金融涨跌色** 由地区配置控制（红涨绿跌 / 绿涨红跌不同），不直接复用品牌色。

### 7.3 Typography Hierarchy

**Marketing**

| Level | Mobile | Desktop | 用法 |
| --- | --- | --- | --- |
| Display | 40px/1.1 | 64px/1.1 | Hero 大标题 |
| H1 | 32px/1.15 | 48px/1.15 | 页面主标题 |
| H2 | 28px/1.2 | 36px/1.2 | 章节标题 |
| H3 | 22px/1.25 | 28px/1.25 | 子标题 |
| Body Lg | 18px/1.6 | 18px/1.6 | 引言段落 |
| Body | 16px/1.6 | 16px/1.6 | 正文 |

**Web App**

| Level | Desktop | 用法 |
| --- | --- | --- |
| Page Title | 32px/1.2 | 模块主标题 |
| Section | 24px/1.25 | 区块标题 |
| Card Title | 18px/1.3 | 卡片头部 |
| Body | 14–16px/1.5 | 默认 UI 文字 |
| Caption | 12px/1.4 | Label / Tooltip |
| Mono (数字) | 14px Tabular | 价格 / 订单号 |

> 💡 数字使用 `font-variant-numeric: tabular-nums`。

### 7.4 Iconography

- 风格：线性 (Outline)，stroke 1.5–2px
- 圆角：直角或 90°/180° 切角（与 STAR pattern 一致）
- 默认尺寸：16 / 20 / 24 / 32 px
- 颜色：继承文本色 (`currentColor`)

---

## 8. Components

### 8.1 Buttons

| Variant | Default | Hover | Active | Disabled |
| --- | --- | --- | --- | --- |
| **Primary** | bg `#16E9D7` / text `#0D0D4B` | bg `#64D9D5` | bg `#92E3DF` | opacity 40% |
| **Secondary** | bg `#0047BB` / text `#FFFFFF` | bg `#336CC9` | bg `#001489` | opacity 40% |
| **Ghost** | transparent / text `#FFFFFF` / border `1px #DAE3ED` | bg `rgba(255,255,255,0.08)` | bg `rgba(255,255,255,0.12)` | opacity 40% |
| **Link** | text `#16E9D7` | underline | `#64D9D5` | opacity 40% |
| **Danger** | bg `#E5484D` / text `#FFFFFF` | darker red | — | — |

**Sizes**: `sm` 32px / `md` 40px / `lg` 48px. Radius `md` (8px) 默认；marketing 可用 `pill` 制造高端感。

### 8.2 Inputs

- Height: 44px desktop / 48px mobile
- Border: 1px `#DAE3ED` → `#16E9D7` (focus) → `#E5484D` (error)
- Focus ring: `0 0 0 3px rgba(22, 233, 215, 0.24)`
- Label 上方左对齐 caption；Helper / Error 下方左对齐

### 8.3 Cards

```
background:    var(--color-bg-surface);
border:        1px solid rgba(218, 227, 237, 0.08);
border-radius: 16px;
padding:       24–32px;
shadow:        --shadow-md;
```

Hover (clickable)：`translateY(-2px)` + `shadow-lg` + 边亮至 `rgba(22, 233, 215, 0.32)`，200ms。

### 8.4 Navigation

**Marketing Top Nav**: 72px desktop / 56px mobile，透明背景 + scroll 后 `rgba(13, 13, 75, 0.85)` + blur 12px。**Logo 使用 Primary Horizontal (Inverted)**。

**Web App Sidebar**: 240px (展开) / 64px (收起)，背景 Navy。选中态左侧 4px Cyan 强调条 + 文字 Cyan。**Sidebar 顶部使用 Primary Horizontal (Inverted)，收起时切换为 Secondary Vertical (Inverted)**。

### 8.5 Modals

- 遮罩 `rgba(13, 13, 75, 0.72)` + blur 8px
- 容器 sm 400 / md 560 / lg 720
- 圆角 16px
- 入场 `fade + scale 0.96 → 1.0`，200ms ease-out
- 关闭：右上 close icon / ESC / 遮罩点击（destructive 例外）

### 8.6 Tables

- 行高 44px desktop / 52px mobile
- 斑马纹 `rgba(255,255,255,0.02)` (深模式)
- Header sticky + caption + uppercase + letter-spacing 0.04em
- 数字列右对齐 + tabular-nums
- Hover row: `rgba(22, 233, 215, 0.04)`

### 8.7 Notifications

| Type | Border Left | 持续 |
| --- | --- | --- |
| Success | 4px Cyan | 4s |
| Info | 4px Blue | 4s |
| Warning | 4px Sand | 6s |
| Error | 4px Red | 持续 |

---

## 9. Marketing Site Patterns

### 9.1 Hero

```
[ Eyebrow tag (caption, Cyan)            ]
[ Headline (display, white, Zodiak 可选) ]
[ Subhead (body-lg, mist)                ]
[ [ Primary CTA ] [ Secondary CTA ]      ]
[ Trust strip (logos / awards / numbers) ]
```

- 背景：`gradient-momentum` 或深 Navy + 3D form / 抽象元素
- 左 60% 文案，右 40% 视觉锚点
- **Logo 位置**：左上 Primary Horizontal Inverted (高度 32–40px)，Mobile 改用 Vertical
- Mobile 单列，视觉置于文案下方

**文案语气示例**：
> "Trade smarter, with confidence."
> "Global markets. Transparent terms. Trusted execution."

### 9.2 Feature Section

三栏卡片 (desktop) → 单列 (mobile)。每张：图标 Cyan + 标题 h3 + 描述 body + 文字 CTA。

### 9.3 Trust / Credibility Strip

监管牌照、奖项、合作伙伴 Logo。灰度 + opacity 0.6，hover 还原。

### 9.4 Stats Block

数字 `display` 字号 + Cyan，标签 `caption` + uppercase + Mist。**仅展示可验证数据**（trust 原则）。

### 9.5 Testimonial

引用符号 Zodiak Cyan 大号；引言 h3；头像圆形 48px + 姓名 + 角色。

### 9.6 CTA Block (Pre-Footer)

全宽 banner，`gradient-momentum` 背景；居中 H2 + Primary CTA。

### 9.7 Footer

- 背景 `#0D0D4B` Navy 纯色
- 4–5 列链接组
- 顶部：**Primary Horizontal Inverted Logo** + Tagline `Built on Trust. Driven by Growth.`
- 底部：监管声明 + 风险披露 + 社交 icon + Copyright
- 必含**风险披露语**（合规要求）

---

## 10. Web App Patterns

### 10.1 App Shell

```
┌──────────────────────────────────────────┐
│ Top Bar (account, balance, notify)       │ 56px
├────────┬─────────────────────────────────┤
│ Side   │  Main Content                   │
│ Bar    │  (with breadcrumb)              │
│ 240px  │                                 │
└────────┴─────────────────────────────────┘
```

- Sidebar 顶部 Logo：展开用 **Primary Horizontal Inverted**，收起 (64px) 用 **Vertical Inverted**
- Top bar 固定，scroll 不消失
- Mobile：sidebar 抽屉化，bottom nav

### 10.2 Dashboard

1. **Top KPI Strip** — 4 张 stat 卡（净值 / 浮动盈亏 / 余额 / 保证金）
2. **Middle Chart Area** — 主图表 + 持仓摘要
3. **Bottom Tables** — 最近订单 / 持仓 / 通知

### 10.3 Data Tables

- Sticky header + sticky 左列
- Pagination 或虚拟滚动 (>200 行)
- Empty state：极简插画 + 提示 + CTA
- 列设置可自定义，存 localStorage

### 10.4 Trade Ticket

- 浮动面板（右侧 / 弹窗）
- 字段：标的 → 方向 → 类型 → 数量 → 止盈止损 → 预览 → 确认
- 关键数字 Cyan + Bold
- 提交前必显示**确认弹窗**

### 10.5 Charts

- 深色 Navy 背景；主线 Cyan
- 网格线 `rgba(255,255,255,0.06)`
- Tooltip：Ink 表面 + Mist 边框 + 数字 Cyan

### 10.6 Empty / Error / Loading

| State | 设计 |
| --- | --- |
| Empty | 极简插画 (线性 Cyan) + 标题 + 说明 + CTA |
| Loading | Skeleton (Mist 灰条 + shimmer) |
| Error | 红色 icon + 标题 + 详情 + Retry |

---

## 11. Motion

| 用途 | Easing | Duration |
| --- | --- | --- |
| Micro (hover, focus) | `cubic-bezier(0.4, 0, 0.2, 1)` | 150ms |
| UI 转场 | `cubic-bezier(0.16, 1, 0.3, 1)` | 200–300ms |
| Page 转场 | `ease-in-out` | 400ms |
| Number ticker | `cubic-bezier(0.4, 0, 0.2, 1)` | 600ms |

**原则**：动效服务于引导，不为存在而存在；尊重 `prefers-reduced-motion`。

**标志性 Moments**：Hero 入场（stagger fade-up 80ms 间隔）；Stats counter 数字滚动 600ms；Chart line draw 800ms。

---

## 12. Imagery

### 12.1 Photography

- 电影感、聚焦、以人为本
- 表达 ambition / progress / resilience，通过真实情感、诚实瞬间、精致构图
- 滤镜：微降饱和 + 提高对比 + 轻微暖偏

### 12.2 Illustration

- 极简、现代、精准；用清晰方式呈现复杂概念
- 仅用于教育内容 / Empty state
- 风格：单线 + Cyan/Blue 渐变 fill
- ❌ 严禁 emoji 风、卡通风、3D 立体卡通

### 12.3 3D Forms

- 用于 Hero 视觉锚点、Banner、报告封面
- 材质：金属 (Bronze/Silver) + 玻璃 + Navy 背景反射

### 12.4 STAR Pattern

- 仅大块背景装饰
- **必须使用 90° 或 180° 切角**
- 透明度 ≤ 10%，避免压制内容

---

## 13. Accessibility

- 对比度：正文 ≥ 4.5:1，大字 ≥ 3:1（WCAG AA）
- 焦点态：所有可交互元素必有可见 focus ring (Cyan 24%)
- 键盘：所有操作支持 Tab/Enter/Esc
- Touch target：移动端 ≥ 44×44px
- Alt text：所有图片必填；Logo 的 alt 必须是 `STARTRADER`
- 涨跌色：必配 ▲▼ 符号，不能单靠颜色
- Reduced motion：尊重系统设置
- RTL：阿拉伯语支持镜像布局

---

## 14. Quality Checklist

**Visual**
- [ ] 色值与 tokens 一致，无 hex 硬编码
- [ ] 字体使用 Plus Jakarta Sans / Noto Sans / Tajawal / Zodiak
- [ ] **Logo 使用本文档定义的 STARTRADER 独立资产，不混入合作伙伴 lockup**
- [ ] Logo 无阴影、无形状容器、保留 clear space
- [ ] Premium 色面积 ≤ 5%
- [ ] STAR pattern 切角为 90° / 180°

**Logo**
- [ ] 深底用 `_Inverted_` 版本，浅底用标准 RGB 版本
- [ ] 空间充足时优先使用 Primary Horizontal
- [ ] 中等容器使用 Stacked，方形 / 极窄空间使用 Vertical
- [ ] alt 文本为 `STARTRADER`（不拆词、全大写）

**Layout**
- [ ] 12 列网格 + 4px 间距倍数
- [ ] Section 留白充足
- [ ] sm/md/lg/xl 响应式断点覆盖

**Components**
- [ ] 每屏 ≤ 1 个 Primary CTA
- [ ] 表单字段全部有 label + helper + error 态
- [ ] 表格 sticky header + tabular-nums
- [ ] Empty / Loading / Error 三态完整

**Motion**
- [ ] 动效 ≤ 400ms（叙事性除外）
- [ ] 支持 `prefers-reduced-motion`

**A11y**
- [ ] 对比度通过 WCAG AA
- [ ] Tab 顺序合理
- [ ] 涨跌色配 ▲▼ 符号

**Copy**
- [ ] tone：professional / confident / human
- [ ] `STARTRADER` 始终全大写不拆词
- [ ] 无营销噪音

---

## 15. Governance

- **Brand Owner**: STARTRADER Brand Department
- **Contact**: `brandhub@startrader.com`
- **Website**: [www.startrader.com](https://www.startrader.com)
- **Source**: 2026 STARTRADER Brand Guidelines V.1
- 所有 Logo 使用必须经过 STARTRADER 批准
- 本文档与现有合作协议冲突时，**协议优先**
