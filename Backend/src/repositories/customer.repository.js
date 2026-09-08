import pool from '../config/db.js';

/**
 * Customer Repository
 * Handles all database operations for the customers table.
 */

/**
 * Get all customers with optional search and status filtering
 * @param {Object} options - { search, status }
 * @returns {Promise<Array>} List of customers
 */
export async function findAll({ search, status } = {}) {
  let query = 'SELECT * FROM customers';
  const params = [];
  const conditions = [];

  if (search) {
    params.push(`%${search}%`);
    conditions.push(`(name ILIKE $${params.length} OR company ILIKE $${params.length})`);
  }

  if (status) {
    params.push(status);
    conditions.push(`status = $${params.length}`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`;
  }

  query += ' ORDER BY id ASC';

  const result = await pool.query(query, params);
  return result.rows;
}

/**
 * Get customer by ID
 * @param {number|string} id 
 * @returns {Promise<Object|null>} Customer record or null
 */
export async function findById(id) {
  const result = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
  return result.rows[0] || null;
}

/**
 * Create a new customer
 * @param {Object} customerData - { name, company, email, phone, status }
 * @returns {Promise<Object>} Created customer record
 */
export async function create({ name, company, email, phone, status }) {
  const query = `
    INSERT INTO customers (name, company, email, phone, status)
    VALUES ($1, $2, $3, $4, COALESCE($5, 'active'))
    RETURNING *;
  `;
  const result = await pool.query(query, [name, company, email, phone, status]);
  return result.rows[0];
}

/**
 * Update an existing customer
 * @param {number|string} id 
 * @param {Object} updateData - { name, company, email, phone, status }
 * @returns {Promise<Object|null>} Updated customer or null if not found
 */
export async function update(id, { name, company, email, phone, status }) {
  const query = `
    UPDATE customers
    SET 
      name = COALESCE($1, name),
      company = COALESCE($2, company),
      email = COALESCE($3, email),
      phone = COALESCE($4, phone),
      status = COALESCE($5, status)
    WHERE id = $6
    RETURNING *;
  `;
  const result = await pool.query(query, [name, company, email, phone, status, id]);
  return result.rows[0] || null;
}

/**
 * Delete customer by ID
 * @param {number|string} id 
 * @returns {Promise<Object|null>} Deleted record or null if not found
 */
export async function deleteById(id) {
  const result = await pool.query('DELETE FROM customers WHERE id = $1 RETURNING *;', [id]);
  return result.rows[0] || null;
}

/**
 * Search customers by name or company
 * @param {string} searchTerm 
 * @returns {Promise<Array>}
 */
export async function search(searchTerm) {
  const query = `
    SELECT * FROM customers
    WHERE name ILIKE $1 OR company ILIKE $1
    ORDER BY id ASC;
  `;
  const result = await pool.query(query, [`%${searchTerm}%`]);
  return result.rows;
}

/**
 * Filter customers by status
 * @param {string} status - 'active' | 'inactive'
 * @returns {Promise<Array>}
 */
export async function findByStatus(status) {
  const query = 'SELECT * FROM customers WHERE status = $1 ORDER BY id ASC;';
  const result = await pool.query(query, [status]);
  return result.rows;
}

/**
 * Calculate total opportunity value for a specific customer
 * @param {number|string} customerId 
 * @returns {Promise<number>} Total pipeline value
 */
export async function getTotalOpportunityValue(customerId) {
  const query = `
    SELECT COALESCE(SUM(value), 0)::numeric AS total_value
    FROM opportunities
    WHERE customer_id = $1;
  `;
  const result = await pool.query(query, [customerId]);
  return Number(result.rows[0]?.total_value || 0);
}

export const customerRepository = {
  findAll,
  findById,
  create,
  update,
  deleteById,
  search,
  findByStatus,
  getTotalOpportunityValue,
};

export default customerRepository;
