// import Stripe from 'stripe';
// import Order from '../modals/order.js';
// import Notification from '../modals/NotifiSchema.js';
// import 'dotenv/config';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Helper function to create, save, AND EMIT a notification
// const createAndSaveNotification = async (req, userId, orderId, message, type) => {
//     try {
//         const newNotification = new Notification({
//             user: userId,
//             orderId: orderId,
//             message: message,
//             type: type, // e.g., 'order_status', 'payment'
//             isRead: false
//         });
//         await newNotification.save();
        
//         // Use req.io to emit the real-time event
//         if (req.io) {
//             const userRoom = String(userId);
//             console.log(`📡 Emitting 'newNotification' to room: "${userRoom}"`);
//             req.io.to(userRoom).emit('newNotification', newNotification);
//         }

//     } catch (error) {
//         console.error('Error creating notification:', error);
//     }
// };

// // Create Order
// export const createOrder = async (req, res) => {
//     try {
//         const {
//             firstName, lastName, phone, email,
//             address, city, zipCode,
//             paymentMethod, subtotal, tax, total,
//             items
//         } = req.body;

//         if (!items || !Array.isArray(items) || items.length === 0) {
//             return res.status(400).json({ message: 'Invalid or empty items array' });
//         }

//         const orderItems = items.map(({ item, name, price, imageUrl, quantity }) => {
//             const base = item || {};
//             return {
//                 item: {
//                     name: base.name || name || 'Unknown',
//                     price: Number(base.price ?? price) || 0,
//                     imageUrl: base.imageUrl || imageUrl || ''
//                 },
//                 quantity: Number(quantity) || 0
//             };
//         });

//         const shippingCost = 0;
//         let newOrder;
//         const userId = req.user._id;

//         if (paymentMethod === 'online') {
//             const session = await stripe.checkout.sessions.create({
//                 payment_method_types: ['card'],
//                 mode: 'payment',
//                 line_items: orderItems.map(o => ({
//                     price_data: {
//                         currency: 'inr',
//                         product_data: { name: o.item.name },
//                         unit_amount: Math.round(o.item.price * 100)
//                     },
//                     quantity: o.quantity
//                 })),
//                 customer_email: email,
//                 success_url: `${process.env.FRONTEND_URL}/myorder/verify?success=true&session_id={CHECKOUT_SESSION_ID}`,
//                 cancel_url: `${process.env.FRONTEND_URL}/checkout?payment_status=cancel`,
//                 metadata: { firstName, lastName, email, phone }
//             });

//             newOrder = new Order({
//                 user: userId,
//                 firstName, lastName, phone, email,
//                 address, city, zipCode,
//                 paymentMethod, subtotal, tax, total,
//                 shipping: shippingCost,
//                 items: orderItems,
//                 paymentIntentId: session.payment_intent,
//                 sessionId: session.id,
//                 paymentStatus: 'pending'
//             });

//             await newOrder.save();
//             await createAndSaveNotification(req, userId, newOrder._id, 'Your order is pending payment.', 'payment_pending');

//             return res.status(201).json({ order: newOrder, checkoutUrl: session.url });
//         }

//         // COD Handling
//         newOrder = new Order({
//             user: userId,
//             firstName, lastName, phone, email,
//             address, city, zipCode,
//             paymentMethod, subtotal, tax, total,
//             shipping: shippingCost,
//             items: orderItems,
//             paymentStatus: 'succeeded'
//         });

//         await newOrder.save();
//         await createAndSaveNotification(req, userId, newOrder._id, 'Your order has been placed successfully!', 'order_placed');
 
//         res.status(201).json({ order: newOrder, checkoutUrl: null });
//     } catch (error) {
//         console.error('createOrder error:', error);
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// };

// // Confirm Payment
// export const confirmPayment = async (req, res) => {
//     try {
//         const { session_id } = req.query;
//         if (!session_id) return res.status(400).json({ message: 'session_id required' });

//         const session = await stripe.checkout.sessions.retrieve(session_id);
//         if (session.payment_status === 'paid') {
//             const order = await Order.findOneAndUpdate(
//                 { sessionId: session_id },
//                 { paymentStatus: 'succeeded' },
//                 { new: true }
//             );
//             if (!order) return res.status(404).json({ message: 'Order not found' });
            
//             await createAndSaveNotification(req, order.user, order._id, 'Payment confirmed! Your order is being prepared.', 'payment_succeeded');
            
