# Handyman Project Status & Summary

## Project Overview
The Handyman project is a dashboard-centric web application featuring both a Customer Dashboard and an Admin Dashboard. The system emphasizes premium physical aesthetics, dynamic personalization, drag-and-drop widget layouts, and actionable OKR/KPI metrics. 

## Architecture & Technology Stack
- **Backend:** Node.js (Express)
- **Database:** PostgreSQL (initialized in `db/db.cjs`)
- **Frontend Core:** HTML, Vanilla CSS, Vanilla JS
- **Key Libraries:** 
  - **GridStack.js:** Powers the drag-and-drop, resizable widget layouts on the dashboards.
  - **Chart.js:** Drives the data visualizations (Doughnut, Line, Bar charts) on the Admin dashboard.

## Detailed File Tree

```
d:\website\
│
├── 📄 index.html                        # Main landing page / homepage
├── 📄 server.cjs                         # 🔑 Primary Express backend server
├── 📄 dashboard.html                     # 🔑 Customer-facing drag-and-drop dashboard
├── 📄 admin-dashboard.html               # 🔑 Admin command hub (OKR/KPI/Charts)
├── 📄 admin-tiers.html                   # Admin tier management page
├── 📄 account.html                       # User account settings page
├── 📄 apply.html                         # Job application form
├── 📄 bid.html                           # Bid submission page
├── 📄 checklist.html                     # Project checklist
├── 📄 contractor-dashboard.html          # Contractor-specific dashboard
├── 📄 contractor-onboarding.html         # Contractor onboarding flow
├── 📄 contractors-tiers.html             # Contractor tier info
├── 📄 customers-tiers.html               # Customer tier info
├── 📄 dashboardRoutes.js                 # Client-side routing for dashboards
├── 📄 employee-dashboard.html            # Employee-specific dashboard
├── 📄 employee-onboarding.html           # Employee onboarding flow
├── 📄 employees-tiers.html               # Employee tier info
├── 📄 estimate.html                      # Project estimate request
├── 📄 estimator.html                     # Interactive cost estimator
├── 📄 feedback.html                      # Customer feedback form
├── 📄 governance-manifest.html           # Policy & governance docs
├── 📄 history.html                       # Service history
├── 📄 hotline.html                       # Support hotline page
├── 📄 invoices.html                      # Invoice listing
├── 📄 legal.html                         # Legal/terms page
├── 📄 login.html                         # Login/authentication page
├── 📄 onboarding.html                    # General onboarding flow
├── 📄 painting.html                      # Painting services page
├── 📄 privacy.html                       # Privacy policy
├── 📄 project.html                       # Project details page
├── 📄 roofing.html                       # Roofing services page
├── 📄 security-compliance.html           # Security policy
├── 📄 transparency.html                  # Transparency/pricing page
├── 📄 auth-nav.js                        # Navigation auth helper
├── 📄 messageStore.js                    # Client-side message store
├── 📄 MinnesotaMap.js                    # Service area map
├── 📄 update-cities.js                   # City data update script
├── 📄 drizzle.config.js / .ts            # Drizzle ORM config
├── 📄 vite.config.ts                     # Vite build config
├── 📄 package.json                       # NPM dependencies & scripts
├── 📄 tsconfig.json / app / node         # TypeScript configs
├── 📄 .env                               # 🔑 Environment variables (DB, secrets)
├── 📄 sitemap.xml                        # SEO sitemap
├── 📄 robots.txt                         # SEO robots file
├── 📄 vercel.json                        # Vercel deployment config
│
├── 📁 components/                        # 🔑 Dashboard widget blocks
│   ├── 📄 header-greeting.html           # Personalized user greeting widget
│   ├── 📄 account-overview.html          # Account summary widget
│   ├── 📄 profile-property.html          # Profile & property details widget
│   ├── 📄 workflow-status.html           # Job workflow/status tracker widget
│   ├── 📄 budget-estimator.html          # Budget estimator widget
│   ├── 📄 budget-block.html              # Compact budget block
│   ├── 📄 invoices-payments.html         # Invoices & payment history widget
│   ├── 📄 invoices-block.html            # Compact invoices block
│   ├── 📄 project-bids.html              # Active bids widget
│   ├── 📄 projects-block.html            # Compact projects block
│   ├── 📄 schedule-assessment.html       # Scheduling/booking widget
│   ├── 📄 color-studio.html              # Paint color studio widget
│   ├── 📄 paint-studio.html              # (alias) Paint studio widget
│   ├── 📄 paint-calculator.html          # Paint volume calculator
│   ├── 📄 checklist-warranty.html        # Warranty & checklist widget
│   ├── 📄 checklist-block.html           # Compact checklist block
│   ├── 📄 contact-bid-request.html       # Contact & bid request form widget
│   ├── 📄 weather-block.html             # 🌤 Live weather widget
│   ├── 📄 weather-widget.html            # Weather widget variant
│   ├── 📄 weather-widget.css             # Weather widget styles
│   ├── 📄 direct-dispatch.html           # Direct dispatch request widget
│   ├── 📄 dispatch-block.html            # Compact dispatch block
│   ├── 📄 settings-block.html            # User settings block
│   ├── 📄 tier-block.html                # Service tier info block
│   ├── 📄 showcase-block.html            # Portfolio showcase block
│   ├── 📄 mixer-block.html               # Paint mixer block
│   ├── 📄 builder-block.html             # Project builder block
│   ├── 📄 job-photos.html                # Job photo gallery
│   ├── 📄 project-detail.html            # Project detail view
│   ├── 📄 success.html                   # Success/confirmation widget
│   └── 📁 dashboard/                     # Dashboard-specific sub-components
│
├── 📁 db/                                # 🔑 Database layer
│   ├── 📄 db.cjs                         # 🔑 PostgreSQL connection + schema init
│   ├── 📄 index.js                       # DB module entry point
│   ├── 📄 schema.js                      # Drizzle schema definitions
│   ├── 📄 queue.js                       # Offline task queue
│   └── 📄 offline-queue.json             # Persisted offline queue data
│
├── 📁 api/                               # API routes directory
│   ├── 📄 eagleview-webhook.js           # EagleView integration webhook
│   ├── 📄 fix_dashboard_modals.js        # Modal fix utility
│   ├── 📄 server.js                      # Sub-API server
│   ├── 📄 schema.sql                     # SQL schema file
│   ├── 📄 database.sqlite                # SQLite fallback database
│   └── 📁 customer/                      # Customer-specific API routes
│
├── 📁 admin/                             # Admin sub-application
│   ├── 📄 index.html                     # Admin portal entry
│   └── 📄 server.js                      # Admin server
│
├── 📁 src/                               # React/Vite source (TypeScript)
│   ├── 📄 App.tsx                        # Root React component
│   ├── 📄 App.css                        # Root component styles
│   ├── 📄 main.tsx                       # React entry point
│   ├── 📄 index.css                      # Global styles
│   ├── 📁 components/                    # React components
│   ├── 📁 services/                      # API service modules
│   ├── 📁 types/                         # TypeScript type definitions
│   └── 📁 assets/                        # Static assets for React app
│
├── 📁 css/
│   └── 📄 style.css                      # Additional global styles
│
├── 📁 js/
│   ├── 📄 main.js                        # Main JS entry
│   └── 📄 service-router.js              # Client-side service routing
│
├── 📁 utils/
│   ├── 📄 emailDispatcher.js             # Email sending utility
│   └── 📄 tokenAuth.js                   # Token authentication helper
│
├── 📁 lib/
│   └── 📄 db.ts                          # TypeScript DB helper
│
├── 📁 assets/                            # Static media assets
│   ├── 📄 IMG_0373.jpg – IMG_0375.jpg    # Property/job photos
│   ├── 📄 IMG_20230711_*.jpg             # Job site photos
│   └── 📄 video.mp4                      # Promo/demo video
│
├── 📁 images/                            # Additional site images
├── 📁 videos/                            # Video assets
├── 📁 cities/                            # City-specific content pages
├── 📁 roofing-cities/                    # Roofing city-specific pages
├── 📁 projects/                          # Project data/pages
├── 📁 data/                              # Static data files
├── 📁 public/                            # Public static assets
├── 📁 pages/                             # Next.js-style page routes
│   └── 📁 api/                           # API route pages
├── 📁 dist/                              # Production build output
└── 📁 HandymanPainting/                  # Painting sub-project files
```

