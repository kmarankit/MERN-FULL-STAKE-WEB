// models/userModel.js
import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city:   { type: String, required: true },
  state:  { type: String, required: true },
  zip:    { type: String, required: true },
  landmark: { type: String },
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  addresses: { type: [addressSchema], default: [] },
}, { timestamps: true });

const userModel = mongoose.models.User || mongoose.model('User', userSchema);
export default userModel;
