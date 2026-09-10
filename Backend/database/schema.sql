-- ===================================================================
-- Mini Sales CRM - Database Schema (PostgreSQL)
-- ===================================================================

-- 1. CLEANUP (Safe fresh installation)
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS opportunities CASCADE;
DROP TABLE IF EXISTS leads CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;

-- ===================================================================
-- 2. REUSABLE TRIGGER FUNCTION FOR updated_at
-- Automatically updates updated_at whenever a row is modified
-- ===================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ===================================================================
-- 3. CUSTOMERS TABLE
-- Core entity for paying or active business clients
-- ===================================================================
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    company VARCHAR(150) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_customers_status CHECK (status IN ('active', 'inactive'))
);

CREATE TRIGGER trg_customers_updated_at
BEFORE UPDATE ON customers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ===================================================================
-- 4. LEADS TABLE
-- Prospective clients before qualifying into full customers
-- ===================================================================
CREATE TABLE leads (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    company VARCHAR(150) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    source VARCHAR(100) DEFAULT 'Other',
    status VARCHAR(50) NOT NULL DEFAULT 'New',
    assigned_to VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_leads_status CHECK (status IN ('New', 'Contacted', 'Qualified', 'Lost'))
);

CREATE TRIGGER trg_leads_updated_at
BEFORE UPDATE ON leads
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ===================================================================
-- 5. OPPORTUNITIES TABLE
-- Sales deals and potential revenue tied to existing customers
-- ===================================================================
CREATE TABLE opportunities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    value NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    expected_closing_date DATE,
    status VARCHAR(50) NOT NULL DEFAULT 'Prospecting',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_opportunities_value CHECK (value >= 0),
    CONSTRAINT chk_opportunities_status CHECK (status IN ('Prospecting', 'Proposal', 'Negotiation', 'Won', 'Lost'))
);

CREATE TRIGGER trg_opportunities_updated_at
BEFORE UPDATE ON opportunities
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ===================================================================
-- 6. ACTIVITIES TABLE
-- Interaction timeline and communication history logged against customers
-- ===================================================================
CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_activities_type CHECK (type IN ('Call', 'Email', 'Meeting', 'Note'))
);

-- ===================================================================
-- 7. PERFORMANCE INDEXES
-- Indexing high-frequency filter, join, and search columns
-- ===================================================================

-- Customers: fast status filtering & name/company lookup & recent order
CREATE INDEX idx_customers_status ON customers(status);
CREATE INDEX idx_customers_name_company ON customers(name, company);
CREATE INDEX idx_customers_created_at ON customers(created_at DESC);

-- Leads: fast status filtering & name/company lookup & recent order
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_name_company ON leads(name, company);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- Opportunities: fast foreign key joins and pipeline status aggregations
CREATE INDEX idx_opportunities_customer_id ON opportunities(customer_id);
CREATE INDEX idx_opportunities_status ON opportunities(status);

-- Activities: fast foreign key joins and customer timeline queries
CREATE INDEX idx_activities_customer_id ON activities(customer_id);

