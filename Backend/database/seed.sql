-- ===================================================================
-- Mini Sales CRM - Seed Data (PostgreSQL)
-- ===================================================================

-- Clean up existing data in reverse dependency order
TRUNCATE TABLE activities, opportunities, leads, customers RESTART IDENTITY CASCADE;

-- ===================================================================
-- 1. SEED CUSTOMERS (10 records)
-- ===================================================================
INSERT INTO customers (name, company, email, phone, status, created_at, updated_at) VALUES
('Alex Rivera', 'Acme Corporation', 'alex.rivera@acmecorp.com', '+1-555-0101', 'active', NOW() - INTERVAL '90 days', NOW() - INTERVAL '5 days'),
('Brenda Vance', 'Nova Dynamics', 'brenda@novadynamics.io', '+1-555-0102', 'active', NOW() - INTERVAL '80 days', NOW() - INTERVAL '3 days'),
('Charles Sterling', 'Crestview Health', 'csterling@crestviewhealth.org', '+1-555-0103', 'active', NOW() - INTERVAL '75 days', NOW() - INTERVAL '10 days'),
('Diana Prince', 'Apex Logistics', 'diana.prince@apexlogistics.com', '+1-555-0104', 'active', NOW() - INTERVAL '60 days', NOW() - INTERVAL '2 days'),
('Edward Norton', 'Horizon Financial', 'enorton@horizonfin.com', '+1-555-0105', 'active', NOW() - INTERVAL '55 days', NOW() - INTERVAL '1 day'),
('Fiona Gallagher', 'BluePeak Solutions', 'fiona@bluepeaksolutions.net', '+1-555-0106', 'active', NOW() - INTERVAL '45 days', NOW() - INTERVAL '12 days'),
('George Clark', 'Vantage Retail', 'george.clark@vantageretail.com', '+1-555-0107', 'inactive', NOW() - INTERVAL '120 days', NOW() - INTERVAL '40 days'),
('Hannah Abbott', 'Summit Media Group', 'hannah@summitmediagroup.com', '+1-555-0108', 'active', NOW() - INTERVAL '30 days', NOW() - INTERVAL '4 days'),
('Ian Malcolm', 'Solaris Energy', 'ian.malcolm@solarisenergy.com', '+1-555-0109', 'active', NOW() - INTERVAL '25 days', NOW() - INTERVAL '2 days'),
('Julia Roberts', 'Silverline Manufacturing', 'jroberts@silverlinemfg.com', '+1-555-0110', 'inactive', NOW() - INTERVAL '150 days', NOW() - INTERVAL '60 days');

