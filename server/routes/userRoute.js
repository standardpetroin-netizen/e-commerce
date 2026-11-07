import express from 'express'
import { login, signup, listUsers, getUserProfile } from '../controllers/userController.js'
import adminAuth from '../middleware/adminAuth.js'
import authMiddleware from '../middleware/authMiddleware.js'

const userRouter = express.Router();

userRouter.post('/register', signup)
userRouter.post('/login', login)
userRouter.get('/profile', authMiddleware, getUserProfile)
userRouter.get('/list', adminAuth, listUsers)  

export default userRouter;
