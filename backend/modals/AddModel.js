// // models/userModel.js
// import mongoose from 'mongoose';

// const addressSchema = new mongoose.Schema({
//   street: { type: String, required: true },
//   city:   { type: String, required: true },
//   state:  { type: String, required: true },
//   zip:    { type: String, required: true },
//   landmark: { type: String },
// }, { timestamps: true });

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email:    { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   addresses: { type: [addressSchema], default: [] },
// }, { timestamps: true });

// const userModel = mongoose.models.User || mongoose.model('User', userSchema);
// export default userModel;

import mongoose from 'mongoose';

// Define the Address Schema first
const addressSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName:  { type: String },
  phone:     { type: String }, // Contact for this specific delivery
  email:     { type: String },
  city:      { type: String, required: true },
  zip:       { type: String, required: true },
  landmark:  { type: String },
  street:    { type: String },
  latitude:  { type: Number },
  longitude: { type: Number },
  distance:  { type: Number },
}, { timestamps: true });

// Define the Main User Schema
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Please provide your name"] 
  },
  phone: { 
    type: String, 
    required: [true, "Mobile number is required"], 
    unique: true,
    trim: true
  },
  mpin: { 
    type: String, 
    required: [true, "4-digit MPIN is required"] 
  },
  addresses: { 
    type: [addressSchema], 
    default: [] 
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Prevents recompiling the model if it already exists
const userModel = mongoose.models.User || mongoose.model('User', userSchema);

export default userModel;