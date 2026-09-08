import pool from '../config/db.js';

/**
 * Activity Repository
 * Handles all database operations for the activities table.
 */

export async function findByCustomerId(customerId) {
  const query = `
    SELECT 
      id,
      customer_id,
      type,
      description,
      created_at
    FROM activities
    WHERE customer_id = $1
    ORDER BY created_at DESC;
  `;
  const result = await pool.query(query, [customerId]);
  return result.rows;
}

export async function create({ customer_id, type, description }) {
  const query = `
    INSERT INTO activities (customer_id, type, description)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const result = await pool.query(query, [customer_id, type, description]);
  return result.rows[0];
}

export async function findById(id) {
  const query = 'SELECT * FROM activities WHERE id = $1;';
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
}

export async function findAll({ limit = 50 } = {}) {
  const query = `
    SELECT 
      a.id,
      a.customer_id,
      c.name AS customer_name,
      c.company AS customer_company,
      a.type,
      a.description,
      a.created_at
    FROM activities a
    JOIN customers c ON a.customer_id = c.id
    ORDER BY a.created_at DESC
    LIMIT $1;
  `;
  const result = await pool.query(query, [limit]);
  return result.rows;
}

export async function deleteById(id) {
  const result = await pool.query('DELETE FROM activities WHERE id = $1 RETURNING *;', [id]);
  return result.rows[0] || null;
}

export const activityRepository = {
  findByCustomerId,
  create,
  findById,
  findAll,
  deleteById,
  delete: deleteById,
};

export default activityRepository;