---

## Current State & Work Accomplished

### 1. Dashboard Personalization & Data Persistence
- **Identity System:** Refactored the backend (`server.cjs`) to utilize a robust identity system based on `X-User-Email` and `X-User-Name` headers, moving away from hardcoded fallbacks (e.g., "John Doe") to ensure accurate personalization.
- **Database Integration:** Implemented PostgreSQL persistence. The schema uses `ON CONFLICT` updates for users and profiles to ensure data integrity without dummy row duplication.

### 2. Drag-and-Drop UX (Customer Dashboard)
- **GridStack Functionality:** Fixed drag-and-drop and resize capabilities in `dashboard.html`. Widgets initialize correctly with a fixed grid height, using `.widget-header` as the primary drag handle.
- **Dynamic Components:** Components are dynamically fetched from `/components/*.html` and injected via `window.grid.addWidget`. All components have been upgraded for maximum value and visual appeal.

### 3. Admin Command Hub & Analytics
- **Admin Dashboard:** Built `admin-dashboard.html` as an executive control suite.
- **Metrics & Visualizations:** Integrated Chart.js to display executive metrics like revenue, service breakdowns, and OKR progress.
- **OKR Data Infrastructure:** Added an `okrs` table in `db/db.cjs` to track actionable goals for customers, contractors, and employees. Supported by CRUD API endpoints in `server.cjs` and a role-based management interface.

## Immediate Next Steps (IMPORTANT for next AI)

### 1. Enforce the "No Dummy Data" Rule
- **Constraint:** The user explicitly requested: *"We dont want any dummy data. only live production data or none at all throughout the entire application."*
- **Action Required:** Open `d:\website\db\db.cjs`. Locate the `initDb()` function and **remove all seed/dummy data** (e.g., the `sampleOkrs` array and subsequent `INSERT` logic).
- **Action Required:** You may need to clear existing dummy records from the live PostgreSQL database. Ensure the UI components handle empty data states gracefully.

### 2. Live Preview
- Ensure the application development environment continues to support live previewing.

## Key Files to Review
- `d:\website\server.cjs`: Backend logic, auth middleware, and API endpoints.
- `d:\website\db\db.cjs`: Database schema and connection logic (needs dummy data removed).
- `d:\website\dashboard.html`: Customer dashboard UI and GridStack logic.
- `d:\website\admin-dashboard.html`: Admin dashboard UI, Chart.js setup, and OKR management.
- `d:\website\components\*.html`: Individual, high-value widget blocks.
