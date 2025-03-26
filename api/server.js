import "./src/Config/instrument.js"
import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import connectDB from './src/Config/db.js'
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from "./src/controllers/webhooks.js"




// Initialize express
const app = express()

// Connect to MongoDB
connectDB();

// Middlwares
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.send('API is running...')
}) 
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });

  app.post('/webhooks', clerkWebhooks)

  

// Port
const PORT = process.env.PORT || 5000
Sentry.setupExpressErrorHandler(app);

// Listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

