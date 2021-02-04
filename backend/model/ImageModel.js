import mongoose from 'mongoose';

const ImageSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    
}, {
    timestamps: true
})

const Image = mongoose.model('Image', ImageSchema);

export default Image;