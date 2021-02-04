import React, { useEffect, useState } from 'react'
import { Button, Form} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { IMAGE_UPDATE_RESET } from '../constants/imageConstants'
import { listImageDetails, updateImage } from '../actions/imageActions'


function ImageCreateScreen({ match }) {
    const imageId = match.params.id

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)

    const history = useHistory()

    const dispatch = useDispatch()

    const imageDetails = useSelector(state => state.imageDetails)
    const { loading, image:imag, error} = imageDetails

    const imageUpdate = useSelector(state => state.imageUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate} = imageUpdate

    useEffect(() => {
            if (successUpdate) {
                dispatch({ type: IMAGE_UPDATE_RESET })
                history.push('/')
            } else {
                if(!imag.name || imag._id !== imageId) {
                    dispatch(listImageDetails(imageId))
                } else {
                    setName(imag.name)
                    setImage(imag.image)
                }
            }
    }, [dispatch, imageId, history, successUpdate, imag])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateImage({
            _id: imageId,
            name,
            image
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/upload', formData, config)
            console.log(data)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }    

    return (
        <>
            <Link to='/' className="btn btn-light my-3">
                Go Back
            </Link>
       
            <FormContainer>
                <h1>Edit Image</h1>
 
                    <form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter Name" value={name}
                            onChange={(e) => setName(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="text" placeholder="Enter image" value={image}
                            onChange={(e) => setImage(e.target.value)}></Form.Control>
                            
                             <Form.Group>
                            <Form.File id="exampleFormControlFile1" onChange={uploadFileHandler} label="Example file input" />
                             </Form.Group>
                        </Form.Group>


                        <Button type="submit" variant="info">
                            Update
                        </Button>
                    </form>
        

            </FormContainer>
        </>
    )
}

export default ImageCreateScreen
