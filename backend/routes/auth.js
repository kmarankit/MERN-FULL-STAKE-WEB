// import express from 'express';
// import jwt from 'jsonwebtoken';
// import { getAuth } from 'firebase-admin/auth'; // Make sure firebase-admin is initialized
// import admin from '../GoogleAuth/firebaseAdmin.js'; // your firebase-admin config

// const router = express.Router();

// /**
//  * 1️⃣ Google Login Route
//  */
// router.post('/google', async (req, res) => {
//     const { idToken } = req.body;

//     if (!idToken) return res.status(400).json({ success: false, message: 'ID token missing' });

//     try {
//         // Verify Firebase token
//         const decodedToken = await admin.auth().verifyIdToken(idToken);
//         const { uid, email } = decodedToken;

//         // Issue your backend JWT
//         const token = jwt.sign({ id: uid, email }, process.env.JWT_SECRET, { expiresIn: '7d' });

//         res.json({ success: true, token });
//     } catch (err) {
//         console.error(err);
//         res.status(401).json({ success: false, message: 'Invalid Firebase token' });
//     }
// });

// /**
//  * 2️⃣ Firebase Email/Password Login Route
//  */
// router.post('/firebase', async (req, res) => {
//     const { idToken } = req.body;
//     if (!idToken) return res.status(400).json({ success: false, message: 'ID token missing' });

//     try {
//         // Verify Firebase ID token
//         const decodedToken = await admin.auth().verifyIdToken(idToken);
//         const { uid, email } = decodedToken;

//         // Issue your backend JWT
//         const token = jwt.sign({ id: uid, email }, process.env.JWT_SECRET, { expiresIn: '7d' });

//         res.json({ success: true, token });
//     } catch (err) {
//         console.error(err);
//         res.status(401).json({ success: false, message: 'Invalid Firebase token' });
//     }
// });

// export default router;

import express from 'express';
import jwt from 'jsonwebtoken';
import admin from '../GoogleAuth/firebaseAdmin.js';

const router = express.Router();

// Google Login
router.post('/google', async (req, res) => {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ success: false, message: 'ID token missing' });

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { uid, email } = decodedToken;

        const token = jwt.sign({ id: uid, email }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

        res.json({ success: true, token });
    } catch (err) {
        console.error(err);
        res.status(401).json({ success: false, message: 'Invalid Firebase token' });
    }
});

// Firebase Email/Password Login
router.post('/firebase', async (req, res) => {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ success: false, message: 'ID token missing' });

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { uid, email } = decodedToken;

        const token = jwt.sign({ id: uid, email }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

        res.json({ success: true, token });
    } catch (err) {
        console.error(err);
        res.status(401).json({ success: false, message: 'Invalid Firebase token' });
    }
});

export default router;
