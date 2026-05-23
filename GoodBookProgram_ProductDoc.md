# The Good Book Program
### Product Design Document
**STARTRADER Reading Growth Program · Employee Learning Benefit Platform · StarTrader & StarPrime**
*Version 3.0 · 2026 · Confidential*

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Program Rules & Logic](#2-program-rules--logic)
3. [System Architecture](#3-system-architecture)
4. [Frontend — Landing Page](#4-frontend--landing-page)
5. [Frontend — Member Registration](#5-frontend--member-registration)
6. [Frontend — Member Login & Forgot Password](#6-frontend--member-login--forgot-password)
7. [Frontend — Admin Login](#7-frontend--admin-login)
8. [Frontend — Member Dashboard](#8-frontend--member-dashboard)
9. [AI Recommendation Engine](#9-ai-recommendation-engine)
10. [HR Admin Backend](#10-hr-admin-backend)
11. [Data & Analytics](#11-data--analytics)
12. [Tech Stack & Deployment](#12-tech-stack--deployment)
13. [Brand & Design System](#13-brand--design-system)
14. [Future Expansion](#14-future-expansion)
15. [Quality Checklist](#15-quality-checklist)

---

## 1. Project Overview

The STARTRADER Reading Growth Program is an internal employee learning initiative that encourages long-term continuous learning through personalized AI-powered book recommendations. Every staff member receives one company-funded book per quarter, matched to their real work challenges by AI. HR handles purchasing and fulfillment, and employee reviews build a shared knowledge layer across the organization.

> **This is not simply a book reimbursement system.**
> It is a company culture project, a long-term employee growth system, an AI-powered learning recommendation platform, and a lightweight internal knowledge ecosystem.

### 1.1 Core Vision

> *One Book. One Quarter. One Step Forward.*

> *Read. Grow. Succeed.*
> Invest in your future through continuous learning.

### 1.2 Core Value Proposition

| Audience | Value |
|---|---|
| **For employees** | A free, personalized book every quarter matched to their actual challenges — not a generic catalogue |
| **For the company** | Continuous learning culture, employee satisfaction signal, and a growing internal knowledge base from book reviews |

### 1.3 Key Numbers

| Metric | Value |
|---|---|
| Budget per quarter | **$80 USD** — company-funded |
| AI recommendations | **5 books** per request, ranked by relevance |
| Frequency | **1 book** per calendar quarter |
| Quarters per year | **4** (Q1–Q4) |

### 1.4 Eligible Companies

The platform is restricted to employees of the following entities. Email registration is gated at the domain level:

- **StarTrader** — `@startrader.com`
- **StarPrime** — `@starprime.com`

Employees from any other domain will be rejected at registration and at the password reset step.

### 1.5 Target Goals

**Employee Goals**
- Encourage consistent learning habits
- Provide personalized growth recommendations
- Increase employee engagement and motivation
- Create a culture of reading and self-improvement

**Company Goals**
- Build long-term learning culture
- Understand employee challenges and interests at scale
- Enable knowledge-sharing across departments
- Increase employee retention and satisfaction
- Build internal intellectual capital over time

---

## 2. Program Rules & Logic

### 2.1 Eligibility & Quota

| Rule | Detail |
|---|---|
| Eligible users | All active employees with `@startrader.com` or `@starprime.com` email |
| Frequency | One book per calendar quarter (Q1–Q4) |
| Budget cap | $80 USD per selection, company-funded |
| Expiry | Unused quota expires at end of quarter — no rollover |
| Reminder | Email / internal notification at 30 days and 7 days before expiry |

### 2.2 Selection Flow

1. Employee logs in and navigates to the **"This Quarter"** tab
2. Employee describes their current work challenges, career goals, or skills to improve
3. AI processes the description and returns **5 books** ranked by relevance
4. Employee reviews recommendations and selects one book
5. Employee confirms: selected book, delivery address, reading goal, expected completion date
6. Submission sent to HR queue — status shows "Pending HR Approval"
7. HR reviews, approves, and places order with supplier
8. Book is packaged in STARTRADER brand style and shipped
9. Book arrives — employee receives tracking notification
10. After reading, employee submits a review *(encouraged, not enforced)*

### 2.3 Review Policy

> **The only ask: a short review.**
>
> Employees are encouraged (not required) to share key takeaways, a reflection, a favorite quote, and a recommendation rating after reading. Reviews are visible to colleagues in the Community feed, building a company-wide reading knowledge base. Reviews contribute to improved AI recommendations over time.

### 2.4 Budget & Approval Rules

- Books priced above $80 are ineligible for selection
- Shipping is covered by the company — not deducted from the $80 budget
- HR has override capability to approve edge cases (e.g. textbooks slightly over budget)
- Unused quarterly budget does **not** carry forward to the next quarter
- If an employee leaves the company mid-quarter, their quota is automatically cancelled

---

## 3. System Architecture

### 3.1 Module Overview

| Layer | Components | Responsibility |
|---|---|---|
| **Employee Frontend** | Landing, Register, Login, Dashboard, Book Selector, My Shelf, Community, Achievements | User-facing web app |
| **AI Engine** | NLP intent parser, Book vector database, Recommendation ranker, Explanation generator | Smart matching layer |
| **HR Backend** | Order queue, Approval workflow, Packaging & shipping tracker, Quota manager | Operations layer |
| **Data & Analytics** | Reading insights, User profiles, Book performance, ROI reports, Growth trends | Intelligence layer |

### 3.2 Data Flow

```
Employee input (challenges / goals)
    → AI engine (NLP + vector search)
    → Ranked book list (5 books + reasons + metadata)
    → Employee selects one + confirms delivery details
    → HR approval queue
    → Purchase → Packaging → Fulfillment
    → Delivered to employee
    → Employee writes review
    → Analytics + feedback loop
    → Improved AI recommendations
```

### 3.3 Authentication Model

| Role | Method | Domain restriction | Session |
|---|---|---|---|
| Member | Email + password (JWT) | `@startrader.com` / `@starprime.com` only | 30-day persistent (optional) |
| Admin (HR / Learning / Ops / Super) | Email + password (JWT) | HR-provisioned accounts only | Session-only (security) |
| Password reset | Time-limited token | Same domain restriction as registration | 15 minutes expiry |

> **Note:** Email domain validation is enforced **server-side** — not client-side only.

---

## 4. Frontend — Landing Page

### 4.1 Purpose

The landing page is the primary public-facing entry point. It communicates the program's value to employees, drives registration, and provides navigation to all auth flows.

### 4.2 Layout Sections

| Section | Content |
|---|---|
| Navigation bar | STARTRADER logo (Primary Horizontal), Sign in (ghost button), Create account (solid button) — sticky on scroll |
| Hero — left | Eyebrow label, headline, body copy, CTA button + budget note |
| Hero — right | Stat cards ($80 / 5 books), three feature highlight cards |
| How it works | Three numbered steps: Tell us → Receive shortlist → We handle the rest |
| Footer | Copyright, Admin portal link, Privacy, Support |

### 4.3 Hero Copy

```
One Book. One Quarter. One Step Forward.

Your company funds one book every quarter — matched to
your exact challenges by AI. HR handles everything else.

[ Get started — it's free ]    $80 budget · No paperwork
```

### 4.4 Feature Cards

1. **AI matched to your work** — Describe current challenges, receive five books ranked by relevance with a personal explanation for each
2. **Company-branded packaging** — Each book arrives gift-wrapped with your name on it. One request: write a short review when done
3. **Learn what colleagues read** — Browse real reviews and CEO picks from across the company

### 4.5 Design Notes

- Split-grid hero: left = editorial copy, right = product proof
- Member pages use the warm paper background `#FAF7F2` with amber accent `#B5601A` (Good Book editorial layer)
- Lora serif for display headings, Plus Jakarta Sans for UI text
- "Admin portal" link in footer is intentionally subtle — for HR use only

---

## 5. Frontend — Member Registration

### 5.1 Layout

Split-screen: dark left panel (brand + social proof book pills) and light right panel (registration form).

### 5.2 Form Fields

| Field | Type | Validation |
|---|---|---|
| Work email | Email | Required · Must end in `@startrader.com` or `@starprime.com` |
| Full name | Text | Required |
| Department | Dropdown | Required · 9 options including Other |
| Password | Password | Required · Min 8 characters · show/hide toggle |
| Confirm password | Password | Must match password field |
| Terms agreement | Checkbox | Required to submit |

**Department options:** Engineering, Product, Design, Sales, Marketing, Operations, Finance, HR, Other

### 5.3 Domain Restriction Logic

```javascript
const allowedDomains = ["startrader.com", "starprime.com"];

// On form submit:
const domain = email.split("@")[1];
if (!allowedDomains.includes(domain)) {
  showError("Only @startrader.com or @starprime.com email addresses are allowed.");
  return;
}
```

Domain pills are displayed below the email field as a visual affordance.

### 5.4 States

| State | Behavior |
|---|---|
| Default | Clean form, domain pills visible |
| Validation error | Inline red text below each failing field, red border on input |
| Domain rejected | Red error under email: "Only @startrader.com and @starprime.com addresses are allowed." |
| Success | Green banner: "Account created successfully! Please check your email to verify your address." |

---

## 6. Frontend — Member Login & Forgot Password

### 6.1 Member Login

Same split-screen layout as registration.

Left panel tagline: *"Welcome Back. Continue Your Reading Journey."*

Quarterly open status shown to create urgency.

| Field / Element | Detail |
|---|---|
| Email field | Standard email input |
| Password field | Password input with show/hide toggle |
| Forgot password | Text link below password → routes to Forgot Password page |
| Remember me | Checkbox: persist session for 30 days |
| Error state | Inline red: "Incorrect email or password" |
| Register link | Footer: "Don't have an account? Create one" → Register page |

### 6.2 Forgot Password

Dedicated page, same split layout. Left panel tagline: *"Let's get you back to your shelf."*

| Element | Detail |
|---|---|
| Email field | Required · must be `@startrader.com` or `@starprime.com` |
| Domain validation | Same allowlist check as registration |
| Reset token expiry | **15 minutes** |
| Success banner | "Reset link sent! Check your inbox. The link expires in 15 minutes." |
| Info note | Check spam folder · 2-minute delivery SLA |

> **Security note:** The forgot password flow uses the same domain restriction as registration. This prevents non-employees from probing whether an email address is registered in the system.

---

## 7. Frontend — Admin Login

### 7.1 Visual Design

The admin login uses the **full StarTrader dark brand** to signal restricted access — distinct from the warm editorial member product.

| Token | Value | Usage |
|---|---|---|
| Background | `#0D0D4B` | StarTrader Navy |
| Card surface | `#1C1F2A` | StarTrader Ink |
| Border | `rgba(218,227,237,0.08)` | StarTrader Mist at low opacity |
| Accent | `#16E9D7` | StarTrader Cyan — inputs, buttons, focus |
| Text primary | `#FFFFFF` | White on dark |
| Text muted | `#50555B` | StarTrader Graphite |
| Gradient overlay | `--gradient-trust` | Navy → Deep Blue |

### 7.2 Form Fields

- Admin email — standard email input (Cyan focus ring)
- Password — with show/hide toggle
- Stay signed in — checkbox (session-only by default for security)
- Forgot password — links to admin-specific recovery

### 7.3 Access Control

> **Admin accounts are NOT self-registerable.**
>
> Admin credentials are provisioned by IT / system administrator only. No public-facing registration route exists for the admin role. All admin actions are logged with timestamp and user ID.

**Admin roles:**

| Role | Access scope |
|---|---|
| HR | Order management, employee quota, fulfillment |
| Learning Team | Book library, AI tuning, reading analytics |
| Operations | Shipping, supplier management |
| Super Admin | Full access — all roles combined |

### 7.4 Page Elements

- STARTRADER Primary Horizontal Inverted logo — top of card
- **"Admin Portal"** pill badge — top right of card
- Subtitle: *"HR Administration Dashboard · Restricted access"*
- Return to main site link at bottom

---

## 8. Frontend — Member Dashboard

### 8.1 Navigation

After login, members access a four-tab interface:

| Tab | Contents |
|---|---|
| **This Quarter** | Current quota status, AI input, book recommendations |
| **My Shelf** | History of received books and review management |
| **Community** | Company-wide review feed, CEO picks, reading wall |
| **Achievements** | Badges earned, reading streaks, leaderboard |

### 8.2 This Quarter Tab

| Element | Detail |
|---|---|
| Quota card | $80 budget display · USD XX Remaining · XX Days Left · days-to-expiry countdown · progress bar |
| AI input | Free-text textarea: *"What's on your plate lately? What do you want to learn or improve?"* |
| Submit button | "Recommend five books for me" — triggers AI call |
| Recommendation list | 5 book cards ranked #1–#5 |
| Select & submit bar | Sticky bottom bar: selected book name + price + "Submit to HR" button |

**Recommendation card fields:**
- Rank badge (e.g. "Best match #1", "#2"…)
- Relevance percentage (e.g. "97% relevant")
- Book cover (color-coded block with italic title)
- Title, author
- "Why this fits" — AI-generated explanation tailored to employee's input
- "Problem it solves" — one-line statement of the specific challenge this book addresses
- Topic tags (e.g. "People leadership", "Team dynamics")
- Difficulty: Beginner / Intermediate / Advanced
- Estimated reading time
- Price + budget status

**Book selection confirmation (after employee clicks "Select"):**

Employee confirms before final submission:
- Selected book (title, author, price)
- Delivery address
- Reading goal — *"What do you hope to take away from this book?"*
- Expected completion date
- Confirm & submit → Status: "Pending HR Approval"

### 8.3 My Shelf Tab

- Grid of past quarterly books with title, author, quarter label, star rating, review excerpt
- Books without a review: dashed card border + "Write a review ↗" prompt
- AI writing assistant available to help draft reviews

**Review submission fields:**
- Star rating (1–5)
- Key takeaways — *"What did you learn?"*
- Short reflection — *"How did this book change your thinking?"*
- Favorite quote from the book
- Recommendation rating — *"Would you recommend this to a colleague?"*
- Optional photo upload (book + workspace)

### 8.4 Community Tab

- **Reading Wall** — Grid of recent reviews from across the company (all entities)
- **CEO Picks** — Curated list of books recommended by leadership
- **Most Active Readers** — Top contributors this quarter
- **Popular Categories** — Trending topics across the employee base
- Each review card: colleague initials avatar, department, quarter, book title, review quote, star rating
- "Add to my candidates ↗" — flags a book for next quarter's consideration

### 8.5 Achievements Tab

| Badge | Earned by |
|---|---|
| **First Book Reader** | Completed first quarterly book |
| **Quarterly Learner** | Consistent reading for 2+ consecutive quarters |
| **Knowledge Sharer** | Posted a quality review (min. 100 words) |
| **AI Explorer** | Used AI recommendations 3+ times |
| **Growth Champion** | Top active learner in department this quarter |

Reading streak counter and department leaderboard displayed alongside badges.

---

## 9. AI Recommendation Engine

### 9.1 Three-Stage Pipeline

| Stage | Name | Description |
|---|---|---|
| 1 | **Semantic understanding** | NLP processes the employee's description, extracting intent, pain points, skill gaps, career goals, and contextual themes — not just keywords |
| 2 | **Book matching** | Vector similarity search against the curated book library. Books are pre-embedded; the employee's parsed intent is matched against them |
| 3 | **Explanation generation** | For each recommended book, the AI generates a "why this fits" explanation, a "problem it solves" statement, and difficulty/time estimates — all tailored to the employee's stated situation |

### 9.2 AI Workflow

```
Employee Input (free text)
    ↓
Keyword Extraction
    ↓
Intent Analysis (challenges / goals / skill gaps)
    ↓
Book Matching (vector similarity)
    ↓
Ranking Engine (relevance score)
    ↓
Explanation Generation (why + problem solved)
    ↓
Personalized Recommendation (5 books)
```

### 9.3 Example Input → Output

**Employee input:**
> "I want to improve my leadership and communication skills when managing a sales team."

**AI output (top recommendation):**
- **Book:** The Manager's Path — Camille Fournier
- **Relevance:** 97%
- **Why this fits:** "A practical guide to leading diverse teams and building shared direction as you grow from individual contributor to manager. Covers exactly the friction points that make early management hard: trust, alignment, and building a team that functions without you holding it together."
- **Problem it solves:** Feeling scattered when managing people with different backgrounds and priorities
- **Difficulty:** Intermediate · **Reading time:** ~6 hours

### 9.4 Book Library

- Curated catalogue of ~2,000 titles
- Each book pre-tagged: topics, themes, audience seniority, difficulty (Beginner/Intermediate/Advanced), estimated reading time, recommended roles/departments
- Books pre-embedded as vectors for semantic similarity search
- Library updated quarterly by HR/Learning Team
- Out-of-print or unavailable titles auto-excluded from recommendations

### 9.5 Feedback Loop

- Highly-rated books gain recommendation weight over time
- Books consistently selected but poorly reviewed are downranked
- Individual employee reading history informs future recommendations *(opt-in)*
- Review sentiment analysis feeds quarterly library quality reports
- Common employee challenge patterns surface to Learning Team as curriculum signals

---

## 10. HR Admin Backend

### 10.1 Order Queue

| Feature | Detail |
|---|---|
| Queue view | Employee name, department, selected book, price, submission date |
| Order status flow | Pending → Approved → Purchased → Packaging → Shipped → Delivered |
| Actions | One-click approve / reject with optional note |
| Bulk approval | Approve all orders under $80 in one action |
| Notifications | Email to employee on approval or rejection |
| Override | HR can approve edge cases above $80 budget |

### 10.2 Employee Management

| Feature | Detail |
|---|---|
| View all employees | Searchable, filterable by department, company, status |
| Quota override | HR can manually extend or cancel quota per employee |
| Offboarding | Mark as inactive — auto-cancels pending orders and quota |
| Learning activity | View per-employee: AI queries, books selected, reviews written |
| Reading history | Full per-employee book history with ratings and review quality |
| Usage report | Budget spent, participation rate, review rate per employee |

### 10.3 Book Library Management

- Add new books: title, author, ISBN, price, category, difficulty, recommended roles, keywords, rating
- Mark books as unavailable or out-of-budget
- Review and action employee book suggestions
- Bulk import via CSV

### 10.4 Fulfillment Workflow

1. HR approves order in backend
2. System generates purchase request to preferred book supplier
3. Supplier confirms stock and shipping estimate
4. Book is packaged in STARTRADER brand style (branded packaging, personalized message card, bookmark, company growth quote)
5. HR marks order as "Packaging" → "Shipped" + inputs tracking number
6. Employee receives shipping notification with tracking link
7. On delivery confirmation, system prompts employee for review (soft nudge, not required)

**STARTRADER packaging includes:**
- Branded outer packaging
- Personalized message card: *"This book is selected for your next stage of growth. Keep learning. Keep growing."*
- Reading bookmark
- Company growth quote

---

## 11. Data & Analytics

### 11.1 Reading Insights

- Completion rate — reviews written / books received
- Average star rating by book, department, quarter
- Most-reviewed topics and themes company-wide
- Word cloud generated from review text corpus
- Most popular book categories by department
- Employee growth trends over time

### 11.2 User Profiles

- Reading history per employee (books, ratings, review sentiment)
- Interest cluster mapping — what topics each employee gravitates toward
- Department-level heatmap: which teams read what
- Participation rate by department and quarter
- Achievement badge progress per employee
- Common challenges surfaced from AI input history

### 11.3 Book Library Performance

- Most recommended vs most selected — identifies recommendation quality gaps
- Recommendation acceptance rate per book
- Books with high recommendation rate but low review scores — candidates for removal
- Trending titles across the employee base
- Difficulty distribution — are employees choosing appropriate-level books?

### 11.4 ROI Reporting

| Metric | Definition |
|---|---|
| Budget utilization | Total spend vs total budget available, unused quota value by quarter |
| Participation rate | % of eligible employees who used their quarterly benefit |
| Review rate | % of received books that received a written review |
| Avg. reading completion | Self-reported completion vs expected completion date |
| Cost per review | Total program cost ÷ total reviews — measures knowledge generation value |
| Employee growth trends | Year-on-year reading engagement and topic diversity per person |
| Challenge signal | Most common employee challenges from AI input — informs L&D strategy |
| Export formats | PDF summary, CSV raw data, quarterly email digest to leadership |

---

## 12. Tech Stack & Deployment

### 12.1 Recommended Stack

| Layer | Technology | Notes |
|---|---|---|
| Frontend Framework | **Next.js** | App Router, SSR/SSG, API routes built-in |
| UI Library | React + **shadcn/ui** | Accessible component primitives |
| Styling | Tailwind CSS + CSS variables | StarTrader design token system |
| Animations | **Framer Motion** | Smooth page transitions, badge animations |
| Backend | Next.js API routes or Node.js + Express | REST |
| ORM | **Prisma** | Type-safe database access |
| Database | PostgreSQL via **Neon** | Serverless-friendly cloud Postgres |
| AI / Embeddings | Claude API (claude-sonnet-4-6) + text-embedding | NLP intent + explanations |
| Vector DB | pgvector (Neon extension) | Book embedding store, co-located with main DB |
| Auth | JWT + bcrypt | Stateless, scalable |
| Email | Resend | Transactional email |
| File storage | AWS S3 | Book cover images, photo uploads |
| Hosting | Vercel | Frontend + serverless API |

### 12.2 Database Schema (Key Tables)

```
users
  id, email, first_name, last_name, department, company, role,
  password_hash, created_at, is_active

quotas
  id, user_id, quarter, year, budget_usd, used_usd,
  expires_at, status [available|used|expired|cancelled]

orders
  id, user_id, book_id, quarter, year,
  status [pending|approved|purchased|packaging|shipped|delivered],
  delivery_address, reading_goal, expected_completion_date,
  submitted_at, approved_at, shipped_at, tracking_number, hr_note

books
  id, title, author, isbn, price_usd, category, difficulty,
  recommended_roles[], tags[], keywords[], embedding_vector,
  internal_rating, is_available, added_at

recommendations
  id, user_id, session_id, input_text, books_returned[],
  selected_book_id, created_at

reviews
  id, user_id, book_id, order_id, rating, key_takeaways, reflection,
  favorite_quote, would_recommend, photo_url, is_public, created_at

badges
  id, user_id, badge_type, earned_at

analytics
  id, user_id, event_type, metadata, created_at

departments
  id, name, company
```

### 12.3 Security Requirements

- All passwords hashed with **bcrypt** (minimum 12 rounds)
- JWT tokens expire in **24 hours** (member) / **8 hours** (admin)
- HTTPS enforced on all routes
- Admin endpoints protected by role middleware
- Rate limiting on auth endpoints (max 5 attempts / 15 min per IP)
- Email domain validation performed **server-side** — not client-side only
- Admin login is a separate endpoint — not accessible from member routes
- All admin actions logged with timestamp and user ID

---

## 13. Brand & Design System

The STARTRADER Reading Growth Program uses a **two-layer design system**:

- **Layer 1 — StarTrader Brand Foundation**: Official corporate identity (Navy, Cyan, Plus Jakarta Sans). Applied to admin portal and all structural brand elements.
- **Layer 2 — Good Book Editorial Extension**: A warm, library-inspired overlay (Paper, Amber, Lora serif). Applied to member-facing pages to create an inviting, premium reading atmosphere.

### 13.1 StarTrader Brand Foundation

| Field | Value |
|---|---|
| **Brand Name** | `STARTRADER` (ALL CAPS, single word, no abbreviation) |
| **Tagline** | Built on Trust. Driven by Growth. |
| **Program Tagline** | One Book. One Quarter. One Step Forward. |
| **Values** | Strength · Trust · Ambition · Resilience |
| **Personality** | Confident, sharp, reliable, forward-looking |
| **Tone** | Professional, confident, human |

**Name rules:** Never write `Star Trader`, `Startrader`, `STAR TRADER`, `ST`, or any abbreviation. Never split across a line break.

### 13.2 Logo Assets & Usage

Logo files are located in `./STARTRADER LOGO/`.

```
./STARTRADER LOGO/
├── WEB/
│   ├── STARTRADER_Primary_Logo_RGB.png          ← light backgrounds
│   ├── STARTRADER_Primary_Logo_Inverted_RGB.png  ← dark backgrounds
│   └── (JPG variants)
└── WEB Secondary/
    ├── STARTRADER_Secondary_Stacked_Logo_RGB.png
    ├── STARTRADER_Secondary_Stacked_Inverted_Logo_RGB.png
    ├── STARTRADER_Secondary_Vertical_Logo_RGB.png
    └── STARTRADER_Secondary_Vertical_Inverted_Logo_RGB.png
```

**Logo selection guide:**

```
Width:height ≥ 3:1?
  Yes → Primary Horizontal (default)
  No → Square/near-square → Stacked
       Narrow/tall → Vertical

Background ≥ 50% dark?
  Yes → _Inverted_ version
  No  → RGB version
```

**Placement per page:**

| Page | Logo variant |
|---|---|
| Landing nav (light paper bg) | Primary Horizontal RGB |
| Register / Login left panel (dark) | Primary Horizontal Inverted |
| Admin login (dark Navy) | Primary Horizontal Inverted |
| Admin sidebar expanded | Primary Horizontal Inverted |
| Admin sidebar collapsed | Secondary Vertical Inverted |

**Do / Don't:**

| ✅ DO | ❌ DON'T |
|---|---|
| Use Inverted on dark, RGB on light | Rotate or distort the logo |
| Maintain clear space (= Cyan star-tip width) | Add drop shadow or shape container |
| Use SVG/PNG with transparent background | Use any color outside the brand palette |
| Alt text: `STARTRADER` | Write `Star Trader` or abbreviate |

**HTML implementation:**

```html
<picture>
  <source
    media="(prefers-color-scheme: dark)"
    srcset="/assets/STARTRADER LOGO/WEB/STARTRADER_Primary_Logo_Inverted_RGB.png"
  />
  <img
    src="/assets/STARTRADER LOGO/WEB/STARTRADER_Primary_Logo_RGB.png"
    alt="STARTRADER"
    height="40"
    style="width: auto;"
  />
</picture>
```

---

### 13.3 Color System

#### StarTrader Official Tokens

| Token | Hex | Usage |
|---|---|---|
| `--color-primary-navy` | `#0D0D4B` | Admin backgrounds, dark panels |
| `--color-primary-cyan` | `#16E9D7` | Admin CTAs, focus rings, links |
| `--color-primary-blue` | `#0047BB` | Secondary actions |
| `--color-primary-mist` | `#DAE3ED` | Borders, light surface, dividers |
| `--color-secondary-ink` | `#1C1F2A` | Admin card surfaces, dark text |
| `--color-secondary-graphite` | `#50555B` | Secondary labels, icons |
| `--color-secondary-sand` | `#DFC5AE` | Warm mid-tone (bridge between layers) |
| `--color-danger` | `#E5484D` | Error states only |

**Gradients:**

```
--gradient-momentum: linear-gradient(135deg, #0D0D4B 0%, #0047BB 50%, #16E9D7 100%);
--gradient-trust:    linear-gradient(180deg, #0D0D4B 0%, #001489 100%);
--gradient-growth:   linear-gradient(90deg,  #0047BB 0%, #16E9D7 100%);
```

#### Good Book Editorial Extension

| Token | Hex | Usage |
|---|---|---|
| `--gb-paper` | `#FAF7F2` | Member page backgrounds |
| `--gb-ink` | `#1E1810` | Headings, primary text (member) |
| `--gb-ink-mid` | `#5A4A3A` | Body text (member) |
| `--gb-ink-light` | `#9E8E7A` | Labels, secondary text |
| `--gb-ink-faint` | `#D4C8B8` | Placeholder, disabled text |
| `--gb-amber` | `#B5601A` | CTAs, highlights, selected states (member) |
| `--gb-amber-deep` | `#8A4510` | Amber hover state |
| `--gb-amber-light` | `#FDF0E6` | Tag backgrounds, info boxes |
| `--gb-border` | `#E8E0D4` | Card borders, dividers (member) |

#### Page Theme Map

| Page | Layer | Background | Primary accent |
|---|---|---|---|
| Landing | Good Book | `#FAF7F2` paper | `#B5601A` amber |
| Register | Both | Left: `#1E1810` · Right: `#FAF7F2` | `#B5601A` amber |
| Member Login | Both | Left: `#1E1810` · Right: `#FAF7F2` | `#B5601A` amber |
| Forgot Password | Both | Left: `#1E1810` · Right: `#FAF7F2` | `#B5601A` amber |
| **Admin Login** | **StarTrader** | `#0D0D4B` navy | `#16E9D7` cyan |
| Member Dashboard | Good Book | `#FAF7F2` paper | `#B5601A` amber |
| **Admin Dashboard** | **StarTrader** | `#0D0D4B` navy | `#16E9D7` cyan |

---

### 13.4 Typography

#### Font Families

| Script | Font | Usage |
|---|---|---|
| UI / Admin (primary) | **Plus Jakarta Sans** | All admin pages, form labels, navigation |
| Display / Member (editorial) | **Lora** (serif) | Member page headings, book cover titles |
| UI Body (member) | **DM Sans** | Member dashboard body text, labels |
| Asian (CJK) | **Noto Sans** | CJK content where needed |

**Font weights:** `300` light · `400` regular · `500` medium · `700` bold

#### Type Scale

| Role | Size | Weight | Usage |
|---|---|---|---|
| Display | 64px / 4rem | 700 | Hero headlines |
| H1 | 48px / 3rem | 700 | Page titles |
| H2 | 36px / 2.25rem | 700 | Section headings |
| H3 | 28px / 1.75rem | 500 | Card / sub-section titles |
| Body Lg | 18px / 1.125rem | 400 | Lead paragraphs |
| Body | 16px / 1rem | 400 | Default text |
| Body Sm | 14px / 0.875rem | 400 | Helper text, captions |
| Caption | 12px / 0.75rem | 500 | Tags, labels |

> Numbers (prices, budgets, percentages) use `font-variant-numeric: tabular-nums` for alignment.

---

### 13.5 Spacing & Sizing

**4px grid:**

```
--space-1: 4px    --space-2: 8px    --space-3: 12px   --space-4: 16px
--space-5: 24px   --space-6: 32px   --space-7: 48px   --space-8: 64px
--space-9: 96px   --space-10: 128px
```

**Border radius:**

```
--radius-sm: 4px     /* inputs (admin) */
--radius-md: 8px     /* buttons (admin), cards (admin) */
--radius-lg: 16px    /* modals */
--radius-pill: 9999px

--gb-radius-card: 12px     /* member cards */
--gb-radius-input: 10px    /* member inputs */
--gb-radius-button: 10px   /* member buttons */
```

**Shadows:**

```
--shadow-sm: 0 1px 2px rgba(13, 13, 75, 0.06);
--shadow-md: 0 4px 12px rgba(13, 13, 75, 0.10);
--shadow-lg: 0 12px 32px rgba(13, 13, 75, 0.16);
```

**Breakpoints:** `sm: 640px` · `md: 768px` · `lg: 1024px` · `xl: 1280px` · `2xl: 1440px`

---

### 13.6 Components

#### Buttons

**Member pages (Good Book layer):**

| Variant | Default | Hover |
|---|---|---|
| Primary | `#B5601A` amber fill · white text | `#8A4510` amber deep |
| Ghost | Transparent · `0.5px #D4C8B8` border | Amber text |
| Solid dark | `#1E1810` ink fill · white text | Slightly lighter |

**Admin pages (StarTrader layer):**

| Variant | Default | Hover | Disabled |
|---|---|---|---|
| Primary | `#16E9D7` cyan bg · `#0D0D4B` text | `#64D9D5` | 40% opacity |
| Secondary | `#0047BB` blue bg · white text | `#336CC9` | 40% opacity |
| Ghost | Transparent · `1px #DAE3ED` border · white text | `rgba(255,255,255,0.08)` | 40% opacity |
| Danger | `#E5484D` bg · white text | Darker red | — |

Sizes: `sm` 32px / `md` 40px / `lg` 48px.

#### Inputs

**Member:**
- Height: `44px` · Radius: `10px` · Border: `0.5px #E8E0D4`
- Focus: amber border + `0 0 0 3px rgba(181,96,26,.1)` glow
- Error: red border + inline error text below field

**Admin:**
- Height: `44px` desktop / `48px` mobile · Border: `1px #DAE3ED`
- Focus: `#16E9D7` border + `0 0 0 3px rgba(22,233,215,0.24)` glow
- Error: `#E5484D` border + error text below

#### Cards

**Member:**

```
background:    white
border:        0.5px solid #E8E0D4
border-radius: 12px
padding:       16–20px
hover:         border → amber, translateY(-2px)
selected:      1.5px #B5601A border + #FDF0E6 fill
```

**Admin:**

```
background:    #1C1F2A
border:        1px solid rgba(218, 227, 237, 0.08)
border-radius: 16px
padding:       24–32px
shadow:        --shadow-md
hover:         translateY(-2px) + shadow-lg + border rgba(22,233,215,0.32)
```

#### Tags & Pills

- Domain pill: `background #FDF0E6, color #B5601A, border-radius 9999px`
- Rank badge: uppercase, `0.08em` letter-spacing, amber
- Difficulty pill: `Beginner` green · `Intermediate` amber · `Advanced` red
- Success badge: `background #E8F5EE, color #2E7D52`
- Admin tags: `background rgba(22,233,215,0.08), color #16E9D7`

---

### 13.7 Motion

| Use | Easing | Duration |
|---|---|---|
| Micro (hover, focus) | `cubic-bezier(0.4, 0, 0.2, 1)` | 150ms |
| UI transitions | `cubic-bezier(0.16, 1, 0.3, 1)` | 200–300ms |
| Page transitions | `ease-in-out` | 400ms |
| Badge unlock animation | `cubic-bezier(0.16, 1, 0.3, 1)` | 600ms |
| Number counter | `cubic-bezier(0.4, 0, 0.2, 1)` | 600ms |

All animations respect `prefers-reduced-motion`. Motion serves guidance, not decoration.

---

### 13.8 Accessibility

- Contrast: body text ≥ 4.5:1, large text ≥ 3:1 (WCAG AA)
- Focus ring: all interactive elements must have visible focus indicator
- Keyboard: all actions support Tab / Enter / Escape
- Touch targets: mobile ≥ 44×44px
- Alt text: all images required. Logo alt must be `STARTRADER`
- Forms: all fields have label + helper + error state
- Reduced motion: respect system `prefers-reduced-motion` setting

---

### 13.9 Code Tokens

**`tokens.css` — CSS custom properties:**

```css
:root {
  /* StarTrader Official */
  --color-primary-navy:        #0D0D4B;
  --color-primary-cyan:        #16E9D7;
  --color-primary-blue:        #0047BB;
  --color-primary-mist:        #DAE3ED;
  --color-secondary-deep-blue: #001489;
  --color-secondary-sand:      #DFC5AE;
  --color-secondary-ink:       #1C1F2A;
  --color-secondary-graphite:  #50555B;
  --gradient-momentum: linear-gradient(135deg, #0D0D4B 0%, #0047BB 50%, #16E9D7 100%);
  --gradient-trust:    linear-gradient(180deg, #0D0D4B 0%, #001489 100%);
  --gradient-growth:   linear-gradient(90deg,  #0047BB 0%, #16E9D7 100%);
  --color-danger: #E5484D;

  /* Good Book Editorial Extension */
  --gb-paper:        #FAF7F2;
  --gb-ink:          #1E1810;
  --gb-ink-mid:      #5A4A3A;
  --gb-ink-light:    #9E8E7A;
  --gb-ink-faint:    #D4C8B8;
  --gb-amber:        #B5601A;
  --gb-amber-deep:   #8A4510;
  --gb-amber-light:  #FDF0E6;
  --gb-border:       #E8E0D4;

  /* Typography */
  --font-family-ui:        'Plus Jakarta Sans', system-ui, sans-serif;
  --font-family-editorial: 'Lora', Georgia, serif;
  --font-family-body:      'DM Sans', system-ui, sans-serif;
  --font-family-asian:     'Noto Sans', 'Plus Jakarta Sans', sans-serif;
  --font-weight-light: 300; --font-weight-regular: 400;
  --font-weight-medium: 500; --font-weight-bold: 700;

  /* Spacing (4px grid) */
  --space-1: 4px;  --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
  --space-5: 24px; --space-6: 32px;  --space-7: 48px;  --space-8: 64px;
  --space-9: 96px; --space-10: 128px;

  /* Radius */
  --radius-sm: 4px; --radius-md: 8px; --radius-lg: 16px; --radius-pill: 9999px;
  --gb-radius-card: 12px; --gb-radius-input: 10px; --gb-radius-button: 10px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(13, 13, 75, 0.06);
  --shadow-md: 0 4px 12px rgba(13, 13, 75, 0.10);
  --shadow-lg: 0 12px 32px rgba(13, 13, 75, 0.16);
}
```

**`tailwind.config.js` — Tailwind extension:**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        startrader: {
          navy: '#0D0D4B', cyan: '#16E9D7', blue: '#0047BB', mist: '#DAE3ED',
          'deep-blue': '#001489', sand: '#DFC5AE', ink: '#1C1F2A', graphite: '#50555B',
        },
        gb: {
          paper: '#FAF7F2', ink: '#1E1810', 'ink-mid': '#5A4A3A',
          'ink-light': '#9E8E7A', 'ink-faint': '#D4C8B8',
          amber: '#B5601A', 'amber-deep': '#8A4510', 'amber-light': '#FDF0E6',
          border: '#E8E0D4',
        },
      },
      backgroundImage: {
        'gradient-momentum': 'linear-gradient(135deg, #0D0D4B 0%, #0047BB 50%, #16E9D7 100%)',
        'gradient-trust':    'linear-gradient(180deg, #0D0D4B 0%, #001489 100%)',
        'gradient-growth':   'linear-gradient(90deg,  #0047BB 0%, #16E9D7 100%)',
      },
      fontFamily: {
        ui:       ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        editorial:['Lora', 'Georgia', 'serif'],
        body:     ['"DM Sans"', 'system-ui', 'sans-serif'],
        asian:    ['"Noto Sans"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px', md: '8px', lg: '16px', pill: '9999px',
        'gb-card': '12px', 'gb-input': '10px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(13, 13, 75, 0.06)',
        md: '0 4px 12px rgba(13, 13, 75, 0.10)',
        lg: '0 12px 32px rgba(13, 13, 75, 0.16)',
      },
    },
  },
};
```

---

## 14. Future Expansion

### Phase 2

| Feature | Description |
|---|---|
| AI reading summaries | AI-generated chapter summaries to help busy employees engage with books |
| Personalized learning paths | Multi-quarter curated reading sequences based on career trajectory |
| Department book clubs | Shared reading groups with discussion threads and group picks |
| AI mentor assistant | Conversational coach that connects book insights to employee's current challenges |
| Reading leaderboard | Opt-in quarterly rankings to encourage healthy competition |
| Internal podcast summaries | AI-summarized audio content as companion to book recommendations |

### Phase 3

| Feature | Description |
|---|---|
| Learning marketplace | Employee-to-employee knowledge exchange and course recommendations |
| Company learning credits | Extend the benefit to courses, workshops, and conferences |
| AI skill mapping | Map employee reading patterns to skill development trajectories |
| Internal knowledge graph | Connect employees, books, topics, and departments into a searchable knowledge layer |

---

## 15. Quality Checklist

### Brand

- [ ] `STARTRADER` is always written ALL CAPS as a single word — never `Star Trader`, `Startrader`, or abbreviated
- [ ] Program tagline "One Book. One Quarter. One Step Forward." used consistently
- [ ] Logo uses the correct file: dark background → `_Inverted_`, light background → RGB
- [ ] Logo has no drop shadow, no shape container, clear space maintained
- [ ] Logo alt text is exactly `STARTRADER`

### Color

- [ ] Admin pages use StarTrader tokens only (`--color-primary-*`, `--color-secondary-*`)
- [ ] Member pages use Good Book extension tokens (`--gb-*`)
- [ ] No hex values hardcoded in components — always reference CSS variables
- [ ] Error states use `--color-danger #E5484D` only

### Typography

- [ ] Admin pages: Plus Jakarta Sans for all UI text
- [ ] Member pages: Lora for display headings, DM Sans for UI/body
- [ ] Price and numeric values use `font-variant-numeric: tabular-nums`

### Layout

- [ ] 4px spacing grid maintained throughout
- [ ] Responsive breakpoints tested: sm / md / lg / xl
- [ ] Section whitespace is generous — not crowded

### Forms

- [ ] Every field has a visible label, helper text slot, and error state
- [ ] Domain validation runs server-side, not client-side only
- [ ] Password fields have show/hide toggle
- [ ] Book selection confirmation captures: delivery address, reading goal, expected completion date

### Components

- [ ] Every screen has ≤ 1 primary CTA
- [ ] All cards have default, hover, and selected states defined
- [ ] Empty, loading, and error states exist for all data views
- [ ] Recommendation cards show: rank, relevance %, why it fits, problem it solves, difficulty, reading time, price

### Achievement System

- [ ] All 5 badge types defined with earn conditions
- [ ] Badge unlock animation implemented (600ms)
- [ ] Leaderboard is opt-in — not forced on employees

### Motion

- [ ] All transitions ≤ 400ms (badge animations excepted)
- [ ] `prefers-reduced-motion` respected — no required animations
- [ ] Framer Motion variants defined for page transitions and card interactions

### Accessibility

- [ ] All text passes WCAG AA contrast (≥ 4.5:1 body, ≥ 3:1 large)
- [ ] All interactive elements have visible focus ring
- [ ] Tab order is logical and complete
- [ ] Touch targets ≥ 44×44px on mobile
- [ ] All images have descriptive alt text

### Security

- [ ] Email domain validation enforced server-side
- [ ] Admin route inaccessible from member app
- [ ] Rate limiting active on all auth endpoints
- [ ] All admin actions logged with timestamp and user ID
- [ ] JWT expiry: 24h member / 8h admin

---

*STARTRADER Reading Growth Program · Product Design Document · Version 3.0*
*StarTrader & StarPrime — Internal Use Only*
*Source brand guidelines: 2026 STARTRADER Brand Guidelines V.1*
