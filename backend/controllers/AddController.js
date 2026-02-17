import userModel from '../modals/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // Using bcryptjs for consistency

// Helper to create JWT
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '7d' });
};

// --- LOGIN (using Phone & MPIN) ---
export const loginUser = async (req, res) => {
  const { phone, mpin } = req.body;
  try {
    // 1. Find user by phone
    const user = await userModel.findOne({ phone });
    if (!user) return res.status(404).json({ success: false, message: "User doesn't exist" });

    // 2. Compare mpin (bcrypt handles the hashed comparison)
    // Note: If you added the 'compareMpin' method to your model, you can use user.compareMpin(mpin)
    const isMatch = await bcrypt.compare(mpin, user.mpin);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid MPIN" });

    // 3. Generate token
    const token = createToken(user._id);

    res.json({ 
      success: true, 
      token, 
      userId: user._id, 
      name: user.name 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// --- REGISTER (using Name, Phone & MPIN) ---
export const registerUser = async (req, res) => {
  const { name, phone, mpin } = req.body;
  try {
    // 1. Check if phone already registered
    const exists = await userModel.findOne({ phone });
    if (exists) return res.status(400).json({ success: false, message: "Mobile number already exists" });

    // 2. Simple validation for 4-digit MPIN
    if (!mpin || mpin.length !== 4) {
        return res.status(400).json({ success: false, message: "MPIN must be exactly 4 digits" });
    }

    // 3. Hash the MPIN (If you didn't add a pre-save hook in the model)
    const salt = await bcrypt.genSalt(10);
    const hashedMpin = await bcrypt.hash(mpin, salt);

    // 4. Create new user
    const newUser = new userModel({
      name,
      phone,
      mpin: hashedMpin, // Save the hashed version
      addresses: [],
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.status(201).json({ success: true, token, userId: user._id, name: user.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// --- ADDRESS CONTROLLERS (Stay mostly the same) ---
export const addAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const addressData = req.body; 

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Ensure we are adding to the addresses array
    user.addresses.push(addressData);
    await user.save();

    res.json({ success: true, message: "Address added", addresses: user.addresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAddresses = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId).select('addresses');
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, addresses: user.addresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};