-- ===================================================================
-- 2. SEED LEADS (10 records)
-- ===================================================================
INSERT INTO leads (name, company, email, phone, source, status, assigned_to, created_at, updated_at) VALUES
('Mark Spencer', 'Quantum Softwares', 'mark@quantumsoft.dev', '+1-555-0201', 'Website', 'New', 'Sarah Jenkins', NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days'),
('Rachel Adams', 'Zenith Cloud', 'rachel.adams@zenithcloud.io', '+1-555-0202', 'LinkedIn', 'Contacted', 'Michael Chen', NOW() - INTERVAL '14 days', NOW() - INTERVAL '5 days'),
('Nathan Drake', 'Uncharted Capital', 'ndrake@unchartedcap.com', '+1-555-0203', 'Referral', 'Qualified', 'Sarah Jenkins', NOW() - INTERVAL '20 days', NOW() - INTERVAL '2 days'),
('Chloe Frazier', 'Heritage Antiques', 'chloe@heritagegoods.com', '+1-555-0204', 'Advertisement', 'New', 'David Miller', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days'),
('Sam Fisher', 'Third Echelon Tech', 'sfisher@thirdechelon.gov', '+1-555-0205', 'Other', 'Contacted', 'Michael Chen', NOW() - INTERVAL '18 days', NOW() - INTERVAL '7 days'),
('Elena Fisher', 'Global News Net', 'elena@globalnewsnet.org', '+1-555-0206', 'LinkedIn', 'Qualified', 'Sarah Jenkins', NOW() - INTERVAL '25 days', NOW() - INTERVAL '1 day'),
('Victor Sullivan', 'Shoreline Trading', 'sully@shorelinetrading.com', '+1-555-0207', 'Website', 'Lost', 'David Miller', NOW() - INTERVAL '45 days', NOW() - INTERVAL '15 days'),
('Chloe Decker', 'Lux Hospitality', 'cdecker@luxhospitality.com', '+1-555-0208', 'Referral', 'New', 'Sarah Jenkins', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
('Arthur Morgan', 'Frontier Goods', 'arthur@frontieroutfitters.com', '+1-555-0209', 'Advertisement', 'Lost', 'Michael Chen', NOW() - INTERVAL '60 days', NOW() - INTERVAL '30 days'),
('John Marston', 'Beecher Agro', 'jmarston@beecheragro.com', '+1-555-0210', 'Website', 'Qualified', 'David Miller', NOW() - INTERVAL '12 days', NOW() - INTERVAL '1 day');

-- ===================================================================
-- 3. SEED OPPORTUNITIES (15 records)
-- ===================================================================
INSERT INTO opportunities (name, customer_id, value, expected_closing_date, status, created_at, updated_at) VALUES
('Enterprise Cloud Migration', 1, 45000.00, CURRENT_DATE + INTERVAL '30 days', 'Won', NOW() - INTERVAL '60 days', NOW() - INTERVAL '5 days'),
('Annual Security Audit', 1, 12500.00, CURRENT_DATE + INTERVAL '45 days', 'Proposal', NOW() - INTERVAL '20 days', NOW() - INTERVAL '2 days'),
('Fleet Tracking System', 4, 68000.00, CURRENT_DATE + INTERVAL '25 days', 'Negotiation', NOW() - INTERVAL '35 days', NOW() - INTERVAL '1 day'),
('Warehouse Automation Software', 4, 92000.00, CURRENT_DATE + INTERVAL '75 days', 'Prospecting', NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days'),
('Core Banking Integration', 5, 115000.00, CURRENT_DATE + INTERVAL '10 days', 'Won', NOW() - INTERVAL '50 days', NOW() - INTERVAL '3 days'),
('Wealth Portal Redesign', 5, 34000.00, CURRENT_DATE + INTERVAL '60 days', 'Proposal', NOW() - INTERVAL '18 days', NOW() - INTERVAL '4 days'),
('Hospital EMR Upgrade', 3, 85000.00, CURRENT_DATE + INTERVAL '20 days', 'Negotiation', NOW() - INTERVAL '40 days', NOW() - INTERVAL '2 days'),
('Telemedicine Pilot', 3, 18000.00, CURRENT_DATE - INTERVAL '10 days', 'Won', NOW() - INTERVAL '70 days', NOW() - INTERVAL '10 days'),
('Robotics Firmware Suite', 2, 55000.00, CURRENT_DATE + INTERVAL '50 days', 'Proposal', NOW() - INTERVAL '30 days', NOW() - INTERVAL '3 days'),
('AI Vision Inspection', 2, 40000.00, CURRENT_DATE - INTERVAL '30 days', 'Lost', NOW() - INTERVAL '80 days', NOW() - INTERVAL '30 days'),
('Multi-Tenant SaaS Deployment', 6, 27500.00, CURRENT_DATE + INTERVAL '15 days', 'Won', NOW() - INTERVAL '25 days', NOW() - INTERVAL '1 day'),
('Omnichannel POS Integration', 7, 22000.00, CURRENT_DATE - INTERVAL '45 days', 'Lost', NOW() - INTERVAL '110 days', NOW() - INTERVAL '45 days'),
('Digital Ad Analytics Engine', 8, 38000.00, CURRENT_DATE + INTERVAL '40 days', 'Negotiation', NOW() - INTERVAL '22 days', NOW() - INTERVAL '2 days'),
('Solar Grid SCADA Monitoring', 9, 76000.00, CURRENT_DATE + INTERVAL '90 days', 'Prospecting', NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days'),
('Factory ERP Overhaul', 10, 64000.00, CURRENT_DATE - INTERVAL '60 days', 'Lost', NOW() - INTERVAL '140 days', NOW() - INTERVAL '60 days');

-- ===================================================================
-- 4. SEED ACTIVITIES (20 records)
-- ===================================================================
INSERT INTO activities (customer_id, type, description, created_at) VALUES
(1, 'Call', 'Quarterly review call with Alex regarding cloud deployment milestones.', NOW() - INTERVAL '45 days'),
(1, 'Email', 'Sent proposal document and SLA terms for Annual Security Audit.', NOW() - INTERVAL '20 days'),
(1, 'Note', 'Customer expressed high satisfaction with cloud migration phase 1 delivery.', NOW() - INTERVAL '5 days'),
(2, 'Meeting', 'On-site technical demo of Robotics Firmware Suite with Brenda and engineering leads.', NOW() - INTERVAL '30 days'),
(2, 'Email', 'Followed up with security clearance documentation requested by client.', NOW() - INTERVAL '15 days'),
(3, 'Meeting', 'Compliance review meeting with Charles regarding HIPAA-ready EMR integration.', NOW() - INTERVAL '40 days'),
(3, 'Call', 'Confirmed go-live schedule for Telemedicine pilot across 3 regional clinics.', NOW() - INTERVAL '12 days'),
(4, 'Call', 'Discussed fleet expansion requirements with Diana Prince.', NOW() - INTERVAL '35 days'),
(4, 'Meeting', 'Presented warehouse automation ROI presentation to executive team.', NOW() - INTERVAL '15 days'),
(4, 'Note', 'Budget approved for fleet tracking; contract sent to legal for review.', NOW() - INTERVAL '2 days'),
(5, 'Call', 'Discussed API throughput limits and redundancy requirements for Core Banking.', NOW() - INTERVAL '50 days'),
(5, 'Email', 'Shared wireframes and user flow documentation for Wealth Portal redesign.', NOW() - INTERVAL '18 days'),
(5, 'Meeting', 'Executive steering committee check-in with Edward Norton.', NOW() - INTERVAL '3 days'),
(6, 'Call', 'Introductory kickoff call with Fiona Gallagher regarding SaaS onboarding.', NOW() - INTERVAL '25 days'),
(6, 'Note', 'Provisioned staging credentials and shared API developer documentation.', NOW() - INTERVAL '12 days'),
(7, 'Call', 'Check-in call with George Clark regarding account status and feedback.', NOW() - INTERVAL '60 days'),
(8, 'Meeting', 'Reviewed real-time ad analytics dashboard prototype with Hannah Abbott.', NOW() - INTERVAL '22 days'),
(8, 'Email', 'Sent revised quotation with discounted volume pricing tier.', NOW() - INTERVAL '4 days'),
(9, 'Meeting', 'Initial discovery session on solar farm IoT sensor integration.', NOW() - INTERVAL '10 days'),
(10, 'Note', 'Account marked inactive following internal corporate restructuring.', NOW() - INTERVAL '60 days');
