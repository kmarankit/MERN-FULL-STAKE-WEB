// import mongoose from 'mongoose';

// const cartItemSchema = mongoose.Schema(
//     {
//         user: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User',
//             required: true,
//         },
//         item: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Item',
//             required: true,
//         },
//         quantity: {
//             type: Number,
//             default: 1,
//             min: 1,
//         },
//     },
//     { timestamps: true }
// );

// export const CartItem = mongoose.model('CartItem', cartItemSchema);

import mongoose from 'mongoose';

const cartItemSchema = mongoose.Schema(
  {
    user: {
      // Changed from String (Firebase) to ObjectId (MongoDB)
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', // Links to your userModel.js
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item', // Links to your item.js
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { timestamps: true }
);

// This ensures a user can't have the same item multiple times in separate rows
// Instead, it encourages updating the quantity
cartItemSchema.index({ user: 1, item: 1 }, { unique: true });

export const CartItem = mongoose.model('CartItem', cartItemSchema);