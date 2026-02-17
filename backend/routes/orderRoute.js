import express from 'express';
import {
    createOrder,
    getOrders,
    getAllOrders,
    confirmPayment,
    getOrderById,
    updateOrder,
    updateAnyOrder
} from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const orderRouter = express.Router();

// --- PUBLIC/STRIPE CALLBACKS ---
// Stripe needs to access this without a JWT token header
orderRouter.get('/confirm', confirmPayment);

// --- ADMIN ROUTES ---
// You might want to add an 'admin' check middleware here later
orderRouter.get('/getall', getAllOrders);
orderRouter.put('/getall/:id', updateAnyOrder);

// --- CUSTOMER ROUTES (Protected) ---
orderRouter.use(authMiddleware);

orderRouter.post('/', createOrder);
orderRouter.get('/', getOrders);
orderRouter.get('/:id', getOrderById);
orderRouter.put('/:id', updateOrder);

export default orderRouter;