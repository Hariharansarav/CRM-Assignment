import pool from '../config/db.js';

/**
 * Lead Repository
 * Handles all database operations for the leads table.
 */

export async function findAll({ search, status } = {}) {
  let query = 'SELECT * FROM leads';
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

export async function findById(id) {
  const result = await pool.query('SELECT * FROM leads WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function create({ name, company, email, phone, source, status, assigned_to }) {
  const query = `
    INSERT INTO leads (name, company, email, phone, source, status, assigned_to)
    VALUES ($1, $2, $3, $4, COALESCE($5, 'Other'), COALESCE($6, 'New'), $7)
    RETURNING *;
  `;
  const result = await pool.query(query, [
    name,
    company,
    email,
    phone,
    source,
    status,
    assigned_to,
  ]);
  return result.rows[0];
}

export async function update(id, { name, company, email, phone, source, status, assigned_to }) {
  const query = `
    UPDATE leads
    SET 
      name = COALESCE($1, name),
      company = COALESCE($2, company),
      email = COALESCE($3, email),
      phone = COALESCE($4, phone),
      source = COALESCE($5, source),
      status = COALESCE($6, status),
      assigned_to = COALESCE($7, assigned_to)
    WHERE id = $8
    RETURNING *;
  `;
  const result = await pool.query(query, [
    name,
    company,
    email,
    phone,
    source,
    status,
    assigned_to,
    id,
  ]);
  return result.rows[0] || null;
}

export async function deleteById(id) {
  const result = await pool.query('DELETE FROM leads WHERE id = $1 RETURNING *;', [id]);
  return result.rows[0] || null;
}

export async function search(searchTerm) {
  const query = `
    SELECT * FROM leads
    WHERE name ILIKE $1 OR company ILIKE $1
    ORDER BY id ASC;
  `;
  const result = await pool.query(query, [`%${searchTerm}%`]);
  return result.rows;
}

export async function findByStatus(status) {
  const query = 'SELECT * FROM leads WHERE status = $1 ORDER BY id ASC;';
  const result = await pool.query(query, [status]);
  return result.rows;
}

export const leadRepository = {
  findAll,
  findById,
  create,
  update,
  deleteById,
  search,
  findByStatus,
};

export default leadRepository;
