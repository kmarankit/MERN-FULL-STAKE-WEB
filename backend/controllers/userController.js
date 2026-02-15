import userModel from "../modals/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Create JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ================= REGISTER USER =================
const registerUser = async (req, res) => {
  console.log("🚀 registerUser called with body:", req.body);

  const { username, email, mobile, firebaseId } = req.body;

  try {
    // Check if user exists
    const exists = await userModel.findOne({ $or: [{ email }, { firebaseId }] });
    if (exists) {
      console.log("⚠️ User already exists");
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const newUser = new userModel({
      username,
      email,
      mobile,
      firebaseId,
      addresses: [],
    });

    const savedUser = await newUser.save();
    const token = createToken(savedUser._id);

    console.log("✅ User registered successfully:", savedUser._id);

    res.json({
      success: true,
      token,
      userId: savedUser._id,
      firebaseId: savedUser.firebaseId,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("🔥 registerUser error:", error);
    res.status(500).json({ success: false, message: "Error registering user" });
  }
};

// ================= GOOGLE AUTH =================
const googleAuth = async (req, res) => {
  console.log("🚀 googleAuth called with body:", req.body);

  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ success: false, message: "No ID token provided" });

  try {
    // Normally verify Firebase token here using Firebase Admin SDK
    // For now, we'll just mock user info
    console.log("💡 Received idToken:", idToken);

    // Mock: extract user info from token (replace with real verification)
    const mockUser = {
      uid: "firebaseUid123",
      email: "user@example.com",
      displayName: "Test User",
    };

    // Check if user exists
    let user = await userModel.findOne({ firebaseId: mockUser.uid });
    if (!user) {
      // Create new user if not exist
      console.log("🆕 Creating new user from Google Auth");
      user = new userModel({
        username: mockUser.displayName,
        email: mockUser.email,
        firebaseId: mockUser.uid,
        addresses: [],
      });
      await user.save();
    }

    const token = createToken(user._id);

    console.log("✅ Google Auth successful for user:", user._id);
    res.json({ success: true, token, userId: user._id });
  } catch (error) {
    console.error("🔥 googleAuth error:", error);
    res.status(500).json({ success: false, message: "Google auth failed" });
  }
};

// ================= ADDRESS =================
// const addAddress = async (req, res) => {
//   console.log("🚀 addAddress called with body:", req.body);

//   try {
//     const {
//       userId,
//       firstName,
//       lastName,
//       phone,
//       email,
//       city,
//       zip,
//       landmark,
//       latitude,
//       longitude,
//       distance,
//     } = req.body;

//     const user = await userModel.findById(userId);
//     if (!user) return res.json({ success: false, message: "User not found" });

//     user.addresses.push({
//       firstName,
//       lastName,
//       phone,
//       email,
//       city,
//       zip,
//       landmark,
//       latitude,
//       longitude,
//       distance,
//     });

//     await user.save();
//     console.log("✅ Address added for user:", userId);

//     res.json({ success: true, message: "Address added successfully", addresses: user.addresses });
//   } catch (error) {
//     console.error("🔥 addAddress error:", error);
//     res.json({ success: false, message: "Error adding address" });
//   }
// };


// ================= ADD ADDRESS =================
const addAddress = async (req, res) => {
  try {
    const {
      userId,  // this is Firebase UID
      firstName,
      lastName,
      phone,
      email,
      city,
      zip,
      landmark,
      latitude,
      longitude,
      distance,
    } = req.body;

    // Find user by Firebase UID
    const user = await userModel.findOne({ firebaseId: userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Add new address
    const newAddress = {
      firstName,
      lastName,
      phone,
      email,
      city,
      zip,
      landmark,
      latitude,
      longitude,
      distance,
    };

    user.addresses.push(newAddress);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.error("🔥 addAddress error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


// ================= GET ADDRESSES =================
const getAddresses = async (req, res) => {
  try {
    const { userId } = req.params; // Firebase UID
    const user = await userModel.findOne({ firebaseId: userId });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, addresses: user.addresses });
  } catch (error) {
    console.error("🔥 getAddresses error:", error);
    res.status(500).json({ success: false, message: "Error fetching addresses" });
  }
};



const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params; // Firebase UID + address _id

    const user = await userModel.findOne({ firebaseId: userId });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.addresses = user.addresses.filter(addr => addr._id.toString() !== addressId);
    await user.save();

    res.json({ success: true, message: "Address deleted successfully", addresses: user.addresses });
  } catch (error) {
    console.error("🔥 deleteAddress error:", error);
    res.status(500).json({ success: false, message: "Error deleting address" });
  }
};


// ================= ADMIN =================
const getAllusers = async (req, res) => {
  console.log("🚀 getAllusers called");

  try {
    const users = await userModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error("🔥 getAllusers error:", error);
    res.status(500).json({ message: "Server error while fetching users." });
  }
};

export {
  registerUser,
  googleAuth,
  addAddress,
  getAddresses,
  deleteAddress,
  getAllusers,
};
