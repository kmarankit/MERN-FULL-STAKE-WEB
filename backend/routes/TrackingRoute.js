// routes/visitorRoute.js
import express from 'express';
import { trackVisitor,getAllVisitors } from '../controllers/visitorController.js';

const router = express.Router();

// This route will handle the POST request from your React component
// The full URL will be /api/track-visitor
router.post('/track-visitor', trackVisitor);
router.get('/visitors', getAllVisitors);
export default router;