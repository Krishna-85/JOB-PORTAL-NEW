import "./src/Config/instrument.js"
import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import connectDB from './src/Config/db.js'
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./src/controllers/webhooks.js"
import dotenv from "dotenv";
dotenv.config();
import companyRoutes from './src/routes/companyRoutes.js'
import connectCloudinary from "./src/Config/cloudinary.js"
import jobRoutes from './src/routes/jobRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'




// Initialize express
const app = express()

// Connect to MongoDB
connectDB();
await connectCloudinary()

// Middlwares
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

// Routes
app.get('/', (req, res) => {
    res.send('API is running...')
}) 
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });

app.post('/webhooks', clerkWebhooks)
app.use('/api/company', companyRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes)

  

// Port
const PORT = process.env.PORT || 5000
Sentry.setupExpressErrorHandler(app);

// Listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

