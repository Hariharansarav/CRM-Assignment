import pool from '../config/db.js';

/**
 * Dashboard Repository
 * Handles all database queries and aggregations for the CRM dashboard.
 */

/**
 * Get total number of customers
 * @returns {Promise<number>}
 */
export async function getTotalCustomers() {
  const result = await pool.query('SELECT COUNT(*)::int AS count FROM customers;');
  return Number(result.rows[0]?.count || 0);
}

/**
 * Get total number of leads
 * @returns {Promise<number>}
 */
export async function getTotalLeads() {
  const result = await pool.query('SELECT COUNT(*)::int AS count FROM leads;');
  return Number(result.rows[0]?.count || 0);
}

/**
 * Get count of open opportunities (excludes 'Won' and 'Lost')
 * @returns {Promise<number>}
 */
export async function getOpenOpportunities() {
  const query = "SELECT COUNT(*)::int AS count FROM opportunities WHERE status NOT IN ('Won', 'Lost');";
  const result = await pool.query(query);
  return Number(result.rows[0]?.count || 0);
}

/**
 * Get count of won opportunities
 * @returns {Promise<number>}
 */
export async function getWonOpportunities() {
  const query = "SELECT COUNT(*)::int AS count FROM opportunities WHERE status = 'Won';";
  const result = await pool.query(query);
  return Number(result.rows[0]?.count || 0);
}

/**
 * Get total revenue from won opportunities only
 * @returns {Promise<number>}
 */
export async function getTotalRevenue() {
  const query = "SELECT COALESCE(SUM(value), 0)::numeric AS total_revenue FROM opportunities WHERE status = 'Won';";
  const result = await pool.query(query);
  return Number(result.rows[0]?.total_revenue || 0);
}

/**
 * Get recently added customers
 * @param {number} limit 
 * @returns {Promise<Array>}
 */
export async function getRecentCustomers(limit = 5) {
  const query = `
    SELECT id, name, company, email, status, created_at
    FROM customers
    ORDER BY created_at DESC
    LIMIT $1;
  `;
  const result = await pool.query(query, [limit]);
  return result.rows;
}

/**
 * Get recently added leads
 * @param {number} limit 
 * @returns {Promise<Array>}
 */
export async function getRecentLeads(limit = 5) {
  const query = `
    SELECT id, name, company, email, status, assigned_to, created_at
    FROM leads
    ORDER BY created_at DESC
    LIMIT $1;
  `;
  const result = await pool.query(query, [limit]);
  return result.rows;
}

/**
 * Get opportunities grouped by status
 * Ensures all 5 statuses are represented even if count is 0
 * @returns {Promise<Object>}
 */
export async function getOpportunitiesByStatus() {
  const query = `
    SELECT status, COUNT(*)::int AS count
    FROM opportunities
    GROUP BY status;
  `;
  const result = await pool.query(query);

  const statusCounts = {
    Prospecting: 0,
    Proposal: 0,
    Negotiation: 0,
    Won: 0,
    Lost: 0,
  };

  result.rows.forEach((row) => {
    if (Object.prototype.hasOwnProperty.call(statusCounts, row.status)) {
      statusCounts[row.status] = Number(row.count);
    }
  });

  return statusCounts;
}

export const dashboardRepository = {
  getTotalCustomers,
  getTotalLeads,
  getOpenOpportunities,
  getWonOpportunities,
  getTotalRevenue,
  getRecentCustomers,
  getRecentLeads,
  getOpportunitiesByStatus,
};

export default dashboardRepository;
