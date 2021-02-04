import express from 'express'
import asyncHandler from 'express-async-handler'
import { authUser, registerUser, getAllUsers, getUserById } from '../controller/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

//register
router.route('/').post(registerUser).get(getAllUsers)

//Authenticate
router.post('/login', authUser)

//Authorize
// router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

router.route('/:id').get(protect, getUserById)

export default router
