// import express from 'express';
// import {
//   // loginUser,
//   registerUser,
//   addAddress,
//   getAddresses,
//   deleteAddress,
//   getAllusers,
  
// } from '../controllers/userController.js';

// const userRouter = express.Router();

// // ================= AUTH =================
// // userRouter.post("/login", loginUser);       // POST { phone }
// userRouter.post("/register", registerUser); // POST { phone, email, username }

// // ================= ADDRESS =================
// userRouter.post("/add-address", addAddress);
// userRouter.get("/:userId/addresses", getAddresses);
// userRouter.delete("/:userId/addresses/:addressId", deleteAddress);

// // ================= ADMIN =================
// userRouter.get("/", getAllusers);

// export default userRouter;



// import express from "express";
// import {
//   registerUser,
//   addAddress,
//   getAddresses,
//   deleteAddress,
//   getAllusers,
// } from "../controllers/userController.js";

// const userRouter = express.Router();

// // AUTH
// userRouter.post("/auth/google", googleAuth);      // POST /api/users/auth/google
// userRouter.post("/register", registerUser);       // POST /api/users/register

// // ADDRESS
// userRouter.post("/add-address", addAddress);      // POST /api/users/add-address
// userRouter.get("/:userId/addresses", getAddresses);
// userRouter.delete("/:userId/addresses/:addressId", deleteAddress);

// // ADMIN
// userRouter.get("/", getAllusers);                 // GET /api/users

// export default userRouter;

import express from "express";
import {
  signup,
    login,
    addAddress,
    getAddresses,
    deleteAddress,
    getAllusers,
} from "../controllers/userController.js";

import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

/* ================= AUTH ================= */

// Signup → POST /api/users/register
userRouter.post("/register", signup);

// Login → POST /api/users/login
userRouter.post("/login", login);




/* ================= ADDRESS ================= */

// Protected routes (require JWT)
userRouter.post("/add-address", authMiddleware, addAddress);

userRouter.get("/addresses", authMiddleware, getAddresses);

userRouter.delete(
  "/addresses/:addressId",
  authMiddleware,
  deleteAddress
);


/* ================= ADMIN ================= */

userRouter.get("/", getAllusers);


export default userRouter;
