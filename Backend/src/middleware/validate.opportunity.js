/**
 * Opportunity Request Validation Middleware
 */

const ALLOWED_OPPORTUNITY_STATUSES = ['Prospecting', 'Proposal', 'Negotiation', 'Won', 'Lost'];

/**
 * Validate opportunity ID in route parameter (:id)
 */
export function validateOpportunityId(req, res, next) {
  const { id } = req.params;
  const parsedId = Number(id);

  if (!id || !Number.isInteger(parsedId) || parsedId <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid opportunity ID format. ID must be a positive integer.',
    });
  }

  next();
}

/**
 * Validate query parameters on GET /api/opportunities
 */
export function validateQueryOpportunities(req, res, next) {
  const { status } = req.query;

  if (status !== undefined && status !== null && status !== '') {
    if (!ALLOWED_OPPORTUNITY_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status parameter. Allowed values: ${ALLOWED_OPPORTUNITY_STATUSES.join(', ')}`,
      });
    }
  }

  next();
}

/**
 * Helper to validate date string
 */
function isValidDate(dateString) {
  if (typeof dateString !== 'string') return false;
  const timestamp = Date.parse(dateString);
  return !isNaN(timestamp);
}

/**
 * Validate opportunity creation payload (POST /api/opportunities)
 */
export function validateCreateOpportunity(req, res, next) {
  const { name, customer_id, value, expected_closing_date, status } = req.body || {};
  const errors = {};

  // Name validation
  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.name = 'Name is required and must not be empty';
  }

  // Customer ID validation
  const parsedCustId = Number(customer_id);
  if (customer_id === undefined || customer_id === null || !Number.isInteger(parsedCustId) || parsedCustId <= 0) {
    errors.customer_id = 'customer_id is required and must be a positive integer';
  }

  // Value validation
  const parsedValue = Number(value);
  if (value === undefined || value === null || value === '' || isNaN(parsedValue)) {
    errors.value = 'Value is required and must be numeric';
  } else if (parsedValue < 0) {
    errors.value = 'Value cannot be negative';
  }

  // Expected closing date validation
  if (!expected_closing_date || !isValidDate(expected_closing_date)) {
    errors.expected_closing_date = 'expected_closing_date is required and must be a valid date';
  }

  // Status validation
  if (!status || typeof status !== 'string') {
    errors.status = 'Status is required';
  } else if (!ALLOWED_OPPORTUNITY_STATUSES.includes(status)) {
    errors.status = `Status must be one of: ${ALLOWED_OPPORTUNITY_STATUSES.join(', ')}`;
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  // Sanitize
  req.body.name = name.trim();
  req.body.customer_id = parsedCustId;
  req.body.value = parsedValue;
  req.body.expected_closing_date = expected_closing_date.trim();
  req.body.status = status.trim();

  next();
}

/**
 * Validate opportunity update payload (PUT /api/opportunities/:id)
 */
export function validateUpdateOpportunity(req, res, next) {
  const { name, customer_id, value, expected_closing_date, status } = req.body || {};
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

  // Customer ID validation if provided
  if (customer_id !== undefined && customer_id !== null) {
    const parsedCustId = Number(customer_id);
    if (!Number.isInteger(parsedCustId) || parsedCustId <= 0) {
      errors.customer_id = 'customer_id must be a positive integer';
    }
  }

  // Value validation if provided
  if (value !== undefined && value !== null) {
    const parsedValue = Number(value);
    if (value === '' || isNaN(parsedValue)) {
      errors.value = 'Value must be numeric';
    } else if (parsedValue < 0) {
      errors.value = 'Value cannot be negative';
    }
  }

  // Expected closing date validation if provided
  if (expected_closing_date !== undefined && expected_closing_date !== null) {
    if (!isValidDate(expected_closing_date)) {
      errors.expected_closing_date = 'expected_closing_date must be a valid date';
    }
  }

  // Status validation if provided
  if (status !== undefined && status !== null) {
    if (!ALLOWED_OPPORTUNITY_STATUSES.includes(status)) {
      errors.status = `Status must be one of: ${ALLOWED_OPPORTUNITY_STATUSES.join(', ')}`;
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
  if (customer_id !== undefined && customer_id !== null) req.body.customer_id = Number(customer_id);
  if (value !== undefined && value !== null) req.body.value = Number(value);
  if (expected_closing_date !== undefined && expected_closing_date !== null) {
    req.body.expected_closing_date = expected_closing_date.trim();
  }
  if (status !== undefined && status !== null) req.body.status = status.trim();

  next();
}
