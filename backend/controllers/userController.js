// import userModel from "../modals/userModel.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import admin from "../GoogleAuth/firebaseAdmin.js";

// // Create JWT token
// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
// };

// // ================= REGISTER USER =================
// const registerUser = async (req, res) => {
//   console.log("🚀 registerUser called with body:", req.body);

//   const { username, email, mobile, firebaseId } = req.body;

//   try {
//     // Check if user exists
//     const exists = await userModel.findOne({ $or: [{ email }, { firebaseId }] });
//     if (exists) {
//       console.log("⚠️ User already exists");
//       return res.status(400).json({ success: false, message: "User already exists" });
//     }

//     const newUser = new userModel({
//       username,
//       email,
//       mobile,
//       firebaseId,
//       addresses: [],
//     });

//     const savedUser = await newUser.save();
//     const token = createToken(savedUser._id);

//     console.log("✅ User registered successfully:", savedUser._id);

//     res.json({
//       success: true,
//       token,
//       userId: savedUser._id,
//       firebaseId: savedUser.firebaseId,
//       message: "User registered successfully",
//     });
//   } catch (error) {
//     console.error("🔥 registerUser error:", error);
//     res.status(500).json({ success: false, message: "Error registering user" });
//   }
// };

// // ================= GOOGLE AUTH =================

// const googleAuth = async (req, res) => {
//   const { idToken } = req.body;

//   if (!idToken) {
//     return res.status(400).json({ success: false, message: "No ID token provided" });
//   }

//   try {
//     // ✅ VERIFY REAL FIREBASE TOKEN
//     const decodedToken = await admin.auth().verifyIdToken(idToken);

//     const { uid, email, name } = decodedToken;

//     // Check if user exists
//     let user = await userModel.findOne({ firebaseId: uid });

//     if (!user) {
//       // Create new user
//       user = await userModel.create({
//         username: name || "User",
//         email,
//         firebaseId: uid,
//         addresses: [],
//       });
//     }

//     const token = createToken(user._id);

//     res.json({
//       success: true,
//       token,
//       userId: user._id,
//       firebaseId: uid,
//     });

//   } catch (error) {
//     console.error("🔥 Google Auth error:", error);
//     res.status(401).json({ success: false, message: "Invalid Firebase token" });
//   }
// };


// // ================= ADDRESS =================
// // const addAddress = async (req, res) => {
// //   console.log("🚀 addAddress called with body:", req.body);

// //   try {
// //     const {
// //       userId,
// //       firstName,
// //       lastName,
// //       phone,
// //       email,
// //       city,
// //       zip,
// //       landmark,
// //       latitude,
// //       longitude,
// //       distance,
// //     } = req.body;

// //     const user = await userModel.findById(userId);
// //     if (!user) return res.json({ success: false, message: "User not found" });

// //     user.addresses.push({
// //       firstName,
// //       lastName,
// //       phone,
// //       email,
// //       city,
// //       zip,
// //       landmark,
// //       latitude,
// //       longitude,
// //       distance,
// //     });

// //     await user.save();
// //     console.log("✅ Address added for user:", userId);

// //     res.json({ success: true, message: "Address added successfully", addresses: user.addresses });
// //   } catch (error) {
// //     console.error("🔥 addAddress error:", error);
// //     res.json({ success: false, message: "Error adding address" });
// //   }
// // };


// // ================= ADD ADDRESS =================
// const addAddress = async (req, res) => {
//   try {
//     const {
//       userId,  // this is Firebase UID
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

//     // Find user by Firebase UID
//     const user = await userModel.findOne({ firebaseId: userId });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Add new address
//     const newAddress = {
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
//     };

//     user.addresses.push(newAddress);
//     await user.save();

//     return res.status(200).json({
//       success: true,
//       message: "Address added successfully",
//       addresses: user.addresses,
//     });
//   } catch (error) {
//     console.error("🔥 addAddress error:", error);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// };


// // ================= GET ADDRESSES =================
// const getAddresses = async (req, res) => {
//   try {
//     const { userId } = req.params; // Firebase UID
//     const user = await userModel.findOne({ firebaseId: userId });
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     res.json({ success: true, addresses: user.addresses });
//   } catch (error) {
//     console.error("🔥 getAddresses error:", error);
//     res.status(500).json({ success: false, message: "Error fetching addresses" });
//   }
// };



// const deleteAddress = async (req, res) => {
//   try {
//     const { userId, addressId } = req.params; // Firebase UID + address _id

//     const user = await userModel.findOne({ firebaseId: userId });
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     user.addresses = user.addresses.filter(addr => addr._id.toString() !== addressId);
//     await user.save();

//     res.json({ success: true, message: "Address deleted successfully", addresses: user.addresses });
//   } catch (error) {
//     console.error("🔥 deleteAddress error:", error);
//     res.status(500).json({ success: false, message: "Error deleting address" });
//   }
// };


// // ================= ADMIN =================
// const getAllusers = async (req, res) => {
//   console.log("🚀 getAllusers called");

//   try {
//     const users = await userModel.find({}).sort({ createdAt: -1 });
//     res.status(200).json(users);
//   } catch (error) {
//     console.error("🔥 getAllusers error:", error);
//     res.status(500).json({ message: "Server error while fetching users." });
//   }
// };

// export {
//   registerUser,
//   googleAuth,
//   addAddress,
//   getAddresses,
//   deleteAddress,
//   getAllusers,
// };


import userModel from "../modals/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Create JWT
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ================= SIGNUP =================
const signup = async (req, res) => {
  const { name, phone, mpin } = req.body;

  try {
    if (!name || !phone || !mpin)
      return res.status(400).json({ message: "All fields required" });

    if (mpin.length !== 4)
      return res.status(400).json({ message: "MPIN must be 4 digits" });

    const existing = await userModel.findOne({ phone });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashedMpin = await bcrypt.hash(mpin, 10);

    const user = await userModel.create({
      name,
      phone,
      mpin: hashedMpin,
    });

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      userId: user._id,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= LOGIN =================
const login = async (req, res) => {
  const { phone, mpin } = req.body;

  try {
    const user = await userModel.findOne({ phone });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(mpin, user.mpin);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid MPIN" });

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
      userId: user._id,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
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



export {
  signup,
  login,
  addAddress,
  getAddresses,
  deleteAddress,
  getAllusers,
};