import Image from '../model/ImageModel.js'
import asyncHandler from 'express-async-handler'

const getImages = asyncHandler(async(req, res) => {

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

  

    res.json(await Image.find({ }))
})

// const getImageById = asyncHandler(async(req, res) => {
//     const Image = await Image.findById(req.params.id)

//     if(Image) {
//         res.json(Image)
//     } else {
//         res.status(404)
//         throw new Error('Image not found!')
//     }
// })

const getImageById = asyncHandler(async(req, res) => {
    const image = await Image.findById(req.params.id)

    if(image) {
        res.json(image)
    } else {
        res.status(404)
        throw new Error('image not found!')
    }
})

const createImage = asyncHandler(async(req, res) => {
    const img = new Image({
        name: 'Sample name',
        user: req.user._id,
        image: '/images/sample.jpg'
    })

    const createdImage = await img.save()
    res.status(201).json(createdImage)
})

const updateImage = asyncHandler(async(req, res) => {

    const { name, image} = req.body
    const img = await Image.findById(req.params.id)

    if (img) {
        img.name = name
        img.image = image


        const updatedimage = await img.save()
        res.json(updatedimage)

    } else {
        res.status(404)
        throw new Error('Image not found')
    }
})


export {
    getImages,
    createImage,
    updateImage,
    getImageById
}