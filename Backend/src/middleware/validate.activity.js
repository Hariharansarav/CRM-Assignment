/**
 * Activity Request Validation Middleware
 */

const ALLOWED_ACTIVITY_TYPES = ['Call', 'Email', 'Meeting', 'Note'];

/**
 * Validate customer ID in route parameters (:customerId)
 */
export function validateCustomerIdParam(req, res, next) {
  const { customerId } = req.params;
  const parsedId = Number(customerId);

  if (!customerId || !Number.isInteger(parsedId) || parsedId <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid customer ID format. ID must be a positive integer.',
    });
  }

  next();
}

/**
 * Validate activity ID in route parameters (:id)
 */
export function validateActivityId(req, res, next) {
  const { id } = req.params;
  const parsedId = Number(id);

  if (!id || !Number.isInteger(parsedId) || parsedId <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid activity ID format. ID must be a positive integer.',
    });
  }

  next();
}

/**
 * Validate activity creation payload (POST /api/customers/:customerId/activities)
 */
export function validateCreateActivity(req, res, next) {
  const { type, description } = req.body || {};
  const errors = {};

  // Type validation
  if (type === undefined || type === null || typeof type !== 'string' || type.trim() === '') {
    errors.type = 'Activity type is required';
  } else if (!ALLOWED_ACTIVITY_TYPES.includes(type.trim())) {
    errors.type = 'Invalid activity type. Allowed types: Call, Email, Meeting, Note';
  }

  // Description validation
  if (description === undefined || description === null || typeof description !== 'string') {
    errors.description = 'Description is required and cannot be empty';
  } else if (description.trim() === '') {
    errors.description = 'Description cannot be empty';
  } else if (description.trim().length > 5000) {
    errors.description = 'Description exceeds maximum allowed length of 5000 characters';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  // Sanitize
  req.body.type = type.trim();
  req.body.description = description.trim();

  next();
}
