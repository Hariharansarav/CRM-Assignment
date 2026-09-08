
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Catch-all 404 handler for undefined routes
 */
export function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
}

/**
 * Centralized error handler middleware
 */
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const isClientError = statusCode >= 400 && statusCode < 500;

  // Log unexpected server errors for debugging without leaking to client
  if (statusCode >= 500) {
    console.error(`[Server Error] ${req.method} ${req.originalUrl}:`, err.message || err);
  }

  // Sanitize message: never expose raw database errors or stack traces in 500 responses
  const message = isClientError ? (err.message || 'Bad Request') : 'Internal Server Error';

  const response = {
    success: false,
    message,
  };

  // Include field validation errors if present
  if (err.errors && typeof err.errors === 'object') {
    response.errors = err.errors;
  }

  res.status(statusCode).json(response);
}

export default {
  AppError,
  notFoundHandler,
  errorHandler,
};
