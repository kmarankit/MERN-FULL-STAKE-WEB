// routes/userRoute.js
import express from 'express';
import { loginUser, registerUser, addAddress, getAddresses } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// Address endpoints use :userId in path
userRouter.post('/:userId/add-address', addAddress);
userRouter.get('/:userId/addresses', getAddresses);

export default userRouter;
