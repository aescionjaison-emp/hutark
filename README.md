# HUTARK — High-Fidelity AGIBOT Website Reconstruction

This repository contains the reconstructed, reference-locked web platform for **HUTARK**, built from an empty folder and reverse-engineered directly from the live AGIBOT digital experience ([https://www.agibot.com/](https://www.agibot.com/)).

---

## 1. Reference Reverse-Engineering & Design Audit

The website follows the exact visual language, section structure, typography, and color palette of the reference website:

### Background System (Predominantly White & Light)
* **Global Body Background**: `#ffffff` (Pure White).
* **Section 1 (Hero Banner)**: Full-width carousel with `#f6f6f6` thumbnail navigation strip and active gradient indicator (`linear-gradient(105deg, #6b5ba0 0%, #37a5d0 100%)`).
* **Section 2 (Three Intelligences in One)**: `#ffffff` white background with `#f8f8f8` light intelligence cards.
* **Section 3 (Product Matrix)**: `#fbfbfb` clean light surface with `#ffffff` cards and `#f8f8f8` image frames.
* **Section 4 (News Center)**: `#ffffff` white background with `#f8f8f8` news card items.
* **Section 5 (Footer)**: `#1e2021` charcoal dark footer matching the exact reference layout.

### Header & Navigation
* **Top (Unscrolled)**: `rgba(138, 151, 161, 0.36)` with `backdrop-filter: blur(20px)` and white typography.
* **Scrolled / Hovered (`.header2.fh`)**: Pure white `rgba(255, 255, 255, 1)` background, `#dddddd` bottom border, `#333333` body text, `#0062c5` active hover highlights.
* **Mega Menu Dropdown**: Pure white `#ffffff` 8-column layout with category headers and product thumbnails.
* **Mobile Navigation**: Collapsible responsive drawer with multi-level accordion menus.

### Authentic Typography (MiSans Font Family)
Directly inspected, extracted, and bundled from `agibot.com` in `/public/fonts/`:
* `MiSans-ExtraLight-200.woff`
* `MiSans-Light-300.woff`
* `MiSans-Regular-400.woff`
* `MiSans-Medium-500.woff`
* `MiSans-Bold-700.woff`
* Fallback stack: `'MiSans', "PingFang SC", "Microsoft YaHei", Arial, Helvetica, sans-serif`.

### Layout & Spacing
* **Site Container**: `width: 92%; max-width: 1720px; margin: 0 auto;`.
* **Header Height**: `80px` (`1.2rem` root scale).

---

## 2. Project Folder Structure

```
HUTARK/
│
├── Frontend/                      # Next.js 14 App Router (Port 3000)
│   ├── public/
│   │   ├── fonts/                 # Authentic MiSans font family (200, 300, 400, 500, 700)
│   │   ├── images/
│   │   │   └── hutark-mark.png    # Official purple geometric polygon logo mark
│   │   ├── uploads/               # 20+ reference robot photos, posters, and hero banners
│   │   └── static/                # Vector icons and WeChat/Weibo QR code assets
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx         # Global layout with Header and Footer
│   │   │   ├── page.tsx           # Homepage (Hero Banner, Three Intelligences, Product Matrix, News)
│   │   │   ├── about/page.tsx     # Who We Are, Mission & Vision, Core Values, Milestones, Leadership
│   │   │   ├── products/
│   │   │   │   ├── page.tsx       # Product Matrix catalog with series filter tabs
│   │   │   │   └── [id]/page.tsx  # Dynamic specifications, architecture, and applications (14 models)
│   │   │   ├── technology/page.tsx# Link-U OS, GO-3 foundation model, Powerflow actuators, SDK code
│   │   │   ├── news/
│   │   │   │   ├── page.tsx       # Newsroom with category filters
│   │   │   │   └── [id]/page.tsx  # Dynamic article details
│   │   │   └── contact/page.tsx   # Deployment inquiry form (connected to backend API) and global offices
│   │   ├── components/
│   │   │   ├── layout/            # Footer.tsx
│   │   │   └── navigation/        # Header.tsx (8-column Mega Menu, Language popover, Mobile drawer)
│   │   ├── data/                  # Navigation tree, products catalog (14 models), news articles
│   │   ├── services/api.ts        # Client connecting to Backend REST API on Port 5000
│   │   ├── styles/                # reference-design-tokens.css and globals.css
│   │   └── types/index.ts         # TypeScript definitions
│   ├── package.json
│   ├── next.config.mjs
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── Backend/                       # Node.js + Express + Prisma REST API (Port 5000)
│   ├── prisma/
│   │   ├── schema.prisma          # ContactEnquiry, EventRegistration, Product, NewsArticle models
│   │   └── dev.db                 # SQLite database (with PostgreSQL production support)
│   ├── src/
│   │   ├── config/db.ts           # Prisma database client
│   │   ├── controllers/           # Contact, Product, News, and Event controllers
│   │   ├── routes/api.routes.ts   # REST endpoints
│   │   ├── services/seed.service.ts# Database seeder
│   │   └── server.ts              # Express server entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── .env
│
├── verify_system.js               # Full end-to-end automated verification test
├── package.json                   # Root orchestrator scripts
├── .gitignore
└── README.md
```

---

## 3. Setup and Run Commands

### Prerequisites
* Node.js 18+ (tested on Node.js v22.14.0)
* npm 9+

### Backend Setup & Launch (Port 5000)
```bash
cd Backend
npm install
npx prisma db push
npm run build
npm start
```
The backend server will start on `http://localhost:5000` and automatically seed initial product and news data into the database.

### Frontend Setup & Launch (Port 3000)
```bash
cd Frontend
npm install
npm run build
npm start
```
The frontend will start on `http://localhost:3000`.

### Running Verification Test
```bash
npm run verify
```

---

## 4. Environment Variables

### Backend (`Backend/.env`)
```ini
PORT=5000
FRONTEND_URL=http://localhost:3000
DATABASE_URL="file:./dev.db"
# For PostgreSQL production, update to:
# DATABASE_URL="postgresql://user:password@localhost:5432/hutark_db?schema=public"
```

### Frontend (`Frontend/.env.local` optional)
```ini
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 5. Completed Pages & Routes

| Route | Page | Description |
| :--- | :--- | :--- |
| `/` | **Home** | Hero carousel, Three Intelligences in One, Product Matrix, Newsroom |
| `/about` | **About** | Who We Are (`#Identity`), Purpose (`#Purpose`), Ethos (`#Ethos`), Milestones (`#Journey`), Leadership (`#Leadership`) |
| `/products` | **Products** | Filterable Matrix across A, X, G, D, and C Series |
| `/products/A3Ultra` | **Product Detail** | Bipedal humanoid specs table, AHA3 features, cleanroom applications |
| `/products/X2` | **Product Detail** | Wheeled-bipedal dual-arm manipulator specs and capabilities |
| `/products/[id]` | **Product Detail** | Pre-rendered static pages for all 14 models |
| `/technology` | **Technology** | Link-U OS, GO-3 foundation model, Powerflow actuators, SDK code |
| `/news` | **Newsroom** | Filterable news articles (Events, Corporate, Achievements) |
| `/news/[id]` | **Article Detail** | Full editorial layout with cover imagery and related stories |
| `/contact` | **Contact** | Commercial deployment inquiry form wired to `POST /api/contact` |

---

## 6. Content & Asset Requirements for Production

The following items are prepared with clean structural placeholders and can be replaced with proprietary HUTARK corporate assets as they become available:
1. **Corporate Headquarters Photos**: Placeholder factory/office images can be swapped with HUTARK's physical campus facilities.
2. **Video Reel Files**: Background video streams in the Three Intelligences section currently display high-resolution video posters. Can be updated with custom MP4/HLS streams.
3. **Legal Compliance Documents**: Privacy policy and cookie policy texts are fully linked in the footer and ready for final corporate legal sign-off.

---

## 7. Verification Results

Running `node verify_system.js`:
```
====================================================
HUTARK FULL SYSTEM & REFERENCE FIDELITY VERIFICATION
====================================================
[PASS] Backend API Health: Status 200 - {"status":"healthy","service":"HUTARK REST API","version":"1.0.0"}
[PASS] Backend Products API: Status 200 - Count: 5
[PASS] Backend Contact POST: Status 201 - Enquiry submitted successfully.
[PASS] Frontend Homepage: Status 200 - Brand Found: true - White Body Background: true
[PASS] About Page: Status 200
[PASS] Products Matrix Page: Status 200
[PASS] Product Detail A3Ultra: Status 200
[PASS] Product Detail X2: Status 200
[PASS] Technology & OS Page: Status 200
[PASS] Newsroom Page: Status 200
[PASS] News Article Detail: Status 200
[PASS] Contact Us Page: Status 200
[PASS] Official HUTARK Geometric Logo Mark: Status 200
[PASS] Official Reference MiSans Font File: Status 200
====================================================
ALL VERIFICATION CHECKS COMPLETED WITH 100% SUCCESS
====================================================
```

