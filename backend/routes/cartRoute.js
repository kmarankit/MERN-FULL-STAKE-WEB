// import express from 'express';
// import {
//     getCart,
//     addToCart,
//     updateCartItem,
//     deleteCartItem,
//     clearCart,
// } from '../controllers/cartController.js';
// import authMiddleware from '../middleware/auth.js';

// const router = express.Router();

// router
//     .route('/')
//     .get(authMiddleware, getCart)
//     .post(authMiddleware, addToCart);

// router.post('/clear', authMiddleware, clearCart);

// router
//     .route('/:id')
//     .put(authMiddleware, updateCartItem)
//     .delete(authMiddleware, deleteCartItem);

// export default router;

import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
} from '../controllers/cartController.js';
import { verifyFirebaseToken as firebaseAuthMiddleware } from '../middleware/firebaseAuth.js';
const router = express.Router();

router.use(firebaseAuthMiddleware);

router.get('/', getCart);
router.post('/', addToCart);
router.put('/:id', updateCartItem);
router.delete('/:id', deleteCartItem);
router.post('/clear', clearCart);

export default router;
