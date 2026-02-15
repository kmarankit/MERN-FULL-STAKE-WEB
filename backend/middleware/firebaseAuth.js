// import admin from '../GoogleAuth/firebaseAdmin.js';
// import asyncHandler from 'express-async-handler';

// const firebaseAuthMiddleware = asyncHandler(async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   if (!token) {
//     res.status(401);
//     throw new Error('No token provided');
//   }

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     req.user = { uid: decodedToken.uid, email: decodedToken.email };
//     next();
//   } catch (err) {
//     console.error('Firebase auth error:', err.message);
//     res.status(403).json({ success: false, message: 'Invalid or expired token' });
//   }
// });

// export default firebaseAuthMiddleware;
import admin from '../GoogleAuth/firebaseAdmin.js';

export const verifyFirebaseToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Invalid token' });
    }
};
