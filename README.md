# Mini Sales CRM

A modern, high-performance, full-stack Sales CRM application designed for sales teams to track leads, manage customer relationships, monitor opportunity pipelines, and view real-time sales metrics.

---

## Overview

Mini Sales CRM provides an end-to-end operational hub for sales representatives and leadership. It delivers:
- **Lead Ingestion & Qualification**: Capture prospects, record acquisition channels, assign team owners, and transition stages.
- **Customer Account Management**: Maintain unified company profiles, communication records, and customer activity logs.
- **Revenue Pipeline Tracking**: Track active deal stages, forecasted values, expected close dates, and win/loss attributions.
- **Executive Analytics Dashboard**: Real-time KPI aggregation, conversion metrics, deal stage breakdown, and trend visualizations.
- **Secure Layered Backend**: Express REST APIs with strict input validation, database integrity constraints, and error handling.

---

## Features

### 1. Authentication
- Clean, responsive login interface with client-side session management.
- Pre-configured demo credentials helper (`admin@crm.local` / `admin123`).
- Route protection ensuring authenticated navigation across all workspace modules.

### 2. Analytics Dashboard (`/dashboard`)
- **Key Metric Cards**: Total Leads, Total Customers, Open Opportunities, Won Deals, and Total Revenue.
- **Sales Overview Chart**: Pipeline stage progression with volume tracking.
- **Lead Sources Breakdown**: Channel attribution donut with real-time prospect volume.
- **Opportunity Stage Distribution**: Interactive breakdown across active & closed stages.
- **Recent Activity Tables**: Latest 5 customers and recent 5 prospects.

### 3. Customer Management (`/customers` & `/customers/:id`)
- Paginated customer directory with search by name/company and status filtering (`Active`, `Inactive`).
- Modal-based Add Customer and Edit Customer workflows.
- Confirmation modal with soft-delete safety.
- **Customer Details Page**:
  - Customer contact details and account status.
  - Linked active and closed opportunities with live total opportunity value calculation.
  - Interactive activity timeline supporting Call, Meeting, Email, and Note logs.

### 4. Leads Management (`/leads`)
- Inbound prospect directory with search, status filtering (`New`, `Contacted`, `Qualified`, `Lost`), and pagination.
- Create, Edit, and Delete modal workflows.
- In-line status selector for instant stage transitions without full page reload.

### 5. Opportunity Pipeline (`/opportunities`)
- Deal tracking with status filtering across 5 stages: `Prospecting`, `Proposal`, `Negotiation`, `Won`, `Lost`.
- Create, Edit, and Delete deal workflows linked to real customer accounts.
- In-line stage changer directly updating backend revenue metrics and dashboard statistics.

### 6. Executive Header & Navigation
- **Workspace Identity**: Live pulse indicator with route-aware breadcrumbs.
- **Pipeline Mini-Ticker**: High-level sales summary (`$205,500 Pipeline • 8 Deals • 10 Leads`) with interactive live sync button.
- **Quick Action Menu**: Fast jump to Leads, Customers, or Opportunities.
- **Interactive Drawers**: Unread messages drawer, notifications drawer, and admin profile dropdown with sign-out.
- **Mobile Responsive Dock**: 76px desktop icon dock and off-canvas mobile drawer with zero viewport overflow.

---

## Tech Stack

### Frontend
- **Framework**: React 19 (Hooks, React Router v7)
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4 & custom CSS utilities
- **Typography & Icons**: Inter / modern SVG icon system

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database Client**: `pg` (node-postgres with connection pooling)
- **Security & Utilities**: CORS, dotenv

### Database
- **Database Engine**: PostgreSQL 14+
- **Integrity**: Foreign key cascades, check constraints, default timestamps

---

## Project Structure

```text
CRM-Assignment/
├── Backend/
│   ├── database/
│   │   ├── schema.sql              # PostgreSQL tables, constraints, & indexes
│   │   └── seed.sql                # Production-ready sample business data
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               # PostgreSQL pg.Pool connection config
│   │   ├── controllers/            # HTTP request & response handlers
│   │   │   ├── customer.controller.js
│   │   │   ├── lead.controller.js
│   │   │   ├── opportunity.controller.js
│   │   │   ├── activity.controller.js
│   │   │   └── dashboard.controller.js
│   │   ├── middleware/             # Validation & error handling
│   │   │   ├── error.middleware.js
│   │   │   ├── validate.customer.js
│   │   │   ├── validate.lead.js
│   │   │   ├── validate.opportunity.js
│   │   │   └── validate.activity.js
│   │   ├── repositories/           # Direct SQL database queries
│   │   │   ├── customer.repository.js
│   │   │   ├── lead.repository.js
│   │   │   ├── opportunity.repository.js
│   │   │   ├── activity.repository.js
│   │   │   └── dashboard.repository.js
│   │   ├── routes/                 # Express route definitions
│   │   │   ├── customer.routes.js
│   │   │   ├── lead.routes.js
│   │   │   ├── opportunity.routes.js
│   │   │   ├── activity.routes.js
│   │   │   └── dashboard.routes.js
│   │   ├── services/               # Core business logic layer
│   │   │   ├── customer.service.js
│   │   │   ├── lead.service.js
│   │   │   ├── opportunity.service.js
│   │   │   ├── activity.service.js
│   │   │   └── dashboard.service.js
│   │   ├── app.js                  # Express application setup
│   │   └── server.js               # Server bootstrap & port listener
│   ├── .env.example                # Backend environment template
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── assets/                 # App logos & brand images
│   │   ├── components/
│   │   │   ├── customer-details/   # Activity timeline & related deals
│   │   │   ├── customers/          # Customer forms, tables & modals
│   │   │   ├── dashboard/          # KPI cards, charts & recent tables
│   │   │   ├── layout/             # Sidebar dock & Executive Header
│   │   │   ├── leads/              # Lead forms, tables & modals
│   │   │   ├── login/              # Login mockup & form
│   │   │   ├── opportunities/      # Deal forms, tables & modals
│   │   │   └── ui/                 # Reusable buttons, cards, toasts, modals
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx      # Core dock + header + outlet layout
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Customers.jsx
│   │   │   ├── CustomerDetails.jsx
│   │   │   ├── Leads.jsx
│   │   │   └── Opportunities.jsx
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx       # Client-side route declarations
│   │   ├── services/               # Frontend API client methods
│   │   ├── utils/                  # Auth session helpers
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example                # Frontend environment template
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore                      # Root git ignore
└── README.md                       # Comprehensive project documentation
```