//             return res.json(order);
//         }
//         return res.status(400).json({ message: 'Payment not completed' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error', error: err.message });
//     }
// };

// // Get all orders for the logged-in user
// export const getOrders = async (req, res) => {
//     try {
//         const filter = { user: req.user._id };
//         const rawOrders = await Order.find(filter).sort({ createdAt: -1 }).lean();
//         res.json(rawOrders);
//     } catch (error) {
//         console.error('getOrders error:', error);
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// };

// // Get all orders for an admin panel
// export const getAllOrders = async (req, res) => {
//     try {
//         const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
//         res.json(orders);
//     } catch (error) {
//         console.error('getAllOrders error:', error);
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// };

// // Update any order's status (for admin)
// // In backend/controllers/orderController.js

// // ... other controller functions and imports ...

// // Update any order's status (for admin)
// export const updateAnyOrder = async (req, res) => {
//     try {
//         const originalOrder = await Order.findById(req.params.id);
//         if (!originalOrder) {
//             return res.status(404).json({ message: 'Order not found' });
//         }
        
//         const oldStatus = originalOrder.status;
//         const newStatus = req.body.status;

//         // Update the order in the database
//         const updatedOrder = await Order.findByIdAndUpdate(
//             req.params.id,
//             { status: newStatus },
//             { new: true, runValidators: true }
//         );
        
//         // Check if the status has actually changed before sending a notification
//         if (newStatus && newStatus !== oldStatus) {
            
//             // 1. Get the user's first name from the order
//             const userName = updatedOrder.firstName;
//             let message = ''; // Initialize an empty message variable

//             // 2. Use a switch statement to create catchy, custom messages
//             switch (newStatus) {
//                 case 'processing':
//                     message = `Order received, ${userName}! We're firing up the kitchen for you. 🔥`;
//                     break;
//                 case 'Food Preparing':
//                     message = `The kitchen is sizzling, ${userName}! Your order is being prepared with care.`;
//                     break;
//                 case 'outForDelivery':
//                     message = `Get ready, ${userName}! Your delicious meal is on its way to you now. 🛵`;
//                     break;
//                 case 'delivered':
//                     message = `Your meal has arrived, ${userName}! We hope you enjoy every bite.`;
//                     break;
//                 default:
//                     // A fallback message for any other statuses
//                     message=`This is from orderController order status : ${newStatus} `;
//                     // message = `Hi ${userName}, your order status has been updated to: ${newStatus}.`;
//             }
            
//             // 3. Create and send the notification with the new message
// await createAndSaveNotification(req, updatedOrder.user, updatedOrder._id, message, newStatus);        }
        
//         res.json(updatedOrder);
//     } catch (error) {
//         console.error('updateAnyOrder error:', error);
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// };

// // Get a single order by ID
// export const getOrderById = async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.id);
//         if (!order) return res.status(404).json({ message: 'Order not found' });
//         res.json(order);
//     } catch (error) {
//         console.error('getOrderById error:', error);
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// };

// // This function is likely redundant if you have updateAnyOrder.
// // It could be used for a user updating their own order details, but not status.
// export const updateOrder = async (req, res) => {
//     try {
//         const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updated) return res.status(404).json({ message: 'Order not found' });
//         res.json(updated);
//     } catch (error) {
//         console.error('updateOrder error:', error);
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// };


// import Stripe from 'stripe';
// import Order from '../modals/order.js';
// import Notification from '../modals/NotifiSchema.js';
// import 'dotenv/config';
// import { sendOrderNotification } from "../Service/emailService.js";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // ✅ Helper function to create + save + emit notification
// const createAndSaveNotification = async (req, userId, orderId, message, type) => {
//     try {
//         const newNotification = new Notification({
//             user: userId,
//             orderId,
//             message,
//             type,
//             isRead: false
//         });
//         await newNotification.save();

//         if (req.io) {
//             const userRoom = String(userId);
//             console.log(`📡 Emitting 'newNotification' to room: "${userRoom}"`);
//             req.io.to(userRoom).emit('newNotification', newNotification);
//         }
//     } catch (error) {
//         console.error('Error creating notification:', error);
//     }
// };

// // ✅ Create Order
// export const createOrder = async (req, res) => {
//     try {
//         const {
//             firstName, lastName, phone, email,
//             address, city, zipCode,
//             paymentMethod, subtotal, tax, total,
//             items
//         } = req.body;

