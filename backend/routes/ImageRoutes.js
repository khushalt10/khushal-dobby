import express from 'express'
import Image from '../model/ImageModel.js'
import asyncHandler from 'express-async-handler'
import { createImage, getImageById, getImages, updateImage} from '../controller/ImageController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

//all Images
router.route('/').get(getImages).post(protect, createImage)
//id Image
// router.route('/:id').get(getImageById).delete(protect, admin, deleteImage).put(protect, admin, updateImage)
router.route('/:id').get(getImageById).put(protect, updateImage)

export default router
