import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import morgan from 'morgan'
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js'




//Initilize Express
const app = express()


// Connect to database
await connectDB()

//Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//Routes
app.get('/', (req, res)=>{res.send('api working')})

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });

app.post('/webhooks', clerkWebhooks)
  

//Port
const PORT  = process.env.PORT || 5000

// Sentry Error handling
Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`)
})
