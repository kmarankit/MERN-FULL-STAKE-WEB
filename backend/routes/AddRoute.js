// // routes/userRoute.js
// import express from 'express';
// import { loginUser, registerUser, addAddress, getAddresses } from '../controllers/userController.js';

// const userRouter = express.Router();

// userRouter.post('/register', registerUser);
// userRouter.post('/login', loginUser);

// // Address endpoints use :userId in path
// userRouter.post('/:userId/add-address', addAddress);
// userRouter.get('/:userId/addresses', getAddresses);

// export default userRouter;

import express from 'express';
import { 
    login, 
    signup, 
    addAddress, 
    getAddresses, 
    deleteAddress, 
    getAllusers 
} from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';

const userRouter = express.Router();

// Public Routes
userRouter.post('/register', signup); // Matches your signup function name
userRouter.post('/login', login);     // Matches your login function name

// Private Address Routes (No :userId needed!)
// The middleware will attach the user to req.user
userRouter.post('/add-address', authMiddleware, addAddress);
userRouter.get('/addresses', authMiddleware, getAddresses);
userRouter.delete('/delete-address/:addressId', authMiddleware, deleteAddress);

// Admin Route
userRouter.get('/all', authMiddleware, getAllusers);

export default userRouter;