---

## Environment Variables

### Backend (`Backend/.env`)
Create a `.env` file inside `Backend/` based on `Backend/.env.example`:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=sales_crm
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_SSL=false
```

### Frontend (`Frontend/.env`)
Create a `.env` file inside `Frontend/` based on `Frontend/.env.example`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Installation & Setup

### Prerequisites
- **Node.js**: v18 or higher (v20+ recommended)
- **npm**: v9 or higher
- **PostgreSQL**: v14 or higher running locally or via Docker

---

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd CRM-Assignment

# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../Frontend
npm install
cd ..
```

---

### 2. Configure Database

Ensure PostgreSQL is running and create the `sales_crm` database:

```bash
# Using PostgreSQL CLI (psql)
psql -U postgres -c "CREATE DATABASE sales_crm;"
```

Execute the database schema and seed data scripts:

```bash
# Apply table schema
psql -U postgres -d sales_crm -f Backend/database/schema.sql

# Seed initial business data
psql -U postgres -d sales_crm -f Backend/database/seed.sql
```

---

### 3. Start the Backend API Server

```bash
cd Backend
npm run dev
# Server will start on http://localhost:5000
```

Verify backend health by visiting: `http://localhost:5000/api/health`

---

### 4. Start the Frontend Application

```bash
cd Frontend
npm run dev
# Application will start on http://localhost:5173
```

Open `http://localhost:5173` in your browser.

---

## Database Architecture

```text
       ┌──────────────┐
       │  CUSTOMERS   │
       └──────┬───────┘
              │ 1
              │
      ┌───────┴───────────────┐
      │                       │
      ▼ *                     ▼ *
┌───────────────┐       ┌────────────┐
│ OPPORTUNITIES │       │ ACTIVITIES │
└───────────────┘       └────────────┘

       ┌──────────────┐
       │    LEADS     │
       └──────────────┘
```

- **`customers` Table**: Primary entity for client companies (`id`, `name`, `company`, `email`, `phone`, `status`, `created_at`, `updated_at`).
- **`opportunities` Table**: Deals linked to customers (`id`, `name`, `customer_id` FK, `value`, `expected_closing_date`, `status`, `created_at`, `updated_at`).
- **`activities` Table**: Touchpoint history (`id`, `customer_id` FK, `type`, `description`, `created_at`).
- **`leads` Table**: Independent prospective contacts (`id`, `name`, `company`, `email`, `phone`, `source`, `status`, `assigned_to`, `created_at`, `updated_at`).

---

## REST API Reference

All responses follow a consistent JSON structure:
- **Success**: `{ "success": true, "data": ... }`
- **Error**: `{ "success": false, "message": "...", "errors": { ... } }`

### System Health
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status check |

### Dashboard
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/dashboard` | Aggregated KPI stats, stage breakdown, and recent items |

### Customers
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/customers` | List customers (supports `?search=` and `?status=`) |
| `GET` | `/api/customers/:id` | Customer details, linked opportunities, & activity log |
| `POST` | `/api/customers` | Create a new customer |
| `PUT` | `/api/customers/:id` | Update customer information |
| `DELETE` | `/api/customers/:id` | Delete customer and cascade associated records |

### Customer Activities
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/customers/:customerId/activities` | List activities for a customer |
| `POST` | `/api/customers/:customerId/activities` | Log a new activity (`Call`, `Meeting`, `Email`, `Note`) |
| `GET` | `/api/activities/:id` | Get activity by ID |
| `DELETE` | `/api/activities/:id` | Delete an activity |

### Leads
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/leads` | List leads (supports `?search=` and `?status=`) |
| `GET` | `/api/leads/:id` | Get lead by ID |
| `POST` | `/api/leads` | Create a new lead |
| `PUT` | `/api/leads/:id` | Update lead or transition status |
| `DELETE` | `/api/leads/:id` | Delete a lead |

### Opportunities
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/opportunities` | List opportunities (supports `?status=` and `?customerId=`) |
| `GET` | `/api/opportunities/:id` | Get opportunity by ID |
| `POST` | `/api/opportunities` | Create deal linked to a customer |
| `PUT` | `/api/opportunities/:id` | Update deal or change stage |
| `DELETE` | `/api/opportunities/:id` | Delete an opportunity |

---

## Running Quality Checks

```bash
# Run Frontend ESLint check
cd Frontend
npm run lint

# Run Frontend Production Build
npm run build
```
