const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const hpp = require('hpp');
const dbConnect = require('./Config/dataBase');

const errorMW = require('./Middlewares/errorMW');
const userRoute = require('./Routes/userRoute');
const authRoute = require('./Routes/authRoute');

dotenv.config({ path: './config.env' });

const app = express();

// Connect to database
dbConnect();

// Middlewares
app.use(hpp());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);

// Error Middleware
app.use(errorMW);

// ✅ Vercel will use this exported app
module.exports = app;

