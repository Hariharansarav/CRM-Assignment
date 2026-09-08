/**
 * Customer Request Validation Middleware
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_STATUSES = ['active', 'inactive'];

/**
 * Validate customer ID in route parameter (:id)
 */
export function validateCustomerId(req, res, next) {
  const { id } = req.params;
  const parsedId = Number(id);

  if (!id || !Number.isInteger(parsedId) || parsedId <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid customer ID format. ID must be a positive integer.',
    });
  }

  next();
}

/**
 * Validate customer creation payload (POST /api/customers)
 */
export function validateCreateCustomer(req, res, next) {
  const { name, company, email, phone, status } = req.body || {};
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

  // Phone validation (reasonable phone format)
  if (phone !== undefined && phone !== null && typeof phone === 'string') {
    const trimmedPhone = phone.trim();
    if (trimmedPhone && (trimmedPhone.length < 7 || trimmedPhone.length > 30)) {
      errors.phone = 'Phone number must be between 7 and 30 characters';
    }
  }

  // Status validation
  if (status !== undefined && status !== null) {
    if (!ALLOWED_STATUSES.includes(status)) {
      errors.status = `Status must be one of: ${ALLOWED_STATUSES.join(', ')}`;
    }
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
  if (phone) req.body.phone = phone.trim();
  if (status) req.body.status = status;

  next();
}

/**
 * Validate customer update payload (PUT /api/customers/:id)
 */
export function validateUpdateCustomer(req, res, next) {
  const { name, company, email, phone, status } = req.body || {};
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

  // Status validation if provided
  if (status !== undefined && status !== null) {
    if (!ALLOWED_STATUSES.includes(status)) {
      errors.status = `Status must be one of: ${ALLOWED_STATUSES.join(', ')}`;
    }
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

  next();
}
