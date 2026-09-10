import express from 'express';
import cors from 'cors';
import customerRoutes from './routes/customer.routes.js';
import leadRoutes from './routes/lead.routes.js';
import opportunityRoutes from './routes/opportunity.routes.js';
import activityRoutes from './routes/activity.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import { notFoundHandler, errorHandler } from './middleware/error.middleware.js';

const app = express();

// Middlewares
const corsOptions = {
  origin: (origin, callback) => {
    // Allow local development and deployed origins
    callback(null, true);
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Lightweight request timing middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (process.env.NODE_ENV !== 'production' || duration > 800) {
      console.log(`${req.method} ${req.originalUrl} - ${duration}ms [${res.statusCode}]`);
    }
  });
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'CRM API is running',
  });
});

// API Routes
app.use('/api/customers', customerRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api', activityRoutes);


app.use(notFoundHandler);

app.use(errorHandler);

export default app;
