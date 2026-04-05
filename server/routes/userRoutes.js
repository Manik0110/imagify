import express from 'express'
import { registerUser, loginUser, payementRazorpay, verifyRazorpay } from '../controllers/userController.js'
import { userCredits } from '../controllers/userController.js';
import userAuth from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/credits', userAuth, userCredits)

//API endpoint for RazorPay 
userRouter.post('/pay-razor', userAuth, payementRazorpay)

//API endpoint for RazorPay payment verification
userRouter.post('/verify-razor', verifyRazorpay)

export default userRouter

// localhost:4000/api/user/register
// localhost:4000/api/user/login