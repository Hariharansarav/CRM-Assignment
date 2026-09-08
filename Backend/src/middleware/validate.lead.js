/**
 * Lead Request Validation Middleware
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_LEAD_STATUSES = ['New', 'Contacted', 'Qualified', 'Lost'];

/**
 * Validate lead ID in route parameter (:id)
 */
export function validateLeadId(req, res, next) {
  const { id } = req.params;
  const parsedId = Number(id);

  if (!id || !Number.isInteger(parsedId) || parsedId <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid lead ID format. ID must be a positive integer.',
    });
  }

  next();
}

/**
 * Validate query parameters on GET /api/leads
 */
export function validateQueryLeads(req, res, next) {
  const { status } = req.query;

  if (status !== undefined && status !== null && status !== '') {
    if (!ALLOWED_LEAD_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status parameter. Allowed values: ${ALLOWED_LEAD_STATUSES.join(', ')}`,
      });
    }
  }

  next();
}

/**
 * Validate lead creation payload (POST /api/leads)
 */
export function validateCreateLead(req, res, next) {
  const { name, company, email, phone, source, status, assigned_to } = req.body || {};
  const errors = {};

  // Name validation
  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.name = 'Name is required and must not be empty';
  }

  // Company validation
  if (!company || typeof company !== 'string' || !company.trim()) {
    errors.company = 'Company is required and must not be empty';
  }

  // Email validation
  if (!email || typeof email !== 'string' || !email.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = 'Invalid email format';
  }

  // Phone validation
  if (phone !== undefined && phone !== null && typeof phone === 'string') {
    const trimmedPhone = phone.trim();
    if (trimmedPhone && (trimmedPhone.length < 7 || trimmedPhone.length > 30)) {
      errors.phone = 'Phone number must be between 7 and 30 characters';
    }
  }

  // Source validation
  if (!source || typeof source !== 'string' || !source.trim()) {
    errors.source = 'Source is required and must not be empty';
  }

  // Status validation
  if (status !== undefined && status !== null) {
    if (!ALLOWED_LEAD_STATUSES.includes(status)) {
      errors.status = `Status must be one of: ${ALLOWED_LEAD_STATUSES.join(', ')}`;
    }
  }

  // Assigned_to validation
  if (assigned_to !== undefined && assigned_to !== null && typeof assigned_to !== 'string') {
    errors.assigned_to = 'Assigned to must be a valid string';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  // Sanitize trimmed values
  req.body.name = name.trim();
  req.body.company = company.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.source = source.trim();
  if (phone) req.body.phone = phone.trim();
  req.body.status = status || 'New';
  if (assigned_to) req.body.assigned_to = assigned_to.trim();

  next();
}

/**
 * Validate lead update payload (PUT /api/leads/:id)
 */
export function validateUpdateLead(req, res, next) {
  const { name, company, email, phone, source, status, assigned_to } = req.body || {};
  const errors = {};

  if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: { body: 'Request body cannot be empty for update' },
    });
  }

  // Name validation if provided
  if (name !== undefined) {
    if (typeof name !== 'string' || !name.trim()) {
      errors.name = 'Name must not be empty';
    }
  }

  // Company validation if provided
  if (company !== undefined) {
    if (typeof company !== 'string' || !company.trim()) {
      errors.company = 'Company must not be empty';
    }
  }

  // Email validation if provided
  if (email !== undefined) {
    if (typeof email !== 'string' || !email.trim()) {
      errors.email = 'Email must not be empty';
    } else if (!EMAIL_REGEX.test(email.trim())) {
      errors.email = 'Invalid email format';
    }
  }

  // Phone validation if provided
  if (phone !== undefined && phone !== null) {
    if (typeof phone !== 'string') {
      errors.phone = 'Phone must be a string';
    } else {
      const trimmedPhone = phone.trim();
      if (trimmedPhone && (trimmedPhone.length < 7 || trimmedPhone.length > 30)) {
        errors.phone = 'Phone number must be between 7 and 30 characters';
      }
    }
  }

  // Source validation if provided
  if (source !== undefined) {
    if (typeof source !== 'string' || !source.trim()) {
      errors.source = 'Source must not be empty';
    }
  }

  // Status validation if provided
  if (status !== undefined && status !== null) {
    if (!ALLOWED_LEAD_STATUSES.includes(status)) {
      errors.status = `Status must be one of: ${ALLOWED_LEAD_STATUSES.join(', ')}`;
    }
  }

  // Assigned_to validation if provided
  if (assigned_to !== undefined && assigned_to !== null && typeof assigned_to !== 'string') {
    errors.assigned_to = 'Assigned to must be a valid string';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  // Sanitize trimmed fields
  if (name !== undefined) req.body.name = name.trim();
  if (company !== undefined) req.body.company = company.trim();
  if (email !== undefined) req.body.email = email.trim().toLowerCase();
  if (phone !== undefined && typeof phone === 'string') req.body.phone = phone.trim();
  if (source !== undefined) req.body.source = source.trim();
  if (assigned_to !== undefined && typeof assigned_to === 'string') req.body.assigned_to = assigned_to.trim();

  next();
}
