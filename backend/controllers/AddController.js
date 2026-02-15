// controllers/userController.js
import userModel from '../modals/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '7d' });
};

// LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User Doesn't Exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid Credentials" });

    const token = createToken(user._id);
    // Return token and userId so frontend can use it
    res.json({ success: true, token, userId: user._id, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// REGISTER
export const registerUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) return res.status(400).json({ success: false, message: "User Already Exists" });

    if (!validator.isEmail(email)) return res.status(400).json({ success: false, message: "Please Enter A Valid Email" });
    if (!password || password.length < 8) return res.status(400).json({ success: false, message: "Please Enter A Strong Password (min 8 chars)" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      username,
      email,
      password: hashed,
      addresses: [],
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.status(201).json({ success: true, token, userId: user._id, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ADD ADDRESS (POST /api/users/:userId/add-address)
export const addAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const address = req.body; // expects { street, city, state, zip, landmark? }

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Basic validation
    if (!address || !address.street || !address.city || !address.state || !address.zip) {
      return res.status(400).json({ success: false, message: "Address fields missing" });
    }

    user.addresses.push(address);
    await user.save();

    res.json({ success: true, message: "Address added", addresses: user.addresses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET ADDRESSES (GET /api/users/:userId/addresses)
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
