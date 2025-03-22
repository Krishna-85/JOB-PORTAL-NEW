import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import clerkWebhookRoutes from './routes/clerkWebhookRoutes.js';

// Load Environment Variables
dotenv.config();

// Initialize Sentry
 

// Initialize Express
const app = express();

 

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(morgan('dev'));

// Clerk Webhooks (must come before express.json)
app.use('/api/webhooks', express.raw({ type: 'application/json' }));
app.use('/api/webhooks', clerkWebhookRoutes);

// Connect to Database
connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('API is working');
});

 

 

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
