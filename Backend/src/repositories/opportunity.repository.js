import pool from '../config/db.js';

/**
 * Opportunity Repository
 * Handles all database operations for the opportunities table.
 */

export async function findAll({ status, customerId } = {}) {
  let query = `
    SELECT 
      o.id,
      o.name,
      o.customer_id,
      c.name AS customer_name,
      c.company AS customer_company,
      o.value,
      o.expected_closing_date,
      o.status,
      o.created_at,
      o.updated_at
    FROM opportunities o
    JOIN customers c ON o.customer_id = c.id
  `;
  const params = [];
  const conditions = [];

  if (status) {
    params.push(status);
    conditions.push(`o.status = $${params.length}`);
  }

  if (customerId) {
    params.push(customerId);
    conditions.push(`o.customer_id = $${params.length}`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`;
  }

  query += ' ORDER BY o.id ASC';

  const result = await pool.query(query, params);
  return result.rows;
}

export async function findById(id) {
  const query = `
    SELECT 
      o.id,
      o.name,
      o.customer_id,
      c.name AS customer_name,
      c.company AS customer_company,
      o.value,
      o.expected_closing_date,
      o.status,
      o.created_at,
      o.updated_at
    FROM opportunities o
    JOIN customers c ON o.customer_id = c.id
    WHERE o.id = $1;
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
}

export async function findByCustomerId(customerId) {
  const query = `
    SELECT 
      id,
      name,
      customer_id,
      value,
      expected_closing_date,
      status,
      created_at,
      updated_at
    FROM opportunities
    WHERE customer_id = $1
    ORDER BY expected_closing_date ASC, created_at DESC;
  `;
  const result = await pool.query(query, [customerId]);
  return result.rows;
}

export async function create({ name, customer_id, value, expected_closing_date, status }) {
  const query = `
    INSERT INTO opportunities (name, customer_id, value, expected_closing_date, status)
    VALUES ($1, $2, COALESCE($3, 0), $4, COALESCE($5, 'Prospecting'))
    RETURNING *;
  `;
  const result = await pool.query(query, [
    name,
    customer_id,
    value,
    expected_closing_date,
    status,
  ]);
  return result.rows[0];
}

export async function update(id, { name, customer_id, value, expected_closing_date, status }) {
  const query = `
    UPDATE opportunities
    SET 
      name = COALESCE($1, name),
      customer_id = COALESCE($2, customer_id),
      value = COALESCE($3, value),
      expected_closing_date = COALESCE($4, expected_closing_date),
      status = COALESCE($5, status)
    WHERE id = $6
    RETURNING *;
  `;
  const result = await pool.query(query, [
    name,
    customer_id,
    value,
    expected_closing_date,
    status,
    id,
  ]);
  return result.rows[0] || null;
}

export async function deleteById(id) {
  const result = await pool.query('DELETE FROM opportunities WHERE id = $1 RETURNING *;', [id]);
  return result.rows[0] || null;
}

export async function findByStatus(status) {
  const query = `
    SELECT 
      o.*,
      c.name AS customer_name,
      c.company AS customer_company
    FROM opportunities o
    JOIN customers c ON o.customer_id = c.id
    WHERE o.status = $1
    ORDER BY o.created_at DESC;
  `;
  const result = await pool.query(query, [status]);
  return result.rows;
}

export async function getTotalValueByCustomerId(customerId) {
  const query = `
    SELECT COALESCE(SUM(value), 0)::numeric AS total_value
    FROM opportunities
    WHERE customer_id = $1;
  `;
  const result = await pool.query(query, [customerId]);
  return Number(result.rows[0]?.total_value || 0);
}

export const opportunityRepository = {
  findAll,
  findById,
  findByCustomerId,
  create,
  update,
  deleteById,
  findByStatus,
  getTotalValueByCustomerId,
};

export default opportunityRepository;