//         if (!items || !Array.isArray(items) || items.length === 0) {
//             return res.status(400).json({ message: 'Invalid or empty items array' });
//         }

//         if (!email) {
//             return res.status(400).json({ message: 'Customer email is required' });
//         }

//         const orderItems = items.map(({ item, name, price, imageUrl, quantity }) => {
//             const base = item || {};
//             return {
//                 item: {
//                     name: base.name || name || 'Unknown',
//                     price: Number(base.price ?? price) || 0,
//                     imageUrl: base.imageUrl || imageUrl || ''
//                 },
//                 quantity: Number(quantity) || 0
//             };
//         });

//         const shippingCost = 0;
//         const userId = req.user._id;
//         let newOrder;

//         // ✅ Online payment handling
//         if (paymentMethod === 'online') {
//             const session = await stripe.checkout.sessions.create({
//                 payment_method_types: ['card'],
//                 mode: 'payment',
//                 line_items: orderItems.map(o => ({
//                     price_data: {
//                         currency: 'inr',
//                         product_data: { name: o.item.name },
//                         unit_amount: Math.round(o.item.price * 100)
//                     },
//                     quantity: o.quantity
//                 })),
//                 customer_email: email,
//                 success_url: `${process.env.FRONTEND_URL}/myorder/verify?success=true&session_id={CHECKOUT_SESSION_ID}`,
//                 cancel_url: `${process.env.FRONTEND_URL}/checkout?payment_status=cancel`,
//                 metadata: { firstName, lastName, email, phone }
//             });

//             newOrder = new Order({
//                 user: userId,
//                 firstName, lastName, phone, email,
//                 address, city, zipCode,
//                 paymentMethod, subtotal, tax, total,
//                 shipping: shippingCost,
//                 items: orderItems,
//                 paymentIntentId: session.payment_intent,
//                 sessionId: session.id,
//                 paymentStatus: 'pending'
//             });

//             await newOrder.save();
//             await createAndSaveNotification(req, userId, newOrder._id, 'Your order is pending payment.', 'payment_pending');

//             return res.status(201).json({ order: newOrder, checkoutUrl: session.url });
//         }

//         // ✅ COD handling
//         newOrder = new Order({
//             user: userId,
//             firstName, lastName, phone, email,
//             address, city, zipCode,
//             paymentMethod, subtotal, tax, total,
//             shipping: shippingCost,
//             items: orderItems,
//             paymentStatus: 'succeeded'
//         });

//         await newOrder.save();

//         await createAndSaveNotification(req, userId, newOrder._id, 'Your order has been placed successfully!', 'order_placed');

//         // ✅ Email notifications
//         try {
//             await sendOrderNotification(newOrder.email, newOrder.toObject(), true);   // customer
//             await sendOrderNotification("ak373714@gmail.com", newOrder.toObject(), false); // admin
//         } catch (err) {
//             console.error("⚠️ Email sending failed:", err.message);
//         }

//         res.status(201).json({ order: newOrder, checkoutUrl: null });
//     } catch (error) {
//         console.error('createOrder error:', error);
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// };

// // ✅ Confirm Payment
// export const confirmPayment = async (req, res) => {
//     try {
//         const { session_id } = req.query;
//         if (!session_id) return res.status(400).json({ message: 'session_id required' });

//         const session = await stripe.checkout.sessions.retrieve(session_id);
//         if (session.payment_status === 'paid') {
//             const order = await Order.findOneAndUpdate(
//                 { sessionId: session_id },
//                 { paymentStatus: 'succeeded' },
//                 { new: true }
//             );
//             if (!order) return res.status(404).json({ message: 'Order not found' });

//             await createAndSaveNotification(req, order.user, order._id, 'Payment confirmed! Your order is being prepared.', 'payment_succeeded');

//             return res.json(order);
//         }
//         return res.status(400).json({ message: 'Payment not completed' });
//     } catch (err) {
//         console.error("confirmPayment error:", err);
//         res.status(500).json({ message: 'Server Error', error: err.message });
//     }
// };

// // ✅ Get all orders for logged-in user
// export const getOrders = async (req, res) => {
//     try {
//         const filter = { user: req.user._id };
//         const rawOrders = await Order.find(filter).sort({ createdAt: -1 }).lean();
//         res.json(rawOrders);
//     } catch (error) {
//         console.error('getOrders error:', error);
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// };

