// // modals/NotifiSchema.js
// import mongoose from "mongoose";

// const notificationSchema = new mongoose.Schema(
//   {
//     user: { // ✅ must be "user", not "userId"
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     orderId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Order",
//     },
//     message: {
//       type: String,
//       required: true,
//     },
//     type: {
//       type: String,
//       enum: [
//         "order_placed",
//         "payment_pending",
//         "payment_succeeded",
//         "order_status"
//       ], // ✅ match controller values
//       required: true,
//     },
//     isRead: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Notification", notificationSchema);
// modals/NotifiSchema.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        // General types
        "order_placed",
        "payment_pending",
        "payment_succeeded",
        
        // ✅ ADD ALL YOUR DYNAMIC STATUSES HERE
        "processing",
        "Food Preparing",
        "outForDelivery",
        "delivered"
      ],
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);