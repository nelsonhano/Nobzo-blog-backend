const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const AppError = require('../utils/AppError');
const globalErrorHandler = require('../middleware/error');
const authRoutes = require('../routes/authRoutes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', require('../routes/postRoutes'));

// 404 handler (ALWAYS last)
app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