// // ✅ Get all orders (admin)
// export const getAllOrders = async (req, res) => {
//     try {
//         const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
//         res.json(orders);
//     } catch (error) {
//         console.error('getAllOrders error:', error);
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// };

// // ✅ Update any order's status (admin)
// export const updateAnyOrder = async (req, res) => {
//     try {
//         const originalOrder = await Order.findById(req.params.id);
//         if (!originalOrder) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         const oldStatus = originalOrder.status;
//         const newStatus = req.body.status;

//         const updatedOrder = await Order.findByIdAndUpdate(
//             req.params.id,
//             { status: newStatus },
//             { new: true, runValidators: true }
//         );

//         if (newStatus && newStatus !== oldStatus) {
//             const userName = updatedOrder.firstName;
//             let message;

//             switch (newStatus) {
//                 case 'processing':
//                     message = `Order received, ${userName}! We're firing up the kitchen for you. 🔥`;
//                     break;
//                 case 'Food Preparing':
//                     message = `The kitchen is sizzling, ${userName}! Your order is being prepared with care.`;
//                     break;
//                 case 'outForDelivery':
//                     message = `Get ready, ${userName}! Your delicious meal is on its way to you now. 🛵`;
//                     break;
//                 case 'delivered':
//                     message = `Your meal has arrived, ${userName}! We hope you enjoy every bite.`;
//                     break;
//                 default:
//                     message = `Order status updated: ${newStatus}`;
//             }

//             await createAndSaveNotification(req, updatedOrder.user, updatedOrder._id, message, newStatus);
//         }

//         res.json(updatedOrder);
//     } catch (error) {
//         console.error('updateAnyOrder error:', error);
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// };

// // ✅ Get single order
// export const getOrderById = async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.id);
//         if (!order) return res.status(404).json({ message: 'Order not found' });
//         res.json(order);
//     } catch (error) {
//         console.error('getOrderById error:', error);
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// };

// // ✅ Update order (generic)
// export const updateOrder = async (req, res) => {
//     try {
//         const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updated) return res.status(404).json({ message: 'Order not found' });
//         res.json(updated);
//     } catch (error) {
//         console.error('updateOrder error:', error);
//         res.status(500).json({ message: 'Server Error', error: error.message });
//     }
// };

import Stripe from 'stripe';
import Order from '../modals/order.js';
import Notification from '../modals/NotifiSchema.js';
import 'dotenv/config';
import { sendOrderNotification } from "../Service/emailService.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Helper: Create + Save + Emit Notification
const createAndSaveNotification = async (req, userId, orderId, message, type) => {
    try {
        const newNotification = new Notification({
            user: userId,
            orderId,
            message,
            type,
            isRead: false
        });
        await newNotification.save();

        if (req.io) {
            const userRoom = String(userId);
            console.log(`📡 Emitting 'newNotification' to room: "${userRoom}"`);
            req.io.to(userRoom).emit('newNotification', newNotification);
        }
    } catch (error) {
        console.error('Error creating notification:', error);
    }
};

