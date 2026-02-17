import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  item: {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, required: true }
  },
  quantity: { type: Number, required: true, min: 1 }
}, { _id: true });

const orderSchema = new mongoose.Schema({
  // Link to your new MongoDB User
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Now required because we use JWT
    index: true
  },
  // We removed firebaseId here to prevent "Validation Errors"
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },

  address: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },

  items: [orderItemSchema],

  paymentMethod: {
    type: String,
    required: true,
    enum: ['cod', 'online', 'card', 'upi'],
    index: true
  },
  paymentIntentId: { type: String },
  sessionId: { type: String, index: true },
  paymentStatus: {
    type: String,
    enum: ['pending', 'succeeded', 'failed'],
    default: 'pending',
    index: true
  },

  subtotal: { type: Number, required: true, min: 0 },
  tax: { type: Number, required: true, min: 0 },
  shipping: { type: Number, required: true, min: 0, default: 0 },
  total: { type: Number, required: true, min: 0 },

  // Updated Status to match your Controller's Switch Statement
  status: {
    type: String,
    enum: ['processing', 'Food Preparing', 'outForDelivery', 'delivered'],
    default: 'processing',
    index: true
  },
  expectedDelivery: Date,
  deliveredAt: Date,

}, { timestamps: true }); // Uses built-in timestamps for createdAt/updatedAt

// Optimized Indexes
orderSchema.index({ user: 1, createdAt: -1 });

const Order = mongoose.model('Order', orderSchema);
export default Order;