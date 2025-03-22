// routes/clerkWebhookRoutes.js
import express from 'express';
import { clerkWebhooks } from '../controllers/webhooks.js';

const router = express.Router();

router.post('/clerk',  express.raw({ type: 'application/json' }), clerkWebhooks);

export default router;