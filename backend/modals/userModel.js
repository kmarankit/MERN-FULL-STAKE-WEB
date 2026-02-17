import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // npm install bcryptjs

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    mpin: { type: String, required: true },
    addresses: [
      {
        firstName: String,
        lastName: String,
        phone: String,
        email: String,
        city: String,
        zip: String,
        landmark: String,
        latitude: Number,
        longitude: Number,
        distance: Number,
      }
    ]
  },
  { timestamps: true }
);

// --- ADDED FOR MONGODB AUTH ---

// 1. Hash MPIN before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("mpin")) return next();
  const salt = await bcrypt.genSalt(10);
  this.mpin = await bcrypt.hash(this.mpin, salt);
  next();
});

// 2. Method to compare MPIN during Login
userSchema.methods.compareMpin = async function (enteredMpin) {
  return await bcrypt.compare(enteredMpin, this.mpin);
};

export default mongoose.model("User", userSchema);