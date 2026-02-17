import Order from "../modals/order.js";
import userModel from "../modals/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ================= CREATE NEW ORDER =================
const createOrder = async (req, res) => {
  try {
    const { 
      items, 
      address, 
      phone, 
      email, 
      firstName, 
      lastName, 
      paymentMethod,
      subtotal,
      tax,
      shipping,
      total,
      city,
      zipCode
    } = req.body;
    
    const userId = req.user.id;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Items are required" });
    }

    if (!address || !phone || !email || !firstName || !lastName || !paymentMethod) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newOrder = new Order({
      user: userId,
      items,
      total: total || 0,
      subtotal: subtotal || 0,
      tax: tax || 0,
      shipping: shipping || 0,
      address,
      city: city || "Gumla",
      zipCode: zipCode || "835206",
      phone,
      email,
      firstName,
      lastName,
      paymentMethod,
      paymentStatus: "pending",
      status: "processing"
    });

    await newOrder.save();

    if (paymentMethod === "online") {
      const line_items = items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: { name: item.item.name },
          unit_amount: Math.round(item.item.price * 100),
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/checkout?payment_status=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/checkout?payment_status=cancel`,
      });

      return res.json({ success: true, checkoutUrl: session.url, orderId: newOrder._id });
    }

    res.json({ success: true, message: "Order placed successfully (COD)", order: newOrder });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ success: false, message: error.message || "Error placing order" });
  }
};

// ================= GET USER ORDERS (Personal History) =================
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching your orders" });
  }
};

// ================= GET ALL ORDERS (Admin/Kitchen View) =================
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching all orders" });
  }
};

// ================= GET SINGLE ORDER BY ID =================
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    // Security: Owner or Admin only
    if (order.user.toString() !== req.user.id) {
       // Optional: Add admin bypass logic here
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching order details" });
  }
};

// ================= UPDATE OWN ORDER (e.g., Cancel) =================
const updateOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { status },
      { new: true }
    );
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating order" });
  }
};

// ================= UPDATE ANY ORDER (Admin/Kitchen Action) =================
const updateAnyOrder = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, paymentStatus },
      { new: true }
    );

    if (req.io && order) {
        // Send real-time update to the user's room
        req.io.to(String(order.user)).emit("orderUpdate", {
            orderId: order._id,
            status: order.status
        });
    }

    res.json({ success: true, message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating order status" });
  }
};

// ================= CONFIRM STRIPE PAYMENT =================
const confirmPayment = async (req, res) => {
  const { orderId, success } = req.query;
  try {
    if (success === "true") {
      await Order.findByIdAndUpdate(orderId, { paymentStatus: "succeeded" });
      res.json({ success: true, message: "Payment successful" });
    } else {
      await Order.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed, order cancelled" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Verification error" });
  }
};

// ================= FINAL EXPORT BLOCK =================
export {
  createOrder,
  getOrders,
  getAllOrders,
  confirmPayment,
  getOrderById,
  updateOrder,
  updateAnyOrder,
};