// ✅ Create Order
export const createOrder = async (req, res) => {
    try {
        const {
            firstName, lastName, phone, email,
            address, city, zipCode,
            paymentMethod, subtotal, tax, total,
            items
        } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Invalid or empty items array' });
        }

        if (!email) {
            return res.status(400).json({ message: 'Customer email is required' });
        }

        const orderItems = items.map(({ item, name, price, imageUrl, quantity }) => {
            const base = item || {};
            return {
                item: {
                    name: base.name || name || 'Unknown',
                    price: Number(base.price ?? price) || 0,
                    imageUrl: base.imageUrl || imageUrl || ''
                },
                quantity: Number(quantity) || 0
            };
        });

        const shippingCost = 0;
        
        const firebaseId = req.user?._id; // ✅ Firebase UID
       console.log("rudhir:", firebaseId);
        if (!firebaseId) return res.status(400).json({ message: 'Firebase UID required' });

        let newOrder;

        // ✅ Online Payment
        if (paymentMethod === 'online') {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: orderItems.map(o => ({
                    price_data: {
                        currency: 'inr',
                        product_data: { name: o.item.name },
                        unit_amount: Math.round(o.item.price * 100)
                    },
                    quantity: o.quantity
                })),
                customer_email: email,
                success_url: `${process.env.FRONTEND_URL}/myorder/verify?success=true&session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.FRONTEND_URL}/checkout?payment_status=cancel`,
                metadata: { firstName, lastName, email, phone }
            });

            newOrder = new Order({
                firebaseId,
                firstName, lastName, phone, email,
                address, city, zipCode,
                paymentMethod, subtotal, tax, total,
                shipping: shippingCost,
                items: orderItems,
                paymentIntentId: session.payment_intent,
                sessionId: session.id,
                paymentStatus: 'pending'
            });

            await newOrder.save();
            await createAndSaveNotification(req, firebaseId, newOrder._id, 'Your order is pending payment.', 'payment_pending');

            return res.status(201).json({ order: newOrder, checkoutUrl: session.url });
        }

        // ✅ COD Payment
        newOrder = new Order({
            firebaseId,
            firstName, lastName, phone, email,
            address, city, zipCode,
            paymentMethod, subtotal, tax, total,
            shipping: shippingCost,
            items: orderItems,
            paymentStatus: 'succeeded'
        });

        await newOrder.save();
        await createAndSaveNotification(req, firebaseId, newOrder._id, 'Your order has been placed successfully!', 'order_placed');

        // ✅ Email notifications
        try {
            await sendOrderNotification(newOrder.email, newOrder.toObject(), true);   // Customer
            await sendOrderNotification("ak373714@gmail.com", newOrder.toObject(), false); // Admin
        } catch (err) {
            console.error("⚠️ Email sending failed:", err.message);
        }

        res.status(201).json({ order: newOrder, checkoutUrl: null });

    } catch (error) {
        console.error('createOrder error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// ✅ Confirm Payment
export const confirmPayment = async (req, res) => {
    try {
        const { session_id } = req.query;
        if (!session_id) return res.status(400).json({ message: 'session_id required' });

        const session = await stripe.checkout.sessions.retrieve(session_id);
        if (session.payment_status === 'paid') {
            const order = await Order.findOneAndUpdate(
                { sessionId: session_id },
                { paymentStatus: 'succeeded' },
                { new: true }
            );
            if (!order) return res.status(404).json({ message: 'Order not found' });

            await createAndSaveNotification(req, order.firebaseId, order._id, 'Payment confirmed! Your order is being prepared.', 'payment_succeeded');

            return res.json(order);
        }

        return res.status(400).json({ message: 'Payment not completed' });
    } catch (err) {
        console.error("confirmPayment error:", err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};

// ✅ Get orders for logged-in user
export const getOrders = async (req, res) => {
    try {
        const firebaseId = req.user?._id || req.query._id;
        console.log("ankita:"+req.user._id);
        if (!firebaseId) return res.status(400).json({ message: 'Firebase UID required' });

        const rawOrders = await Order.find({ firebaseId })
            .sort({ createdAt: -1 })
            .lean();

        res.json(rawOrders);
    } catch (error) {
        console.error('getOrders error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// ✅ Get all orders (Admin)
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
        res.json(orders);
    } catch (error) {
        console.error('getAllOrders error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// ✅ Update any order (Admin)
export const updateAnyOrder = async (req, res) => {
    try {
        const originalOrder = await Order.findById(req.params.id);
        if (!originalOrder) return res.status(404).json({ message: 'Order not found' });

        const oldStatus = originalOrder.status;
        const newStatus = req.body.status;

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status: newStatus },
            { new: true, runValidators: true }
        );

        if (newStatus && newStatus !== oldStatus) {
            const userName = updatedOrder.firstName;
            let message;

            switch (newStatus) {
                case 'processing':
                    message = `Order received, ${userName}! We're firing up the kitchen for you. 🔥`;
                    break;
                case 'Food Preparing':
                    message = `The kitchen is sizzling, ${userName}! Your order is being prepared with care.`;
                    break;
                case 'outForDelivery':
                    message = `Get ready, ${userName}! Your delicious meal is on its way to you now. 🛵`;
                    break;
                case 'delivered':
                    message = `Your meal has arrived, ${userName}! We hope you enjoy every bite.`;
                    break;
                default:
                    message = `Order status updated: ${newStatus}`;
            }

            await createAndSaveNotification(req, updatedOrder.firebaseId, updatedOrder._id, message, newStatus);
        }

        res.json(updatedOrder);
    } catch (error) {
        console.error('updateAnyOrder error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// ✅ Get single order
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        console.error('getOrderById error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// ✅ Update order (generic)
export const updateOrder = async (req, res) => {
    try {
        const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Order not found' });
        res.json(updated);
    } catch (error) {
        console.error('updateOrder error:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
